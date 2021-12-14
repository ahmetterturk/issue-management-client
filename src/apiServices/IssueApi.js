import axios from 'axios';

const url = 'http://localhost:5000';

// fetching all Issues
export const getIssues = async () => {
  const res = await axios.get(url + '/issues');
  return res.data;
};
