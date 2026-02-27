# Mini Store - Premium Physical & Digital Products

A modern, responsive e-commerce landing page for selling physical and digital products securely. Built with Bootstrap 5 and vanilla JavaScript, featuring a robust dark/light mode and secure digital download handling via Vercel Serverless Functions.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd static
    ```

2.  **Local Development:**
    Simply open `index.html` in your web browser.
    
    *Optional:* For a better development experience (hot reloading), use a local server like `live-server` or VS Code's "Live Server" extension.

## Configuration

1.  **Stripe Setup:** Create a new Payment Link in your Stripe Dashboard.
2.  **Upload Product:** Ensure the digital product file is uploaded to the Stripe Payment Link settings.
3.  **Redirect:** Configure the confirmation page to redirect to your deployed `thanks.html` (e.g., `https://your-project.vercel.app/thanks.html?type=digital`).

## Usage

-   **Browse Products:** View available products on the homepage.
-   **Theme Toggle:** Switch between Dark and Light modes using the moon/sun icon in the navbar. The preference is saved to your browser's local storage.
-   **Purchase:** Click "Buy Now" to be redirected to the Stripe checkout page.
-   **Download:** After purchase, you will be redirected to the `thanks.html` page where the digital download will be initiated automatically.

## Environment

This project is designed to be hosted on **Vercel**.

-   **Frontend:** Static HTML/CSS/JS served directly.
-   **Backend:** Vercel Serverless Functions (`/api/download.js`) handle secure file delivery.
-   **Storage:** Vercel Blob Storage is used to host the PDF files.

### Directory Structure

```
/
├── api/
│   └── download.js       # Serverless function for secure downloads
├── images/               # Product images
├── private/              # Local testing files (not for production)
├── index.html            # Main landing page
├── thanks.html           # Order confirmation page
└── README.md             # Project documentation
```

## Security

-   **Digital Downloads:** The `/api/download.js` function implements a referrer check to ensure download requests originate from valid sources (Stripe Checkout or the `thanks.html` page).
-   **Content Security Policy (CSP):** `thanks.html` includes a CSP header to restrict script and resource loading to trusted domains (Stripe, CDNs).
-   **Blob Storage:** While the Blob URL is public, the application logic attempts to hide it behind the API redirection to prevent direct link sharing.

## License

All rights reserved. Designed by Ebuka.
