# 🎨 PMS Project: Phase 4 Documentation

This document summarizes the Frontend Integration work completed for the Project Management System.

---

## 🏛️ 1. The Architecture
We built a **Modern Single Page Application (SPA)** experience using Next.js.

### The "Big Three" Tools:
1. **Axios**: Our "Telephone." It handles all calls to the backend.
2. **Zustand**: Our "Global Memory." It remembers who is logged in.
3. **TanStack Query**: Our "Data Manager." It handles loading states and caching.

---

## 🛠️ 2. Key Components Added

### A. The API Interceptor (`src/lib/api.ts`)
We implemented an **Automatic Stamp**. 
- Every time the frontend sends a request, this script automatically attaches your JWT Token. 
- **Benefit**: You don't have to manually handle security for every single button or page.

### B. The Auth Store (`src/store/useAuthStore.ts`)
We used **Persistence**.
- When you log in, your info is saved to the browser's `localStorage`.
- **Benefit**: If you refresh the page or close the tab, you stay logged in!

### C. The Dashboard Shell (`src/app/dashboard/layout.tsx`)
We built a **Persistent Layout**.
- The Sidebar and Header are defined once and stay there while you navigate.
- **Security**: The layout checks if you are logged in. If not, it kicks you back to the login page immediately.

---

## 🎨 3. UI & Styling
We used **Tailwind CSS** for a "Premium" look.
- **Responsive**: The dashboard works on both mobile and desktop.
- **Interactive**: Buttons have hover effects and loading states.

---

## 📁 4. Updated Structure
```text
new-pms-frontend/
├── src/
│   ├── app/
│   │   ├── login/page.tsx      # Login UI & Logic
│   │   ├── register/page.tsx   # Register UI & Logic
│   │   ├── dashboard/          # Private Area
│   │   │   ├── layout.tsx      # Sidebar & Header
│   │   │   └── page.tsx        # Overview
│   │   └── page.tsx            # Landing Page
│   ├── lib/api.ts              # API Client (Axios)
│   ├── store/useAuthStore.ts   # Global Memory (Zustand)
│   └── components/Providers.tsx # Data Manager Setup
```
