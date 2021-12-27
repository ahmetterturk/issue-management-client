import API from './api';

// const url = 'https://issue-management-backend.herokuapp.com';

// fetching all Issues
export const getIssues = async () => {
  try {
    const response = await API.get('/issues');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// create an issue
export const createIssue = async (issueData) => {
  try {
    const response = await API.post('/issues', issueData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// fetch single issue
export const getIssue = async (id) => {
  try {
    const response = await API.get('/issues/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
