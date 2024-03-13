import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1';  // Replace with your actual API base URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
