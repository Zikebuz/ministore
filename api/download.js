/**
 * Vercel Serverless Function for Secure Digital Download
 * 
 * This handler manages the download of the "Vibe Coding Guide" PDF.
 * It performs a security check to ensure the request originates from
 * a valid source (Stripe Checkout or the Thanks Page) to prevent
 * unauthorized direct link sharing.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export default function handler(req, res) {
    // Get the referrer URL to identify where the request is coming from
    const referrer = req.headers.referer || "";
    
    // --- Security Check ---
    // Allow if coming from Stripe (after payment) or the local Thanks page
    const isFromStripe = referrer.includes("checkout.stripe.com");
    const isFromThanksPage = referrer.includes("thanks.html");

    // If the source is not authorized, deny access
    if (!isFromStripe && !isFromThanksPage) {
        return res.status(403).send("Access Denied: Please complete your purchase to download.");
    }

    // --- File Delivery ---
    // URL to the PDF stored in Vercel Blob Storage (Production)
    const fileUrl = "https://3mt1vreenw6teplr.public.blob.vercel-storage.com/vibe-coding-guide-Q9df6Fp3zkeWgtDn5GInyf1hrEugXm.pdf";
    
    // Fallback for local development (commented out for production)
    // const fileUrl = "/private/vibe-coding-guide.pdf"; 

    // Set the Content-Disposition header to force a download with a clean filename
    res.setHeader("Content-Disposition", "attachment; filename=Vibe-Coding-Guide.pdf");
    
    // Redirect the user to the file URL to begin the download
    return res.redirect(fileUrl);
}
