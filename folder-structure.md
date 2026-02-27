# Project Folder Structure

This document outlines the file and directory organization for the Mini Store project (`c:\Users\ebuka\Desktop\static`).

## Root Directory

- `index.html`: **Main Landing Page**. Contains the product listings (Rolex Watch, Vibe Coding E-Book), shopping cart logic (add/remove/update), navigation bar, footer, and the dark/light mode toggle logic.
- `thanks.html`: **Order Confirmation Page**. Displayed after a successful Stripe payment. It verifies the session and initiates the secure digital download.
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
