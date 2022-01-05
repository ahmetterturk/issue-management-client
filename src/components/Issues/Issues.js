import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import IssuesTable from './IssuesTable/IssuesTable';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

const Issues = () => {
  const { state } = useGlobalContext();
  const issuesList = state.issues;

  return (
    <Grid item sx={{ margin: '100px auto 0' }}>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>You have logged in successfully</Alert>
        </Stack>
      )}
      <IssueForm />
      <Grid item xs={10} sx={{ margin: '10px auto 0' }}>
        <IssuesTable issuesList={issuesList} />
      </Grid>
    </Grid>
  );
};

export default Issues;
