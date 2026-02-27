
/**
 * Vercel Serverless Function: /api/download
 * 
 * Handles secure digital file delivery.
 * 1. Verifies the Stripe Checkout Session ID to ensure payment was successful.
 * 2. Fetches the protected file from a secure URL (e.g., Vercel Blob).
 * 3. Streams the file to the client with the correct headers.
 * 
 * Environment Variables:
 * - STRIPE_SECRET_KEY: To verify the session with Stripe.
 * - FILE_URL: The direct URL to the protected file.
 * - BLOB_READ_WRITE_TOKEN: (Optional) Token for accessing Vercel Blob if needed.
 */

export default async function handler(req, res) {
    // 1. Input Validation: Check for session_id query parameter
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.status(400).send("Missing session_id parameter");
    }

    // 2. Configuration Check
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
        console.error("Missing STRIPE_SECRET_KEY");
        return res.status(500).send("Server configuration error");
    }

    try {
        // 3. Verify Payment with Stripe
        // Retrieve the session details from Stripe API
        const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
            headers: { Authorization: `Bearer ${stripeKey}` }
        });

        if (!stripeRes.ok) {
            console.error("Stripe Session Verification Failed");
            return res.status(403).send("Invalid session");
        }

        const session = await stripeRes.json();

        // Check if the payment status is 'paid' or 'complete'
        const isPaid = session.payment_status === "paid" || session.status === "complete";
        if (!isPaid) {
            return res.status(402).send("Payment required");
        }

        // 4. Fetch the Protected File
        const fileUrl = process.env.FILE_URL;
        if (!fileUrl) {
            console.error("Missing FILE_URL");
            return res.status(500).send("File source not configured");
        }

        // Fetch the file from the secure storage (e.g., Vercel Blob)
        // We pass the BLOB_READ_WRITE_TOKEN if it exists (for Vercel Blob auth)
        const fetchOptions = {};
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            fetchOptions.headers = { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` };
        }

        const fileRes = await fetch(fileUrl, fetchOptions);

        if (!fileRes.ok) {
            console.error(`Failed to fetch file from source: ${fileRes.status}`);
            return res.status(500).send("Unable to retrieve file");
        }

        // 5. Stream File to Client
        // Get the content type (default to PDF if unknown)
        const contentType = fileRes.headers.get("content-type") || "application/pdf";
        
        // Convert the file stream to a Buffer
        const arrayBuffer = await fileRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Set response headers for file download
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", "attachment; filename=Vibe-Coding-Guide.pdf");
        
        // Send the file data
        return res.status(200).send(buffer);

    } catch (error) {
        console.error("Download Handler Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
