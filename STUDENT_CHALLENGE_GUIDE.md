# 🎓 Challenge: Build Your Own PMS (Stage-by-Stage)

This is your personal training program. Your mission is to build a complete Project Management System from a blank folder.

---

## 🚩 Rules of the Challenge
- **Don't Copy-Paste**: Even if you look at the old code, **Type it manually.** This builds "Muscle Memory."
- **One Stage at a Time**: Don't move to Stage 2 until Stage 1 is perfectly working.
- **Ask for Hints**: If you get stuck, ask me "How do I do X?" and I will guide you without giving the full answer.

---

## 🏁 Stage 1: The Foundation
**Goal**: Get the "Shells" of your app running.

1. Create a root folder called `pms-practice`.
2. Initialize Git (`git init`).
3. Create two folders: `backend` and `frontend`.
4. **Backend**: Run `npm init -y` and install `express`, `cors`, `dotenv`, `nodemon`, and `typescript`.
5. **Frontend**: Run `npx create-next-app@latest ./` inside the frontend folder.
6. **Check**: Can you run the empty backend and see "Hello World" in the browser?

---

## 🏁 Stage 2: The Database Blueprint
**Goal**: Tell the computer how your data looks.

1. Set up a **NEW** project in Supabase (or use the same one but different table names).
2. Install Prisma in your backend.
3. Create a `schema.prisma` file.
4. **The Challenge**: Define three models:
   - `User`: (Email, Name, Password)
   - `Project`: (Name, Description, linked to a User)
   - `Task`: (Title, Status, Priority, linked to a Project, linked to an Assigner and Assignee)
5. Run `npx prisma db push`. 
6. **Check**: Can you see your empty tables in the Supabase Table Editor?

---

## 🏁 Stage 3: The Gatekeeper (Auth)
**Goal**: Secure your app.

1. Install `bcryptjs` and `jsonwebtoken`.
2. Create an `auth.controller.ts`.
3. **The Challenge**: 
   - Write a `register` function that hashes the password.
   - Write a `login` function that returns a JWT token.
4. Create a `middleware` called `auth.middleware.ts` that checks if a request has a valid token.
5. **Check**: Use Postman or a test script to register a user. Does the password look scrambled in the database?

---

## 🏁 Stage 4: The Brain (Controllers)
**Goal**: Manage Projects and Tasks.

1. Create `project.controller.ts` and `task.controller.ts`.
2. **The Challenge**: 
   - Write a function to Create a Project.
   - Write a function to List all Projects for the logged-in user.
   - Write a function to Create a Task (Make sure it links to the `projectId` and `assignerId`).
3. **Check**: Can you create a project using a token? Does it block you if the token is missing?

---

## 🏁 Stage 5: The Face (Frontend)
**Goal**: Make it look professional.

1. Install `axios`, `zustand`, and `@tanstack/react-query` in the frontend.
2. Setup the `api.ts` client with an interceptor (The "Automatic Stamp").
3. **The Challenge**: 
   - Build a **Login Page** that saves the token to Zustand.
   - Build a **Projects Page** that fetches data using `useQuery`.
   - Build a **Task Modal** that lets you pick a project and a priority.
4. **Check**: Can you log in, create a project, and see it appear on the screen without refreshing?

---

### 🚀 Final Boss Challenge: 
Implement a **"Delete"** button for tasks that only shows up for the person who created the task!

**When you are ready, create your new folder and let's begin Stage 1!**
