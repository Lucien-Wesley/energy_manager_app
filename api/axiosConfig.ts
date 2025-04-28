import { getAuthToken } from '@/utils/auth';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.60.1:5000/'; // Remplace par ton URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout après 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteurs de requête
api.interceptors.request.use(
  async (config) => {
    return getAuthToken().then((token) => {
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

