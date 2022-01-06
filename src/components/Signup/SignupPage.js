import { Grid } from '@mui/material';
import React from 'react';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtDecode from 'jwt-decode';
const SignupPage = () => {
  const { state } = useGlobalContext();
  if (!state.currentUser) {
    return (
      <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
        You need to login first
        <Link to='/login'>Log In</Link>
      </h1>
    );
  }
  const {
    currentUser: { token },
  } = state;
  const decodedJWT = jwtDecode(token);
  const { isAdmin } = decodedJWT;

  if (!isAdmin) {
    return (
      <>
        <h1 style={{ marginTop: '100px' }}>
          You are not authorized to visit this page
        </h1>
        <Link
          to='/issues'
          style={{
            display: 'inline-block',
            color: '#3489eb',
            marginLeft: '5px',
          }}
        >
          Back to Main page
        </Link>
      </>
    );
  }
  return (
    <Grid item sx={{ margin: '100px auto 0' }}>
      <SignupForm />
    </Grid>
  );
};

export default SignupPage;
