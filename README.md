# Mini Store - Premium Physical & Digital Products

A modern, responsive e-commerce landing page for selling physical and digital products securely. Built with **Bootstrap 5.3** and vanilla **JavaScript**, featuring a robust dark/light mode and secure digital download handling via **Vercel Serverless Functions**.

## Features
- **Responsive Design:** Fully responsive layout using Bootstrap 5.3.
- **Dark/Light Mode:** Persistent theme toggle using LocalStorage.
- **Secure Digital Delivery:** Serverless function (`/api/download`) verifies Stripe payments before serving files.
- **Glassmorphism UI:** Modern aesthetic with translucent elements and smooth animations.
- **Stripe Integration:** Direct integration with Stripe Payment Links.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Zikebuz/ministore.git
    cd ministore
    ```

2.  **Local Development:**
    Simply open `index.html` in your web browser.
    
    *Optional:* For a better development experience (hot reloading), use a local server like `live-server` or VS Code's "Live Server" extension.

## Configuration

1.  **Stripe Setup:** Create a new Payment Link in your Stripe Dashboard.
2.  **Environment Variables (Vercel):**
    - `STRIPE_SECRET_KEY`: Your Stripe Secret Key (sk_test_...).
    - `FILE_URL`: The URL of the private file to serve (e.g., from Vercel Blob).
    - `BLOB_READ_WRITE_TOKEN`: Token to access Vercel Blob (if using Blob storage).
3.  **Redirect:** Configure the Stripe confirmation page to redirect to your deployed `thanks.html` with the session ID:
    `https://your-project.vercel.app/thanks.html?session_id={CHECKOUT_SESSION_ID}`

## Usage

1.  **Browse Products:** View available products on the homepage.
2.  **Theme Toggle:** Switch between Dark and Light modes using the moon/sun icon in the navbar. The preference is saved to your browser's local storage.
3.  **Purchase:** Click "Buy Now" to be redirected to the Stripe checkout page.
4.  **Order Confirmation:** After a successful purchase, you will be redirected to the `thanks.html` page.
5.  **Secure Download:** The `thanks.html` page will automatically validate your session ID. If valid, it will initiate the secure download of your digital product.

## Environment

This project is designed to be hosted on **Vercel**.

-   **Frontend:** Static HTML/CSS/JS served directly.
-   **Backend:** Vercel Serverless Functions (`/api/download.js`) handle secure file delivery.
-   **Storage:** Vercel Blob Storage (or any secure URL) is used to host the PDF files.

### Directory Structure

```
/
├── api/
│   └── download.js       # Serverless function for secure downloads (Node.js)
├── images/               # Product images
├── private/              # Local testing files (not for production)
├── index.html            # Main landing page (Product Showcase)
├── thanks.html           # Order confirmation & download redirect page
├── README.md             # Project documentation
├── requirement.md        # Detailed requirements and tech stack
└── folder-structure.md   # Folder structure overview
```

## Security & Audit

This repository follows strict security and hygiene standards:

-   **Digital Downloads:** The `/api/download.js` function implements a **Stripe Session Verification**. It calls the Stripe API to confirm that the session ID provided in the URL corresponds to a completed and paid session before serving the file.
-   **Content Security Policy (CSP):** `thanks.html` includes a CSP header to restrict script and resource loading to trusted domains (Stripe, CDNs).
-   **Hidden Source:** The actual location of the file (`FILE_URL`) is kept in environment variables and never exposed to the client.
-   **Code Hygiene:** All files are formatted and include inline documentation for maintainability.

## License

All rights reserved. Designed by Ebuka.
