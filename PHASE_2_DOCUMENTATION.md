# 🔐 PMS Project: Phase 2 Documentation

This document summarizes the Security and Authentication work completed for the Project Management System.

---

## 🏛️ 1. The Big Goal
The goal of this phase was to build a "Security Gate" for our app. We need to know who a user is before we let them create projects or tasks.

---

## 🛠️ 2. Steps Taken & Commands Used

### Step A: Security Tools Setup
We installed the tools needed to scramble passwords and create ID cards.

| Command | What it does | Why we did it? |
| :--- | :--- | :--- |
| `npm install bcryptjs` | Installs the "Scrambler." | To hash passwords so they are unreadable. |
| `npm install jsonwebtoken` | Installs the "ID Factory." | To create Digital Tokens for logged-in users. |

### Step B: Database Connection (Supabase)
We connected our backend to a real database in the cloud.

| Action | Why we did it? |
| :--- | :--- |
| Updated `.env` | To tell our app the address of our Supabase database. |
| `npx prisma db push` | To build our tables (User, Project, Task) in Supabase. |

### Step C: The "Prisma Version" Fix 💡
We hit a hurdle where Prisma 7 was too complex for a beginner setup.
- **Action**: We downgraded to **Prisma 6** using `npm install prisma@6`.
- **Lesson**: Newer isn't always better for every situation. Stability and documentation are more important for learning.

---

## 🔐 3. How Authentication Works (Internally)

### The Registration Flow:
1. **Request**: User sends Email/Password.
2. **Scramble**: We use **Bcrypt** to "Hash" the password. (e.g., `123` becomes `$2a$10$X...`).
3. **Save**: We save the Email and the Scrambled Password to Supabase.

### The Login Flow:
1. **Request**: User sends Email/Password.
2. **Compare**: We find the user and check if the scrambled password matches.
3. **Issue Token**: If it matches, we create a **JWT Token** (Digital ID Card).
4. **Response**: We send the Token back to the user's browser.

---

## 🛡️ 4. The "Security Guard" (Middleware)
We created a file called `auth.middleware.ts`. Its job is to:
- Intercept any request to a private area.
- Check if the user is carrying a valid **JWT Token**.
- If valid: Let them in.
- If invalid: Send a "401 Unauthorized" message.

---

## 🧪 5. Testing Instructions
We created two custom scripts in the `scripts/` folder so you don't need external tools like Postman to test.

| To Test... | Run this command |
| :--- | :--- |
| **Registration** | `node scripts/test-register.js` |
| **Login** | `node scripts/test-login.js` |

---

## 📁 6. Updated Structure
```text
new-pms-backend/
├── src/
│   ├── controllers/auth.controller.ts  # The Logic (Register/Login)
│   ├── routes/auth.routes.ts           # The Paths (/api/auth)
│   ├── middleware/auth.middleware.ts   # The Security Guard
│   └── lib/prisma.ts                   # The Database Connection
├── scripts/
│   ├── test-register.js                # Testing tool
│   └── test-login.js                   # Testing tool
└── .env                                # Your Secrets (Don't share!)
```
