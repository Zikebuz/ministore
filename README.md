# Mini Store - Premium Physical & Digital Products

A modern, responsive e-commerce landing page for selling physical and digital products securely. Built with Bootstrap 5 and vanilla JavaScript, featuring a robust dark/light mode, a functional shopping cart, and secure digital download handling via Vercel Serverless Functions.

## Features

- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Theme Support:** User-selectable Dark/Light mode with persistence (LocalStorage).
- **Shopping Cart:** Add items, adjust quantities, and checkout via a modal interface.
- **Stripe Checkout:** Secure payment processing using Stripe's hosted checkout.
- **Secure Digital Downloads:** Digital products are protected and only accessible after a verified purchase.
- **Serverless Architecture:** Backend logic runs on Vercel Serverless Functions.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Zikebuz/ministore.git
    cd static
    ```

2.  **Local Development:**
    Simply open `index.html` in your web browser.
    
    *Note:* The checkout functionality requires a backend environment. To test checkout locally, you would need to use `vercel dev` or deploy to Vercel. However, the frontend UI (cart, theme) works directly in the browser.

## Configuration

This project requires environment variables to function correctly on Vercel.

### Environment Variables

Set the following variables in your Vercel Project Settings:

- `STRIPE_SECRET_KEY`: Your Stripe Secret Key (starts with `sk_test_...` or `sk_live_...`).
- `FILE_URL`: The direct URL to your digital product file (e.g., stored in Vercel Blob or S3).
- `BLOB_READ_WRITE_TOKEN`: (Optional) If using Vercel Blob with restricted access, provide the token here.

### Stripe Setup

1.  **Create Products:** Create your products in the Stripe Dashboard.
2.  **Get Price IDs:** Copy the Price ID (e.g., `price_1T5Ad...`) for each product.
3.  **Update `index.html`:** Update the `data-price-id` attributes in the "Add to Cart" buttons in `index.html` with your actual Stripe Price IDs.

## Usage

-   **Browse Products:** View available products on the homepage.
-   **Theme Toggle:** Switch between Dark and Light modes using the moon/sun icon in the navbar.
-   **Add to Cart:** Click the cart icon on product cards to add them to your shopping cart.
-   **Manage Cart:** Click the cart icon in the footer or navbar (if enabled) to view and edit cart items.
-   **Checkout:** Click "Checkout" in the cart modal to be redirected to Stripe.
-   **Download:** After purchase, you will be redirected to the `thanks.html` page where the digital download will be initiated automatically.

## Project Structure

```
/
├── api/
│   ├── checkout.js       # Creates Stripe Checkout sessions
│   └── download.js       # Verifies payment and streams file
├── images/               # Product images
├── private/              # Local testing files (not for production)
├── index.html            # Main store page with cart logic
├── thanks.html           # Order confirmation page
└── README.md             # Project documentation
```

## Security

-   **Digital Downloads:** The `/api/download.js` function verifies the Stripe Session ID to ensure the payment was successful before serving the file.
-   **Environment Variables:** Sensitive keys (Stripe Secret) are stored in server-side environment variables, never exposed to the client.

## License

All rights reserved. Designed by Ebuka.
