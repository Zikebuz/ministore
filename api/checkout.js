
/**
 * Vercel Serverless Function: /api/checkout
 * 
 * Handles Stripe Checkout session creation.
 * Receives a list of cart items, creates a Stripe Checkout Session,
 * and returns the session URL for the frontend to redirect the user.
 * 
 * Dependencies: None (Uses native fetch and URLSearchParams)
 * Environment Variables: STRIPE_SECRET_KEY
 */

export default async function handler(req, res) {
    // 1. Method Validation: Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 2. Input Validation: Check for items in the request body
        const { items } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // 3. Configuration Check: Ensure Stripe Secret Key is set
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            console.error('Missing STRIPE_SECRET_KEY environment variable.');
            return res.status(500).json({ error: 'Server misconfigured: Missing Stripe Key' });
        }

        // 4. Construct Stripe API Parameters
        // We use URLSearchParams to format the data as application/x-www-form-urlencoded
        // This avoids needing the 'qs' library or the official 'stripe' SDK, keeping the function lightweight.
        const params = new URLSearchParams();
        params.append('mode', 'payment');
        
        // Determine the base URL (Origin) dynamically
        // 'x-forwarded-proto' header is provided by Vercel to indicate the protocol (http/https)
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const origin = `${protocol}://${host}`;
        
        // Set success and cancel URLs
        // 'session_id={CHECKOUT_SESSION_ID}' is a template variable replaced by Stripe
        // It is CRITICAL for the success page to verify the payment later.
        params.append('success_url', `${origin}/thanks.html?session_id={CHECKOUT_SESSION_ID}`);
        params.append('cancel_url', `${origin}/index.html`);

        // Add line items to the request
        // Stripe expects line_items[0][price], line_items[0][quantity], etc.
        items.forEach((item, index) => {
            params.append(`line_items[${index}][price]`, item.priceId);
            params.append(`line_items[${index}][quantity]`, item.quantity);
        });

        // 5. Call Stripe API
        // Direct fetch call to create the session
        const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const session = await stripeResponse.json();

        // 6. Handle Stripe API Errors
        if (!stripeResponse.ok) {
            console.error('Stripe API Error:', session);
            return res.status(stripeResponse.status).json({ error: session.error?.message || 'Stripe error' });
        }

        // 7. Success Response
        // Return the Checkout Session URL to the frontend
        return res.status(200).json({ url: session.url });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
