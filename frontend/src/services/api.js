import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Log error for debugging
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    const message =
      error.response?.data?.message || 
      error.message || 
      'A server error occurred. Please try again later.';
    
    // Add status code to error object for UI handling
    const enhancedError = new Error(message);
    enhancedError.status = error.response?.status;
    enhancedError.data = error.response?.data;
    
    return Promise.reject(enhancedError);
  }
);

export default api;
