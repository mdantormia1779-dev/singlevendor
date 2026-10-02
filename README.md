<<<<<<< HEAD
Finora — Modern Full-Stack E-Commerce Platform

Finora** is a modern, scalable, and high-performance single-vendor e-commerce web application built with **Next.js 16, React 19, Prisma ORM, and PostgreSQL (Neon).

Key Features
Modern UI/UX: Clean, modern interface with smooth animations powered by **GSAP & Framer Motion**, combined with a mobile-first responsive design.
Product Reviews & 1–5 Star Ratings: Real-time customer feedback with interactive star ratings, hover and click interactions, and percentage-based rating distribution bars.
Product Q&A: Customers can ask questions about products, while store administrators can provide official responses directly from the platform.
Smart Product Discovery: Instant search suggestions, category and price-based filtering, and a dedicated flash sale section.
Shopping Cart & Buy Now: Redux Toolkit-powered** shopping cart with a streamlined **Buy Now** flow for faster purchasing.
Dynamic Checkout & Payments: Supports **Cash on Delivery** along with **bKash/Nagad transaction verification** for a flexible and secure checkout experience.
Live Order Tracking: Customers can track their order status throughout the delivery process.
Admin Dashboard: Comprehensive dashboard featuring **real-time revenue analytics with Recharts**, product management with cloud image uploads, and complete order management.
Scalable Architecture:** Structured full-stack architecture designed for maintainability, performance, and future scalability.

Tech Stack
• Frontend: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Radix UI Primitives, Lucide Icons
• Animations: GSAP (GreenSock), Framer Motion, React Fast Marquee
• State Management: Redux Toolkit (RTK), React-Redux (Local storage synchronized)
• Forms & Validation: React Hook Form, Yup, @hookform/resolvers, Input-OTP
• Backend: Next.js Route Handlers (Serverless), Node.js
• Database & ORM: PostgreSQL (Neon Serverless Database), Prisma ORM (v5.22)
• Authentication: Better-Auth, Database Session Auth, Google OAuth 2.0, Role-Based Access Control (Admin / Customer)
• Cloud Storage: Cloudinary API, AWS S3 SDK (@aws-sdk/client-s3), Multer
• Charts & Analytics: Recharts
• Notifications: React-Toastify
=======
# Finora — Modern Single Vendor E-Commerce Platform

![Finora E-Commerce Platform Thumbnail](./public/portfolio-thumbnail.jpg)

> A high-performance, full-stack Single Vendor E-Commerce web application built with **Next.js 16**, **React 19**, **Prisma ORM**, and **PostgreSQL**. Features real-time customer reviews with 1-5 star ratings, product Q&A, comprehensive checkout pipelines (Cash on Delivery, bKash, Nagad), and a full-featured Admin & Customer Dashboard.

---

## 📌 Project Overview (বর্ণনা)

**Finora** is a production-grade, full-stack single-vendor e-commerce platform designed for modern online brands. It offers a smooth, responsive shopping journey from product discovery, flash sales, category filtering, and image galleries to checkout, real-time reviews & ratings, and live order tracking. The platform also provides an intuitive Admin Dashboard for comprehensive store management, real-time analytics, order status pipelines, and product management.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) Primitives & [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animations:** [GSAP (GreenSock)](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Marquee:** `react-fast-marquee`

### State Management & Forms
- **Global State:** [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/) (Cart, Wishlist, User Auth state with persistent local storage sync)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Yup](https://github.com/jquense/yup) & `@hookform/resolvers`
- **OTP Input:** `input-otp`
- **Notifications:** [React-Toastify](https://fkhadra.github.io/react-toastify/)

### Backend & Database
- **Runtime:** Node.js & Next.js Server Route Handlers
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Serverless Neon DB with connection pooling)
- **ORM:** [Prisma ORM (v5.22.0)](https://www.prisma.io/)
- **Authentication:** [Better-Auth](https://www.better-auth.com/) & Database Credentials / Session Authentication + Google OAuth 2.0
- **File & Media Storage:** [Cloudinary](https://cloudinary.com/) & [AWS S3](https://aws.amazon.com/s3/) (`@aws-sdk/client-s3`) with Multer

### Analytics & Visualizations
- **Charts & Reports:** [Recharts](https://recharts.org/) (Revenue trends, order counts, customer metrics)

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Responsive Modern UI:** Ultra-fast, responsive design with smooth micro-animations (GSAP & Framer Motion).
- **Product Catalog & Filtering:** Category browsing, price filtering, sorting, instant search suggestions, flash sale counters, and trending highlights.
- **Dynamic Product Details:** Interactive thumbnail carousel, zoom view, specifications, stock count, and stock availability badge.
- **Reviews & 1-5 Star Ratings:**
  - Dynamic rating overview with average score, 5-to-1 star progress breakdown, and percentage calculations.
  - Interactive clickable 1-5 star selector with hover feedback.
  - Verified buyer badge, review comments, and rating filters.
- **Product Q&A (Questions & Answers):**
  - Shoppers can ask questions about sizing, fabrics, warranty, or delivery.
  - Verified official store answer badges with timestamps.
- **Seamless Cart & "Buy Now":** One-click add-to-cart, cart drawer/sidebar, direct "Buy Now" checkout bypass.
- **Checkout & Local Payment Methods:**
  - Cash on Delivery (COD)
  - Mobile Financial Services (bKash & Nagad with Transaction ID submission)
- **Order Tracking:** Real-time visual timeline from Pending ➔ Confirmed ➔ Processing ➔ Delivered.

### 🛡️ Admin & Store Management
- **Analytics Dashboard:** Live revenue, total orders, pending orders, and visual sales graphs.
- **Product Management:** Add/Edit/Delete products with multi-image cloud uploads (Cloudinary / AWS S3).
- **Order Management:** View orders, customer contact, delivery address, update statuses, and verify payment transactions.
- **Customer Management:** View registered users, roles, and order counts.
- **Store Settings:** Customize delivery fees (Standard / Express), contact details, and MFS payment numbers.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.17+ or v20+)
- PostgreSQL database (or Neon DB connection string)

### 2. Installation
```bash
git clone https://github.com/your-username/finora-ecommerce.git
cd finora-ecommerce
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_database_connection_url"
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Cloudinary (Product Media)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# AWS S3 (Alternative Storage)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_BUCKET_NAME="your_bucket_name"
```

### 4. Database Setup
```bash
npx prisma db push
npm run build
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the MIT License.
>>>>>>> e222c8a (login update)
