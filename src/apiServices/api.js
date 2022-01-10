import axios from 'axios';

const API = axios.create({
  baseURL: 'https://issue-management-backend.herokuapp.com',
});

export const apiRequestInterceptor = (req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }

  return req;
};

API.interceptors.request.use(apiRequestInterceptor);

export default API;
