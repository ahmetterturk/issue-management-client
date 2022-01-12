import API from './api';
// const url = 'https://issue-management-backend.herokuapp.com';

// making a post request to create a user
export const signupUser = async (userObject) => {
  try {
    const res = await API.post('/user/signup', userObject);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// making a post request to login the user
export const loginUser = async (userObject) => {
  try {
    const res = await API.post('/user/signin', userObject);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// making a get request to get all users from server
export const allUsers = async () => {
  try {
    const res = await API.get('/user');
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// making get request to get a single user from server
export const singleUser = async (id) => {
  try {
    const res = await API.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
// update user

export const updateUser = async (userObject, id) => {
  try {
    const res = await API.patch(`/user/${id}`, userObject);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// making a delete requset to delete the user with the current id
export const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// making a post request to upload image, and return image url to use as a src on img tag
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
