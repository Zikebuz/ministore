# Step-by-Step AI Prompts to Recreate Mini Store

Use these prompts in sequence with an AI Code Editor (like Trae) to build this project from scratch.

## Phase 1: Setup & Basic Structure

**Prompt 1: Project Initialization & Structure**
> Initialize a new project structure for a simple e-commerce landing page using **Bootstrap 5.3** (via CDN).
> 
> **1. Create the following folder structure:**
> - Root: `index.html` (Main page)
> - `api/`: Directory for backend serverless functions.
> - `images/`: Directory for product images.
> - `private/`: Directory for secure digital product files.
>
> **2. Set up `index.html`:**
> - Create a basic HTML5 boilerplate.
> - Include Bootstrap 5.3 CSS and JS via CDN.
> - Add a responsive **Navbar** with a "Glassmorphism" effect (translucent background).
> - Add a **Main Content Area** container.
> - Add a **Footer** with 4 specific columns:
>   - **About Us**: Short text description.
>   - **Links**: Home, Cart, WhatsApp.
>   - **Payment Options**: Icons (Visa, Mastercard, etc.).
>   - **Follow Us**: Social media icons.
> - **Theme:** The site should default to **Dark Mode**.

**Prompt 2: Product Cards**
> In the main content area of `index.html`, create two product cards using Bootstrap.
> 1. A physical product: "Rolex Diamond Wristwatch" (image: `images/rolex-diamond.jpg`) with a price of **$20.00**, a short description, and a "Buy Now" button.
> 2. A digital product: "Vibe Coding E-Book" (image: `images/vibe-coding-cover.jpg`) with a price of **$10.00**, a short description, and a "Buy Now" button.
> Style the cards to look premium, with a dark background and white text.

## Phase 2: Theming & Aesthetics

**Prompt 3: Dark/Light Mode Toggle & Refinements**
> Implement a robust Dark/Light mode toggle.
> 1. Add a toggle button (moon/sun icon) to the navbar.
> 2. Write JavaScript to switch the Bootstrap `data-bs-theme` attribute between 'dark' and 'light'.
> 3. Save the user's preference to `localStorage` so it persists on reload.
> 4. **Important:** Ensure the navbar toggler (hamburger menu) is visible in light mode by changing the icon lines from white to black (e.g., using a custom SVG or filter).
> 5. **Important:** Ensure payment icons and text remain visible in light mode (avoid white-on-white).

**Prompt 4: Visual Polish (Glassmorphism & Animations)**
> Let's improve the aesthetics with specific requirements.
> 1. Add a "Glassmorphism" effect to the navbar (translucent background with blur).
> 2. Add a hover effect to the product cards: they should lift up slightly (`translateY`) and have a stronger shadow.
>    - **Shadow Requirement:** For light mode cards, use this specific shadow: `box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);`.
> 3. Add a "breathing" animation (subtle scale up/down) to the social media icons AND the footer links (Home, Cart, WhatsApp) on hover.
> 4. **Hover Colors:** Unify all hover colors (Navbar links, Footer links) to a gray shade (`#adb5bd`) for consistency. In Light Mode, ensure these hover effects are still high-contrast (e.g., black).

**Prompt 5: Order Confirmation Page**
> Create a new file named `thanks.html`. This page will be shown after a user completes a purchase.
> 1. Display a "Thank You" message and a "Back to Home" button.
> 2. Add logic to check a URL parameter `?type=digital`. If present, show a "Preparing your download..." message.
> 3. **Security:** Add a Content Security Policy (CSP) meta tag to restrict script sources to self, Stripe, and CDNs.

**Prompt 6: Secure Download Logic (Backend)**
> I need to securely deliver the PDF for the digital product.
> 1. Create a Vercel Serverless Function at `api/download.js`.
> 2. This function should check the request `Referer` header.
> 3. Only allow downloads if the request comes from my Stripe Checkout or the `thanks.html` page.
> 4. If valid, redirect the user to a secure file URL (mock this URL for now). If invalid, return a 403 Forbidden error.

## Phase 4: Finalization

**Prompt 7: Content & SEO**
> Update the `index.html` with real content.
> 1. Use high-quality descriptions for the Rolex and E-Book, and link the "Buy Now" buttons to Stripe payment links.
> 2. Add proper `meta` tags for SEO (title, description).
> 3. Add a Privacy Policy and Terms of Service modal to the footer.

**Prompt 8: Code Cleanup & Documentation**
> Review all files (`index.html`, `thanks.html`, `api/download.js`).
> 1. Ensure code is properly indented.
> 2. Add JSDoc comments to functions and inline comments to complex CSS/JS sections.
> 3. Create a `README.md` explaining how to run the project locally and deploy to Vercel.

**Prompt 9: Git Initialization & GitHub Push**
> Initialize a Git repository for this project.
> 1. Create a `.gitignore` file to exclude OS-specific files (e.g., `.DS_Store`, `Thumbs.db`).
> 2. Initialize git (`git init`).
> 3. Add all files (`git add .`) and commit them (`git commit -m "Initial commit"`).
> 4. Provide the commands to add a remote origin and push to main, assuming the user has already created a repository on GitHub (e.g., `git remote add origin <URL>` and `git push -u origin main`).
