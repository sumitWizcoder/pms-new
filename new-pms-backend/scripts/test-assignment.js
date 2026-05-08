const testAssignment = async () => {
  try {
    console.log('--- TESTING ASSIGNMENT & PRIORITY ---');

    // 1. Register User A (Assigner)
    const resA = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "userA@example.com", password: "password123", name: "User A (Boss)" }),
    });
    console.log('1. User A Registered');

    // 2. Register User B (Assignee)
    const resB = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "userB@example.com", password: "password123", name: "User B (Developer)" }),
    });
    const userBData = await resB.json();
    const userBId = userBData.userId;
    console.log('2. User B Registered (ID:', userBId, ')');

    // 3. Login as User A
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "userA@example.com", password: "password123" }),
    });
    const { token } = await loginRes.json();
    console.log('3. Logged in as User A');

    // 4. Create Project
    const projectRes = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name: "Critical Launch", description: "This must be done by Friday" }),
    });
    const project = await projectRes.json();
    console.log('4. Project Created');

    // 5. Create Task (Assigned to User B with URGENT priority)
    const taskRes = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        title: "Fix Production Bug",
        description: "The login button is broken",
        projectId: project.id,
        priority: "URGENT",
        assigneeId: userBId
      }),
    });
    const task = await taskRes.json();
    
    console.log('\n--- TASK ASSIGNMENT RESULT ---');
    console.log('Task Title:', task.title);
    console.log('Priority:', task.priority);
    console.log('Created By (Assigner):', task.assigner.name);
    console.log('Assigned To (Assignee):', task.assignee.name);
    console.log('Status:', task.status);

  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

testAssignment();
