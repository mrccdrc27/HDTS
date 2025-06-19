// filepath: /home/seth/Desktop/Ash's code/Group5Capstone1/src/utilities/ticket/apiInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  // Prefer admin token if present
  const token = localStorage.getItem('adminAuthToken') || localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
async function refreshAccessToken() {
  // Prefer admin refresh token if present
  const refreshToken = localStorage.getItem('adminRefreshToken') || localStorage.getItem('refreshToken');
  if (!refreshToken) return null;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    // Save to both for consistency
    localStorage.setItem('adminAuthToken', response.data.access);
    localStorage.setItem('authToken', response.data.access);
    return response.data.access;
  } catch (error) {
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('adminRefreshToken');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}

// Response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;