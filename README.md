# Bigger Nightingale Manufacturing — Budget Recipe Discovery Platform

> **Tagline**: *"Big ideas, beautiful design. I am using Antigravity by the way."*

Welcome to **Bigger Nightingale Manufacturing**, creators of the premier cloud and 100% offline recipe discovery app built specifically for budget-conscious culinary lovers.

This repository contains the complete, production-ready, 100% free-tier compatible MERN stack source code (React + Vite + Tailwind CSS + Node.js/Express + MongoDB Mongoose + Gemini AI Chatbot).

---

## 🎨 Brand Identity & Design System

- **Motto / Tagline**: *"Big ideas, beautiful design. I am using Antigravity by the way."*
- **Aesthetic Vibe**: Luxurious, elegant, minimalist, and kind.
- **Color Palette**:
  - **Primary Background**: Pure White (`#FFFFFF`)
  - **Secondary Surfaces**: Alabaster / Soft Cream (`#F9F9F9` / `#F5F3EF`)
  - **Typography & High Contrast**: Deep Charcoal (`#1F1F1F`)
  - **Accents & CTAs**: Champagne Gold (`#D4AF37`) & Soft Sage Green (`#9CAF88`)
- **Typography**:
  - **Headings**: `Playfair Display` (Serif)
  - **Body**: `Inter` (Sans-Serif)
- **Logo Concept**: Minimalist line-art Nightingale bird integrated with a culinary cloche/serving lid.

---

## 🛠️ Tech Stack & Key Libraries

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 + Custom Design Tokens
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **SEO Optimization**: React Helmet Async (Dynamic page titles, meta descriptions, OpenGraph tags)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Deployment Spec**: `vercel.json` for Vercel SPA routing rewrite rules

### Backend (`/backend`)
- **Runtime & Server**: Node.js + Express.js
- **Database**: MongoDB Atlas via Mongoose schemas (`Product`, `Post`, `Contact`)
- **AI Engine**: Google Generative AI SDK (`@google/generative-ai`) proxy endpoint (`/api/chat`) using Gemini AI
- **Environment & Security**: `dotenv`, `cors`
- **Deployment Spec**: `render.yaml` infrastructure-as-code for Render Web Service

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

Created by **Bigger Nightingale Manufacturing**.  
Built autonomously with Google Antigravity.
