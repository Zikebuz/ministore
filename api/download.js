/**
 * Vercel Serverless Function for Secure Digital Downloads.
 * 
 * @description
 * This function handles the secure delivery of digital products. It acts as a gatekeeper
 * by verifying the Stripe Checkout Session ID to ensure the user has actually purchased 
 * the product. If verified, it fetches the file from a secure source (e.g., Vercel Blob) 
 * and streams it to the user.
 * 
 * @param {import('@vercel/node').VercelRequest} req - The incoming request object.
 * @param {import('@vercel/node').VercelResponse} res - The outgoing response object.
 */
export default async function handler(req, res) {
    // 1. Get Session ID from query parameters
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.status(400).send("Missing session_id");
    }

    // 2. Check for Stripe Secret Key
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
        return res.status(500).send("Server not configured: Missing Stripe Key");
    }

    // 3. Verify Session with Stripe API
    // We call Stripe to get the session details to confirm payment status.
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${stripeKey}` }
    });

    if (!stripeRes.ok) {
        return res.status(403).send("Invalid session");
    }

    const session = await stripeRes.json();
    
    // 4. Check Payment Status
    const paid = session.payment_status === "paid" || session.status === "complete";
    if (!paid) {
        return res.status(402).send("Payment required");
    }

    // 5. Retrieve File URL from Environment Variables
    const fileUrl = process.env.FILE_URL;
    if (!fileUrl) {
        return res.status(500).send("File configuration missing");
    }

    // 6. Fetch the Secure File (from Blob Storage)
    const fileRes = await fetch(process.env.FILE_URL, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
    });
    if (!fileRes.ok) {
        return res.status(500).send("Unable to fetch source file");
    }

    // 7. Stream File to User
    // Set appropriate headers for file download
    const contentType = fileRes.headers.get("content-type") || "application/pdf";
    const buf = Buffer.from(await fileRes.arrayBuffer());
    
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "attachment; filename=Vibe-Coding-Guide.pdf");
    
    return res.status(200).send(buf);
}
