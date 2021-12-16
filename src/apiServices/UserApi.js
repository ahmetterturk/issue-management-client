import axios from 'axios';
const url = 'https://issue-management-backend.herokuapp.com';
// login request
export const loginUser = async (userObject) => {
  try {
    const res = await axios.post(url + '/users/signin', userObject);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
