const registerUser = async () => {
  const userData = {
    email: "[EMAIL_ADDRESS]",
    password: "[PASSWORD]",
    name: "Sumit",
  };

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("--- REGISTRATION TEST ---");
    console.log("Status:", response.status);
    console.log("Response:", data);
  } catch (error) {
    console.error("Test failed:", error.message);
  }
};

registerUser();
