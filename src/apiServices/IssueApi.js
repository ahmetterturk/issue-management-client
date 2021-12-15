import axios from 'axios';

const url = 'http://localhost:5000';

// fetching all Issues
export const getIssues = async () => {
  try {
    const response = await axios.get(url + '/issues');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// create an issue
export const createIssue = async (issueData) => {
  try {
    const response = await axios.post(url + '/issues', issueData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// fetch single issue
export const getIssue = async (id) => {
  try {
    const response = await axios.get(url + '/issues/' + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
