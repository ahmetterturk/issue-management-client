import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import IssuesTable from './IssuesTable/IssuesTable';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Issues = () => {
  const { state } = useGlobalContext();
  const issuesList = state.issues;

  return (
    <>
      {state.isLoggedIn && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">You have logged in successfully</Alert>
        </Stack>
      )}
      <IssueForm />
      <IssuesTable issuesList={issuesList} />
    </>
  );
};

export default Issues;
