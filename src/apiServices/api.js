import axios from 'axios';

// Creating a bse url to use on all the request
const API = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: 'https://issue-management-backend.herokuapp.com',
});

// assingning to request headers authorization the bearer and getting the token from local storage after user logged in to use as an interceptor to give user permission to prform CRUD on any request
export const apiRequestInterceptor = (req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }

  return req;
};
// usign interceptors on each request to assing the bearer token
API.interceptors.request.use(apiRequestInterceptor);

export default API;
