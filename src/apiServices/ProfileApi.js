import Api from './api';

// GET request to get all profiles
export const getProfiles = async () => {
  try {
    const response = await Api.get('/profiles');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// POST request to create a profile
export const createProfile = async (profileObject) => {
  try {
    const response = await Api.post('/profiles', profileObject);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET request to get single profile
export const getProfile = async (id) => {
  try {
    const response = await Api.get('/profiles/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// PUT request to update a profile
export const updateProfile = async (profileObject, id) => {
  try {
    const response = await Api.put('/profiles/' + id, profileObject);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// PUT request to update a profile
export const deleteProfile = async (id) => {
  try {
    const response = await Api.delete('/profiles/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
