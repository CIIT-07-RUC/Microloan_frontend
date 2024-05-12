import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5205/api',
});

api.interceptors.request.use(async request => {
  const token = sessionStorage.getItem('token');

  if (token) {
    request.headers['Authorization'] = 'Bearer ' + token;
  }

  return request;
})

export default api;