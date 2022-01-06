import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import IssuesTable from './IssuesTable/IssuesTable';
import useStyles from './styles';

const Issues = () => {
  const { state } = useGlobalContext();
  const issuesList = state.issues;
  const classes = useStyles();

  return (
    <Grid className={classes.issuesGrid}>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">You have logged in successfully</Alert>
        </Stack>
      )}
      <IssueForm />
      <IssuesTable issuesList={issuesList} />
    </Grid>
  );
};

export default Issues;
