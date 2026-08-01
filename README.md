# Bigger Nightingale Manufacturing — Budget Recipe Discovery Platform

> **Tagline**: *"Big ideas, beautiful design. Built with Google Antigravity."*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248.svg)](https://www.mongodb.com/cloud/atlas)
[![Gemini AI](https://img.shields.io/badge/AI Engine-Google%20Gemini%201.5-8E75B2.svg)](https://aistudio.google.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%2B%20Render-black.svg)](https://vercel.com/)

Welcome to **Bigger Nightingale Manufacturing**, a full-stack MERN application engineering solution designed as a cloud-synced and 100% offline-capable budget recipe discovery platform tailored for budget-conscious culinary enthusiasts.

This repository features production-ready software architecture, responsive UI components, RESTful API design, NoSQL data modeling, and generative AI integration built with a 100% free-tier cloud deployment specification.

---

## 🏗️ Technical Architecture & Key Highlights

- **Full-Stack MERN Architecture**: Modular separation of concerns with a React SPA frontend and a decoupled Node.js/Express REST API backend.
- **Artificial Intelligence Integration**: Google Gemini 1.5 Flash LLM SDK integration with built-in graceful degradation and intelligent offline fallback handling.
- **Database Modeling & ORM**: NoSQL data persistence engineered with MongoDB Atlas and Mongoose schema validation for Products, Blog Posts, and Inquiries.
- **Component-Driven UI/UX Design System**: High-contrast, responsive interface using Tailwind CSS v3, Framer Motion micro-animations, and custom typography (`Playfair Display` + `Inter`).
- **Dynamic SEO & Performance Optimization**: Headless Meta Tag management using React Helmet Async for OpenGraph metadata and search engine indexing.
- **Hybrid Local Mode**: Operational offline mode enabling zero-dependency local testing without mandatory cloud API or database connections.

---

## 🎨 Brand Identity & Design System

- **Motto / Tagline**: *"Big ideas, beautiful design. Built with Google Antigravity."*
- **Aesthetic Vibe**: Luxurious, minimalist, accessible, and high-performance UI.
- **Color Palette Tokens**:
  - **Primary Background**: Pure White (`#FFFFFF`)
  - **Secondary Surfaces**: Alabaster / Soft Cream (`#F9F9F9` / `#F5F3EF`)
  - **Typography & High Contrast**: Deep Charcoal (`#1F1F1F`)
  - **Accents & CTAs**: Champagne Gold (`#D4AF37`) & Soft Sage Green (`#9CAF88`)
- **Typography Standards**:
  - **Headings**: `Playfair Display` (Serif)
  - **Body Text**: `Inter` (Sans-Serif)
- **Logo Concept**: Minimalist line-art Nightingale integrated with a culinary cloche/serving lid.

---

## 🛠️ Tech Stack & Skill Matrix

### Frontend Engineering (`/frontend`)
- **Framework**: React 18 (Vite Bundler)
- **Styling & Design System**: Tailwind CSS v3 + Custom Utility Tokens
- **Animations & Interactivity**: Framer Motion
- **Routing**: React Router DOM v6 (Single Page Application Architecture)
- **SEO & Metadata Management**: React Helmet Async
- **HTTP Client**: Axios (Asynchronous API Integrations)
- **Icons**: Lucide React
- **Deployment Spec**: `vercel.json` SPA Rewrite Routing Configuration

### Backend Engineering (`/backend`)
- **Runtime & Server**: Node.js + Express.js Framework
- **Database Engine**: MongoDB Atlas via Mongoose ODM Schemas (`Product`, `Post`, `Contact`)
- **AI & Natural Language Processing**: Google Generative AI SDK (`@google/generative-ai`) Gemini 1.5 API Proxy Endpoint
- **Middleware & Security**: `dotenv`, `cors`, JSON Body Parser
- **DevOps Spec**: `render.yaml` Infrastructure-as-Code (IaC) configuration for Render Web Service

---

## 🚀 Quick Local Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Bigger-Nightingale-Manufacturing-Source.git
cd Bigger-Nightingale-Manufacturing-Source
```

### 2. Frontend Setup (`/frontend`)
```bash
cd frontend
npm install
npm run dev
```
The React Vite development server will launch at `http://localhost:5173`.

### 3. Backend Setup (`/backend`)
```bash
cd ../backend
npm install
```

Create a `.env` file in the `/backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nightingale?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Note**: If `MONGO_URI` or `GEMINI_API_KEY` are left blank, the backend operates in **Hybrid Local Mode** with built-in mock fallbacks so you can test all features offline instantly!

Start the backend server:
```bash
npm start
# or for auto-reloading dev mode:
npm run dev
```
The Express API server will start on `http://localhost:5000`.

### 4. Database Seeding (Optional)
To seed initial budget recipe app products and culinary blog posts into your MongoDB Atlas database:
```bash
cd backend
npm run seed
```
Or send a `POST` request to `http://localhost:5000/api/seed`.

---

## 🌐 Free Public Deployment Guide

This project is optimized to run **100% free of charge** using Vercel (Frontend) and Render (Backend).

### Step A: Push Source Code to GitHub
1. Create a new public or private repository on GitHub (e.g. `Bigger-Nightingale-Manufacturing-Source`).
2. Run in terminal:
```bash
git remote add origin https://github.com/your-username/Bigger-Nightingale-Manufacturing-Source.git
git branch -M main
git push -u origin main
```

---

### Step B: Deploy Frontend to Vercel (Free)

1. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
2. Import your GitHub repository `Bigger-Nightingale-Manufacturing-Source`.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable (Optional):
   - `VITE_API_URL`: `https://your-backend-render-app.onrender.com/api`
5. Click **Deploy**. Vercel will build and host your frontend with custom domain HTTPS for free.

---

### Step C: Deploy Backend to Render (Free)

1. Log in to [Render](https://render.com/) and click **"New" -> "Web Service"**.
2. Connect your GitHub repository `Bigger-Nightingale-Manufacturing-Source`.
3. Configure web service settings:
   - **Name**: `bigger-nightingale-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Add Production Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `GEMINI_API_KEY`: Your free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://bigger-nightingale.vercel.app`).
   - `NODE_ENV`: `production`
5. Click **Create Web Service**.

---

## 🔑 Obtaining Free API Keys & Database URIs

### 1. Free MongoDB Atlas URI
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (Free M0 Cluster).
- Create a Database User & Password.
- Whitelist IP Access (`0.0.0.0/0` for cloud deployment).
- Copy the Connection String into `MONGO_URI`.

### 2. Free Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/).
- Click **"Get API Key"** and create a key (Free Tier).
- Copy key into `GEMINI_API_KEY`.

---

## 📄 License & Attribution

Copyright (c) 2026 **Ananth Ram**. All Rights Reserved.

This project is proprietary software. Public access on GitHub is provided strictly for recruiter, employer, and client portfolio review. Copying, cloning, redistribution, or template usage is strictly prohibited.

For complete license terms, please see [LICENSE.md](LICENSE.md).

Created by **Ananth Ram** (**Bigger Nightingale Manufacturing**).  
Built autonomously with Google Antigravity.

