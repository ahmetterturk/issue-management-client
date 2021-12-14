import axios from 'axios';

const url = 'http://localhost:5000';

// fetching all Issues
export const getIssues = async () => {
  try {
    const res = await axios.get(url + '/issues');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIssue = async (id) => {
  try {
    const res = await axios.get(url + '/issues/' + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
