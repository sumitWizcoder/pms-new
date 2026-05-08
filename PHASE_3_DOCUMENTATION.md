# 🏗️ PMS Project: Phase 3 Documentation

This document summarizes the Core Module work completed for the Project Management System.

---

## 🏛️ 1. The Goal
We moved beyond "Security" and built the actual "Value" of the app: managing data. We implemented **Projects** and **Tasks** with full ownership rules.

---

## 🛠️ 2. Key Components Added

### A. The Project Controller
This handles the lifecycle of a Project.
- **Security**: It uses `req.userId` from our token to make sure projects belong to the right person.
- **Logic**: It sorts projects by `createdAt` so you always see your newest work first.

### B. The Task Controller
This handles the "pieces" inside a project.
- **Relational Check**: Before adding a task, it checks if you actually own the project you are adding it to! This prevents people from adding tasks to other users' projects.

### C. Nested Routes
We organized our URLs so they make sense:
- `/api/projects`: For project work.
- `/api/tasks`: For task work.

---

## 🔐 3. Understanding Ownership
This is the most important concept in Phase 3. 

When you send a request:
1. **The Guard (Middleware)**: Checks your ID badge (Token).
2. **The Worker (Controller)**: Takes the ID badge and tells the database: "Find the data where the `userId` matches this badge."

This is how we ensure that your data is private.

---

## 🧪 4. Testing the Full Cycle
We created a "Master Test Script" called `test-pms.js`. 

**To run the full test**:
```bash
node scripts/test-pms.js
```
**What it does**: It performs a login, creates a project, adds a task, and verifies the results in one go.

---

## 📁 5. Updated Structure
```text
new-pms-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts  # NEW!
│   │   └── task.controller.ts     # NEW!
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts     # NEW!
│   │   └── task.routes.ts        # NEW!
└── scripts/
    └── test-pms.js               # NEW! Master Test
```
