export default async function handler(req, res) {
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.status(400).send("Missing session_id");
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
        return res.status(500).send("Server not configured");
    }

    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${stripeKey}` }
    });

    if (!stripeRes.ok) {
        return res.status(403).send("Invalid session");
    }

    const session = await stripeRes.json();
    const paid = session.payment_status === "paid" || session.status === "complete";
    if (!paid) {
        return res.status(402).send("Payment required");
    }

    const fileUrl = process.env.FILE_URL;
    if (!fileUrl) {
        return res.status(500).send("File not available");
    }

    const fileRes = await fetch(process.env.FILE_URL, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
    });
    if (!fileRes.ok) {
        return res.status(500).send("Unable to fetch file");
    }

    const contentType = fileRes.headers.get("content-type") || "application/pdf";
    const buf = Buffer.from(await fileRes.arrayBuffer());
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "attachment; filename=Vibe-Coding-Guide.pdf");
    return res.status(200).send(buf);
}
