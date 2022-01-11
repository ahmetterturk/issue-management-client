import React, { useEffect } from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Grid, Typography } from '@mui/material';
import IssuesTable from './IssuesTable/IssuesTable';
import useStyles from './styles';
import Errors from '../ErrorPages/Errors';
import loginImage from '../../images/login.jpg';
import { useLocation } from 'react-router-dom';
import API from '../../apiServices/api';
const Issues = () => {
  const { state, dispatch } = useGlobalContext();
  // destructure the serach property to get the query string from it
  const { search } = useLocation();

  // Fetching all issues again with useLocation search, if the query string exist issues will get reassing to the global state with only qery search otherwise it always fetch all existing issues
  useEffect(() => {
    const fetchIssues = async () => {
      dispatch({ type: 'SET_ISSUESISLOADING', data: true });

      try {
        const response = await API.get('/issues' + search);
        dispatch({ type: 'GET_ISSUES', data: response.data });
        dispatch({ type: 'SET_ISSUESISLOADING', data: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssues();
  }, [search, dispatch]);

  const classes = useStyles();
  if (!state.currentUser) {
    return (
      <Errors
        title="You need to login first"
        errorMessage="You cannot access the application unless you login first"
        route="/login"
        imageSrc={loginImage}
        btnMessage="Back to login page"
      />
    );
  }
  const issuesList = state.issues;

  return (
    <Grid className={classes.issuesGrid}>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">You have logged in successfully</Alert>
        </Stack>
      )}
      <Typography variant="h1">Issues</Typography>

      <IssueForm />

      <IssuesTable issuesList={issuesList} />
    </Grid>
  );
};

export default Issues;
