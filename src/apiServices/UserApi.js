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

// get all users

export const allUsers = async () => {
  try {
    const res = await API.get('/user');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// get single user
export const singleUser = async (id) => {
  try {
    const res = await API.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// update user

export const updateUser = async (userObject, id) => {
  try {
    const res = await API.patch(`/user/${id}`, userObject);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// image upload
export const uploadProfileImage = async ({ image }) => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await API.post('/user/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
