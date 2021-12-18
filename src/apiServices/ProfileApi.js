// import Api from './api';
import axios from 'axios';
const url = 'https://issue-management-backend.herokuapp.com';
const urlNew = 'http://localhost:5000';

// make a post request to upload an image
// the url for the upload image has to be changed
export const uploadProfileImage = async ({ image }) => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post(
      urlNew + '/users/profiles/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET request to get all profiles
export const getProfiles = async () => {
  try {
    const response = await axios.get(url + '/users/profiles');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// POST request to create a profile
export const createProfile = async (profileObject) => {
  try {
    const response = await axios.post(url + '/users/profiles', profileObject);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET request to get single profile
export const getProfile = async (id) => {
  try {
    const response = await axios.get(url + '/users/profiles/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// PUT request to update a profile
export const updateProfile = async (profileObject, id) => {
  try {
    const response = await axios.put(
      url + '/users/profiles/' + id,
      profileObject
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// PUT request to update a profile
export const deleteProfile = async (id) => {
  try {
    const response = await axios.delete(url + '/users/profiles/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
