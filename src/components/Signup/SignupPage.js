import { Grid } from '@mui/material';
import React from 'react';
import SignupForm from './SignupForm';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtDecode from 'jwt-decode';
import Errors from '../ErrorPages/Errors';
import unauthorizedImage from '../../images/unauthorized.jpg';
import loginImage from '../../images/login.jpg';
const SignupPage = () => {
  const { state } = useGlobalContext();
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
  const {
    currentUser: { token },
  } = state;
  const decodedJWT = jwtDecode(token);
  const { isAdmin } = decodedJWT;

  if (!isAdmin) {
    return (
      <Errors
        status='401'
        title='You are not authorized to access this page'
        errorMessage='You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation'
        route='/issues'
        imageSrc={unauthorizedImage}
        btnMessage='Back to login page'
      />
    );
  }
  return (
    <Grid item sx={{ margin: '100px auto 0' }}>
      <SignupForm />
    </Grid>
  );
};

export default SignupPage;
