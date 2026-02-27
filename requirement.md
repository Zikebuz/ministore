# Project Requirements & Technology Stack

This document details the functional requirements and the technology stack chosen to build the Mini Store.

## Functional Requirements

### 1. User Interface (UI) & User Experience (UX)
- **Responsive Design:** The store must look good on all devices (mobile, tablet, desktop).
- **Theme Support:** Must include a robust Dark Mode and Light Mode toggle that persists user preference via Local Storage.
- **Aesthetics:** High-quality visual design with "Glassmorphism" effects, animated underlines, and subtle hover animations (breathing effects).
- **Navigation:** A responsive navbar with a hamburger menu for mobile, scrollspy highlighting for sections, and a back-to-top button for quick navigation.
- **Footer:** A comprehensive footer with links, social icons, and payment method indicators, visually aligned with the main content on both desktop and mobile.

### 2. Product Management
- **Support for Multiple Product Types:**
  - **Physical Products:** Tangible items (e.g., Luxury Watch) that require shipping.
  - **Digital Products:** Downloadable items (e.g., E-Book) that are delivered instantly.
- **Product Cards:** Display product image, title, description, and "Buy Now" / "Add to Cart" buttons.

### 3. Shopping Cart Functionality
- **Cart Management:** Add items to a shopping cart using local storage to persist selections.
- **Cart UI:** A modal popup to view cart contents, adjust quantities, and remove items; the cart modal should auto-close when it becomes empty.
- **Theme Awareness:** The cart modal and its components must adapt to the current theme (dark/light mode).
- **Checkout Process:** A "Checkout" button in the cart that initiates the Stripe payment flow, clearing the cart on success while using a backup to restore items if checkout fails.

### 4. E-Commerce Functionality
- **Payment Integration:** Use Stripe Checkout for secure payment processing, including automatic billing address collection when physical products are present in the cart.
- **Order Confirmation:** A dedicated "Thank You" page (`thanks.html`) shown after a successful purchase, which clears cart storage and respects the selected theme.
- **Secure Digital Delivery:**
-  - Digital files must not be directly accessible via public URL to prevent unauthorized sharing.
-  - The system must verify payment status (via Stripe Session ID) before serving the file.
-  - Digital downloads must only be initiated automatically when the successful checkout included a digital product, even if physical items were also purchased.

## Technology Stack

### Frontend
- **HTML5:** Semantic markup for structure.
- **CSS3:** Custom styling with CSS Variables for theming.
- **Bootstrap 5.3:** CSS framework for responsive grid, components (Navbar, Cards, Modals), and utility classes.
- **JavaScript (ES6+):** Vanilla JS for DOM manipulation, theme toggling, cart logic, and API communication.

### Backend / Serverless
- **Vercel Serverless Functions:**
  - `/api/checkout.js`: Creates Stripe Checkout sessions.
  - `/api/download.js`: Verifies payment and streams the digital file securely.
- **Node.js:** The runtime environment for serverless functions.

### Storage & Hosting
- **Vercel:** Hosting platform for both the static frontend and serverless backend.
- **Vercel Blob Storage:** Cloud storage for hosting the digital product files securely (accessed via the API).
- **Local Storage:** Browser storage for persisting theme preferences and cart data.

### Payment Processing
- **Stripe:** Handles all payment processing via hosted Checkout pages.
- **Stripe API:** Direct integration via serverless functions to create sessions and verify payments.

## Key Design Decisions
- **No Database:** To keep the project lightweight and "serverless", we avoid a traditional database. Product details are hardcoded in HTML, and order verification relies on Stripe Session validation.
- **Client-Side Theme Logic:** Theme preference is handled entirely in the browser using `localStorage` and CSS attribute selectors (`[data-bs-theme="dark"]`).
- **Serverless Checkout:** Instead of static payment links, we generate dynamic checkout sessions to allow for cart functionality and secure verification.
