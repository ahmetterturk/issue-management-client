import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

import { Link } from 'react-router-dom';

import IssuesTable from './IssuesTable/IssuesTable';
import useStyles from './styles';

const Issues = () => {
  const { state } = useGlobalContext();
  const classes = useStyles();
  if (!state.currentUser) {
    return (
      <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
        You need to login first
        <Link to='/login'>Log In</Link>
      </h1>
    );
  }
  const issuesList = state.issues;

  return (
    <Grid className={classes.issuesGrid}>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>You have logged in successfully</Alert>
        </Stack>
      )}
      <IssueForm />
      <IssuesTable issuesList={issuesList} />
    </Grid>
  );
};

export default Issues;
