// import Api from './api';
import axios from 'axios';
const url = 'http://localhost:5000';

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
