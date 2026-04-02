# Path2Tech Capstone Full Stack 
# Cozy Critter Crochet - E-Commerce Capstone

A full-stack, "boutique" e-commerce platform dedicated to hand-crocheted plushies. This project features a modern, responsive UI with a robust backend to handle product management, secure payments, and user authentication.

#Features
**Boutique UI/UX:** Designed with a high-end aesthetic using Tailwind CSS, Glassmorphism, and custom typography (Gistesy & Playfair Display).
**Dynamic Catalog:** Browse critters with real-time filtering by category (Marine, Farm, Llamapalooza).
**Secure Checkout:** Fully integrated with Stripe API for a seamless payment flow.
**Admin Suite:** Specialized role-based access allowing admins to create, upload (via Cloudinary), and delete product listings.
**State Management:** Persistent cart and user sessions using Zustand and LocalStorage.
**Full-Stack Architecture:** RESTful API built with Node.js/Express and a MongoDB NoSQL database.

# Tech Stack
Frontend: React.js, Tailwind CSS, Zustand, Lucide/Heroicons
Backend: Node.js, Express.js, MongoDB/Mongoose
External APIs: Stripe (Payments), Cloudinary (Image Hosting)
Authentication: Custom Auth with role-based access control (RBAC)

# Installation & Setup
Clone the repository:
git clone https://github.com

Install dependencies (run in both /frontend and /backend folders):
npm install

Configure Environment Variables

PORT=3500
DB_URL=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_sk
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=http://localhost:5173

Run the application

**npm start**
runs the project in development mode with hot reloading enabled.

📝 License
Distributed under the MIT License.
