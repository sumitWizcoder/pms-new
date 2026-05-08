const loginUser = async () => {
  const loginData = {
    email: "mentor@example.com",
    password: "securePassword123"
  };

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log('--- LOGIN TEST ---');
    console.log('Status:', response.status);
    console.log('Token Received:', data.token ? 'YES ✅' : 'NO ❌');
    console.log('User Name:', data.user?.name);
    
    if (data.token) {
        console.log('\n--- TOKEN PREVIEW ---');
        console.log(data.token.substring(0, 20) + '...');
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

loginUser();
