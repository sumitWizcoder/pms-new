import axios from 'axios';

// 1. Create a "Base" configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // This is where our Backend lives
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. The "Interceptor" (The Automatic Stamp)
api.interceptors.request.use((config) => {
  // Check if we have a token in the browser's storage
  const token = localStorage.getItem('pms_token');
  
  if (token) {
    // If we have it, add it to the "Authorization" header
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
