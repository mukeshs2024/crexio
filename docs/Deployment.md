# Deployment Guide

This repository contains both a Node/Express WebSocket server and a Next.js App Router frontend. 
For production, it is recommended to split them into two separate deployment targets.

## Backend (Node.js + Socket.io)
Target: **Render**, **Railway**, or **AWS EC2** (requires WebSocket support).
1. Set the root directory to `backend/`.
2. Environment Variables:
   - `PORT`: (e.g., 3001)
3. Build & Run:
   ```bash
   npm install
   npm run build
   npm start
   ```

## Frontend (Next.js)
Target: **Vercel** or **Netlify**.
1. Set the root directory to `frontend/`.
2. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Points to your deployed backend (e.g., `https://my-backend.onrender.com`).
3. Build & Run:
   ```bash
   npm install
   npm run build
   npm start
   ```
