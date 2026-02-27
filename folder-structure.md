# Project Folder Structure

This document outlines the file and directory organization for the Mini Store project.

## Root Directory

- `index.html`: The main landing page of the store. It contains the product listings (Physical Rolex watch, Digital E-Book), navigation, footer, and theme toggle logic.
- `thanks.html`: The order confirmation page. It handles the post-purchase experience and initiates the secure digital download process if applicable.
- `README.md`: The main documentation file for the project, including installation and usage instructions.
- `folder-structure.md`: This file, detailing the project structure.
- `requirement.md`: Detailed requirements and technology stack used.
- `prompt.md`: Step-by-step prompts to recreate this project from scratch using AI tools.

## /api

This directory contains serverless functions for backend logic.

- `download.js`: A Vercel Serverless Function that handles secure digital downloads. It verifies the request source (referrer check) to ensure only valid purchasers can download the file.

## /images

This directory stores all static image assets used in the application.

- `rolex-diamond.jpg`: Product image for the physical item (Rolex Watch).
- `vibe-coding-cover.jpg`: Product image for the digital item (Vibe Coding E-Book).

## /private

This directory is used for local development and testing of digital products.

- `vibe-coding-guide.pdf`: A local copy of the digital product file. In production, this file is served from Vercel Blob Storage via the API.
