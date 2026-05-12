const testPMS = async () => {
  const credentials = {
    email: "[EMAIL_ADDRESS]",
    password: "[PASSWORD]",
  };

  try {
    console.log("--- PHASE 3: CORE MODULES TEST ---");

    // 1. LOGIN to get token
    const loginRes = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const { token } = await loginRes.json();
    console.log("1. Logged in! Token acquired. ✅");

    // 2. CREATE PROJECT
    const projectRes = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "My First SaaS Project",
        description: "Building a scalable project management system.",
      }),
    });
    const project = await projectRes.json();
    console.log("2. Project Created! ID:", project.id, "✅");

    // 3. CREATE TASK
    const taskRes = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Setup Authentication",
        description: "Implement JWT and Bcrypt",
        projectId: project.id,
      }),
    });
    const task = await taskRes.json();
    console.log("3. Task Created! Linked to Project ID:", task.projectId, "✅");

    // 4. FETCH PROJECTS
    const listRes = await fetch("http://localhost:5000/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const projects = await listRes.json();
    console.log("4. Fetched Projects! Total count:", projects.length, "✅");
  } catch (error) {
    console.error("Test failed:", error.message);
  }
};

testPMS();
