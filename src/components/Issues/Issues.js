import React, { useEffect } from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssuesTable from './IssuesTable/IssuesTable';
import { Grid, Typography } from '@mui/material';
import loginImage from '../../images/login.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import IssueForm from './IssueForm/IssueForm';
import Errors from '../ErrorPages/Errors';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import API from '../../apiServices/api';
import useStyles from './styles';


export const IssuesView = ({ API }) => {
  const { state, dispatch } = useGlobalContext();
  // defining a classes constant to use with styling of components
  const classes = useStyles();
  // destructuring the search property to get the query string from it
  const { search } = useLocation();
  const navigate = useNavigate();
  const {
    currentUser: { token },
  } = state;
  const decodedToken = jwtDecode(token);

  // Fetching all issues again with useLocation search, if the query string
  // exists, issues will get reassigned to the global state with only the query
  // search parameter, otherwise it always fetch all existing issues.
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

  // If there is no current user existing in local storage, the application will display an error page
  if (!state.currentUser) {
    return (
      <Errors
        title='You need to login first'
        errorMessage='You cannot access the application unless you login first'
        route='/login'
        imageSrc={loginImage}
        btnMessage='Back to login page'
      />
    );
  }

  // we are creating a constant and assigning it the value of the global state issues value, to pass on to child components
  const issuesList = state.issues;

  return (
    <Grid container className={classes.issuesGrid}>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>You have logged in successfully</Alert>
        </Stack>
      )}
      {state.isUpdated && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>
            You have updated your profile successfully
          </Alert>
        </Stack>
      )}
      <Typography variant='h3' sx={{ color: '#1c79fc', ml: 2 }}>
        Issues
      </Typography>

      <IssueForm />

      <IssuesTable issuesList={issuesList} />
    </Grid>
  );
};

const Issues = (props) => <IssuesView API={API} {...props}></IssuesView>;
export default Issues;
