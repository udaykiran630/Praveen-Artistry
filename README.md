# Praveen Artistry — Makeup School & Studio

A modern, high-performance web application for **Praveen Artistry Makeup School & Studio**, built with React 19, TanStack Start (SSR), TanStack Router, Tailwind CSS v4, Framer Motion, and Supabase.

---

## 🌟 Key Features

- **Courses Showcase:** Comprehensive curriculums for Professional Makeup, Bridal Makeup, HD Makeup, Party Makeup, Hairstyling, and Basic-to-Advanced programs.
- **Online Enquiries & Student Registration:** Interactive multi-step enrollment and consultation booking.
- **Portfolio & Gallery:** High-resolution bridal and makeover lookbooks with category filtering.
- **Client Testimonials:** Dynamic carousel of graduate student and bridal client reviews.
- **Direct WhatsApp & Phone Integration:** One-tap messaging and calling directly to academy admissions.
- **Admin Management Portal:** Dedicated management console for enquiries and bookings.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher (v24 recommended)
- **npm**: v10 or higher

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   SUPABASE_PROJECT_ID="your_supabase_project_id"
   SUPABASE_PUBLISHABLE_KEY="your_supabase_publishable_key"
   SUPABASE_URL="your_supabase_url"
   VITE_SUPABASE_PROJECT_ID="your_supabase_project_id"
   VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_publishable_key"
   VITE_SUPABASE_URL="your_supabase_url"
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal) in your browser.

---

## 🛠 Available Scripts

- `npm run dev`: Starts Vite dev server with hot reload and SSR support.
- `npm run build`: Creates an optimized production build via Vite & Nitro.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.
- `npm run format`: Formats source files with Prettier.
- `npm run test`: Executes unit tests with Vitest.

---

## 🎨 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React framework)
- **Routing**: [TanStack Router](https://tanstack.com/router) (Type-safe client & SSR routing)
- **UI Components**: Radix UI primitives & Lucide Icons
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database / Backend**: Supabase
