import { Grid } from '@mui/material';
import React from 'react';
import SignupForm from './SignupForm';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtDecode from 'jwt-decode';
import Errors from '../ErrorPages/Errors';
import unauthorizedImage from '../../images/unauthorized.jpg';
import loginImage from '../../images/login.jpg';
const SignupPage = () => {
  // getting state from globalcontext
  const { state } = useGlobalContext();
  // protecting routes and check if the user is not logged in to show them error page, if try to reach pages without logging in and navigate them to login page
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
  // destructuring token from currentUser through state
  const {
    currentUser: { token },
  } = state;
  // decoding the token with jwtDecode
  const decodedToken = jwtDecode(token);
  // destructuring isAdmin from decodedToken
  const { isAdmin } = decodedToken;
  // protecting routes and chekc if the user is not admin to show them error page if user try to access any page which not has perission to
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
