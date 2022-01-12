import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useStyles } from './Style';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { loginUser } from '../../apiServices/UserApi';
import { useGlobalContext } from '../../contextReducer/Context';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import jwtDecode from 'jwt-decode';

// Copyright component to add as footer in login form
function Copyright(props) {
  return (
    <Grid item>
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {'Copyright © '}
        Lock Security {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Grid>
  );
}

export const LoginFormView = (props) => {
  // login user props for the tests
  const { loginuser } = props;
  // dispatch from global context
  const { dispatch } = useGlobalContext();
  // usign useNavigate to navigate in different route after submitt
  const navigate = useNavigate();
  // useState hook for errors
  const [hasError, setHasError] = useState(false);
  // useState hook for error object, to assign error object if there is any error on request
  const [errorObject, setErrorObject] = useState(null);
  // useState set state on fetching, if its true show the spinner on button
  const [isFetching, setIsFetching] = useState(false);
  // using register, handleSubmit and formState errors form react hook form to handle all th changes and on inputs and errors if there is any
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // using useStyles which comming from makeStyle on materail ui
  const classes = useStyles();

  // onSubmit function will make a request to login when user submit the login form
  const onSubmit = async (data) => {
    // setIsFetchign to true, to show the spinner on the button while make a request on login user
    setIsFetching(true);
    // calling login user from userApi service, it return promise and we can user the retrun data
    loginUser(data)
      .then((data) => {
        // check if the request status code is 400, setting the has error state to true, and set the current data from server to the error object and show the invalid credential error to user
        if (data.status === 400) {
          setIsFetching(true);
          setHasError(true);
          setErrorObject(data);
          setIsFetching(false);
          // check if the request status code is 404, setting the has error state to true, and set the current data from server to the error object to show not found user error
        } else if (data.status === 404) {
          setIsFetching(true);
          setHasError(true);
          setErrorObject(data);
          setIsFetching(false);
        } else {
          // if none of the above, means the request is succefull, setHasError will be false, setErrorObject to null
          setIsFetching(true);
          setHasError(false);
          setErrorObject(null);
          // using despatch from global state to assign the data to the CurrentUser state
          dispatch({ type: 'LOGIN_INFO', data: data });
          // using despatch from global state to set the isLoggedIn to true
          dispatch({ type: 'LOGIN_SUCCESS' });
          // set the data from request in the localStorage
          localStorage.setItem('user', JSON.stringify(data));
          // setIsFetching to false
          setIsFetching(false);
          // decoding the current token wiht jwtDecode
          const decodeToken = jwtDecode(data.token);
          // check to see if the current user image is null or firstName or lastName is empty string, means user does not have a profile and it redirects to the update profile
          if (
            data.userDetails.image === null ||
            data.userDetails.firstName === '' ||
            data.userDetails.lastName === ''
          ) {
            // using decodedToken id to navigate the user to the update profile page
            navigate(`/userProfile/${decodeToken.id}`);
            // if currentUser is admin, it redirect user to the dashboard
          } else if (decodeToken.isAdmin) {
            navigate('/dashboard');
            // if currentUser is normal user with profile, redirect to issues page
          } else {
            navigate('/issues');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={classes.bg}>
      <Container component='main' maxWidth='xs' className={classes.container}>
        <Box className={classes.cardBox}>
          <Avatar sx={{ m: 1, bgcolor: '#1c79fc' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          {hasError && errorObject ? (
            <Alert severity='error'>{errorObject.data.message}</Alert>
          ) : null}
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              {...register('email', { required: true })}
              autoFocus
            />
            {errors.email && (
              <Typography variant='span' style={{ color: 'red' }}>
                Email cannot be blank!
              </Typography>
            )}
            <TextField
              margin='normal'
              fullWidth
              {...register('password', { required: true })}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {errors.password && (
              <Typography variant='span' style={{ color: 'red' }}>
                Password cannot be blank!
              </Typography>
            )}
            <br></br>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
};

const LoginForm = (props) => (
  <LoginFormView loginuser={loginUser} {...props}></LoginFormView>
);
export default LoginForm;
