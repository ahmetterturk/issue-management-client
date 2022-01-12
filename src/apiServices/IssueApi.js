import API from './api';



// Fetch All Issues
export const getIssues = async () => {
  try {
    const response = await API.get('/issues');
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Create An Issue
export const createIssue = async (issueData) => {
  try {
    const response = await API.post('/issues', issueData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Fetch Single Issue
export const getIssue = async (id) => {
  try {
    const response = await API.get('/issues/' + id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Update Issue
export const updateIssue = async (id, updatedIssueData) => {
  try {
    const response = await API.patch('/issues/' + id, updatedIssueData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Delete Issue
export const deleteIssue = async (id) => {
  try {
    const response = await API.delete('/issues/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
