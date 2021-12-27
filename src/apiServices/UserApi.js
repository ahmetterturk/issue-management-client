import API from './api';
// const url = 'https://issue-management-backend.herokuapp.com';

// login request
export const loginUser = async (userObject) => {
  try {
    const res = await API.post('/user/signin', userObject);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
