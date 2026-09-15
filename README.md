# Draftline — AI Resume Studio

> 🚧 **Work in Progress:** This project is currently in active development. Features and UI are subject to change.


Draftline is a professional, modern, and intelligent web application designed to help job seekers build ATS-optimized resumes and cover letters. 

Powered by Next.js, Supabase, and Google Gemini AI, Draftline goes beyond basic formatting by actively analyzing your resume against target job descriptions and generating highly-tailored, impact-driven bullet points.

## 🌟 Key Features

- **Intelligent ATS Matcher:** Paste a job description and Draftline will analyze your current resume to provide a match score, missing keywords, and contextual suggestions.
- **AI-Powered Enhancements:** Use the integrated AI engine to instantly rewrite weak bullet points into strong, action-oriented achievements.
- **Side-by-Side Live Preview:** A split-screen interface (built with Tailwind CSS and Framer Motion) allows you to edit data on the left while instantly previewing the professional, print-ready document on the right.
- **Secure Cloud Sync:** Powered by Supabase, user accounts are securely authenticated (Google OAuth & Email/Password) and data is instantly synced to the cloud.
- **Flawless PDF Export:** Export pixel-perfect, highly customized PDF documents directly from the browser.
- **Premium UI/UX:** Features a state-of-the-art "Stitch" design system including dynamic glassmorphism, 3D interactive elements, and buttery-smooth CSS transitions.

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Authentication & Database:** Supabase (PostgreSQL + Auth)
- **AI Engine:** Google Gemini Pro API (`@google/genai`)
- **PDF Generation:** `@react-pdf/renderer`

## 🚀 Run it Locally

You'll need [Node.js](https://nodejs.org) 18.17 or newer installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Google Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

## 🌍 Deployment

This project is fully optimized for zero-config deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. **CRITICAL:** Ensure you copy the contents of your `.env.local` file into the Vercel **Environment Variables** settings before deploying.
4. Click **Deploy**.

## 🗺️ Roadmap & Next Steps

- [x] Integrate AI bullet-point rewriting
- [x] Implement Job Description (ATS) matching
- [x] Integrate cloud account sync via Supabase
- [ ] Add AI auto-generated Cover Letters
- [ ] Multiple saved profiles and resume versions
- [ ] Implement Premium Billing/Paywall
