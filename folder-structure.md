# Project Folder Structure

This document outlines the file and directory organization for the Mini Store project (`c:\github\ministore`).

## Root Directory

- `index.html`: **Main Landing Page**. Contains the product listings (Rolex Watch, Vibe Coding E-Book), shopping cart logic (add/remove/update), navigation bar, footer, scrollspy navigation, a back-to-top button, and the dark/light mode toggle logic. The cart auto-closes when empty and clears on successful checkout, with a backup used to restore items if checkout fails.
- `thanks.html`: **Order Confirmation Page**. Displayed after a successful Stripe payment. It clears cart storage, respects the selected theme, and conditionally initiates the secure digital download only when the checkout was for a digital product.
- `README.md`: **Project Documentation**. Instructions for installation, usage, configuration, and deployment.
- `folder-structure.md`: **Project Structure**. This file, describing the organization of the codebase.
- `requirement.md`: **Requirements & Tech Stack**. Detailed list of features, functional requirements, and technologies used.
- `prompt.md`: **Reconstruction Guide**. Step-by-step AI prompts to rebuild this project from scratch.
- `.gitignore`: **Git Configuration**. Specifies files and directories to be ignored by Git (e.g., system files, private keys).

## /api

Contains **Vercel Serverless Functions** for backend logic.

- `checkout.js`: **Stripe Checkout Handler**. 
  - Accepts a POST request with cart items.
  - Communicates with Stripe API to create a Checkout Session.
  - Dynamically sets success URLs to distinguish digital checkouts from purely physical ones.
  - Requires billing address collection when the cart contains physical items.
  - Returns the checkout URL to the frontend.
- `download.js`: **Secure Download Handler**.
  - Verifies the Stripe Session ID to ensure payment was successful.
  - Fetches the protected digital file from a secure source.
  - Streams the file to the user (preventing direct link sharing).

## /images

Stores static assets for the frontend.

- `rolex-diamond.jpg`: Product image for the physical item.
- `vibe-coding-cover.jpg`: Product image for the digital E-Book.

## /private

Used for local development and testing.

- `vibe-coding-guide.pdf`: A local copy of the digital product. In production, this should be stored in Vercel Blob Storage or AWS S3, not committed to the repository if sensitive.
