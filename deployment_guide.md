# Shree Bags - Deployment Guide

This guide will walk you through deploying your **Node.js/Express Backend** to **Render** and your **React/Vite Frontend** to **Vercel**. Both platforms have generous free tiers and integrate seamlessly with GitHub.

## Step 1: Push Your Code to GitHub

Before deploying, your code needs to live in a GitHub repository.

1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `shree-bags`).
2. Open your VS Code terminal at the root of your project (`d:\Proj\shree-bags`).
3. Run the following commands to initialize Git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for deployment"
   git branch -M main
   # Replace the URL below with your actual GitHub repo URL
   git remote add origin https://github.com/yourusername/shree-bags.git
   git push -u origin main
   ```

---

## Step 2: Deploy the Backend to Render

[Render](https://render.com/) is an excellent platform for hosting Node.js applications.

1. Create an account on [Render.com](https://render.com/) and connect your GitHub account.
2. Click **"New"** and select **"Web Service"**.
3. Select the `shree-bags` repository from your GitHub list.
4. **Configure the Web Service:**
   - **Name**: `shree-bags-api` (or whatever you prefer)
   - **Root Directory**: `backend` *(🔥 Crucial: Tells Render where the Node app lives)*
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Add Environment Variables:** Scroll down to the "Environment Variables" section and add all the keys from your [backend/.env.example](file:///d:/Proj/shree-bags/backend/.env.example) file:
   - `DATABASE_URL`: Your Neon PostgreSQL URL (Important: Add `?sslmode=require` to the end of the URL if Neon requires it).
   - `JWT_SECRET`: Your secret key.
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
   *Note: Do NOT add `PORT` (Render handles this automatically).*
6. Click **"Create Web Service"**.
7. Wait a few minutes for the build to finish. Once live, Render will give you a URL like `https://shree-bags-api.onrender.com`.
8. Test it by clicking the URL. You should see `{"message": "Product Catalog API is running..."}`. **Copy this URL for Step 3.**

---

## Step 3: Deploy the Frontend to Vercel

[Vercel](https://vercel.com/) is the absolute best place to host React/Vite applications.

1. Create an account on [Vercel.com](https://vercel.com/) and connect your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Import your `shree-bags` GitHub repository.
4. **Configure the Project:**
   - **Project Name**: `shree-bags`
   - **Framework Preset**: Vercel should automatically detect `Vite`. If not, select it.
   - **Root Directory**: Click "Edit" and select `frontend`. *(🔥 Crucial)*
5. **Add Environment Variables:** Open the "Environment Variables" dropdown and add:
   - `VITE_API_URL`: The URL you copied from Step 2 (e.g., `https://shree-bags-api.onrender.com`). *Ensure there is no trailing slash.*
   - `VITE_WHATSAPP_NUMBER`: Your WhatsApp phone number (e.g., `919876543210`).
6. Click **"Deploy"**.
7. Wait 1-2 minutes. Vercel will give you a live production URL (e.g., `https://shree-bags.vercel.app`).

---

## Step 4: Final Security Update (CORS)

Right now, your backend allows traffic from *anywhere* because we used a wildcard fallback. For maximum security, let's lock it down to only allow traffic from your new Vercel frontend.

1. Go back to your [Render Dashboard](https://dashboard.render.com/).
2. Open your `shree-bags-api` web service.
3. Go to the **Environment** tab.
4. Add a new Environment Variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://shree-bags.vercel.app`) *Make sure there is no trailing slash.*
5. Save changes. Render will automatically redeploy the backend with the new security rule.

🎉 **You are completely done! Your full-stack application is live on the internet!**
