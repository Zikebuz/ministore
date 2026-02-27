# Project Requirements & Technology Stack

This document details the functional requirements and the technology stack chosen to build the Mini Store.

## Functional Requirements

### 1. User Interface (UI) & User Experience (UX)
- **Responsive Design:** The store must look good on all devices (mobile, tablet, desktop).
- **Theme Support:** Must include a robust Dark Mode and Light Mode toggle that persists user preference via Local Storage.
- **Aesthetics:** High-quality visual design with "Glassmorphism" effects, animated underlines, and subtle hover animations (breathing effects).
- **Navigation:** A responsive navbar with a hamburger menu for mobile.
- **Footer:** A comprehensive footer with links, social icons, and payment method indicators.

### 2. Product Management
- **Support for Multiple Product Types:**
  - **Physical Products:** Tangible items (e.g., Luxury Watch) that require shipping.
  - **Digital Products:** Downloadable items (e.g., E-Book) that are delivered instantly.
- **Product Cards:** Display product image, title, description, and a "Buy Now" button.

### 3. E-Commerce Functionality
- **Payment Integration:** Use Stripe Payment Links for secure checkout.
- **Order Confirmation:** A dedicated "Thank You" page (`thanks.html`) shown after a successful purchase.
- **Secure Digital Delivery:**
  - Digital files must not be directly accessible via public URL to prevent unauthorized sharing.
  - The system must verify the purchase by validating the **Stripe Checkout Session ID** via the Stripe API before serving the file.

### 4. Security & Compliance
- **Session Validation:** Ensure that download links are only valid for verified purchases.
- **Content Security Policy:** Implement CSP headers to mitigate XSS attacks.
- **Environment Variables:** Securely store API keys and private URLs.

## Technology Stack

### Frontend
- **HTML5:** Semantic markup for structure.
- **CSS3:** Custom styling with CSS Variables for theming.
- **Bootstrap 5.3:** CSS framework for responsive grid, components (Navbar, Cards, Modals), and utility classes.
- **JavaScript (ES6+):** Vanilla JS for DOM manipulation, theme toggling logic, and URL parameter handling.

### Backend / Serverless
- **Vercel Serverless Functions:** Used to create the secure download endpoint (`/api/download`).
- **Node.js:** The runtime environment for the serverless function.

### Storage & Hosting
- **Vercel:** Hosting platform for both the static frontend and serverless backend.
- **Vercel Blob Storage:** Cloud storage for hosting the digital product files securely (accessed via the API).

### Payment Processing
- **Stripe:** Handles all payment processing via hosted Payment Links.

## Key Design Decisions
- **No Database:** To keep the project lightweight and "serverless", we avoid a traditional database. Product details are hardcoded in HTML, and order verification relies on Stripe API session checks (sufficient for this scale).
- **Client-Side Theme Logic:** Theme preference is handled entirely in the browser using `localStorage` and CSS attribute selectors (`[data-bs-theme="dark"]`).
