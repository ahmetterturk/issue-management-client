import { Grid } from '@mui/material';
import React from 'react';
import SignupForm from './SignupForm';
const SignupPage = () => {
  return (
    <Grid item sx={{ margin: '100px auto 0' }}>
      <SignupForm />
    </Grid>
  );
};

export default SignupPage;
