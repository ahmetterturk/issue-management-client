import axios from 'axios';

const API = axios.create({
  baseURL: 'https://issue-management-backend.herokuapp.com',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }

  return req;
});

export default API;
