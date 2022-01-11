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
        <Link color='inherit' href='https://mui.com/'>
          Lock Security
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Grid>
  );
}

export const LoginFormView = (props) => {
  const { loginUser } = props;
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();

  const onSubmit = async (data) => {
    setIsFetching(true);
    loginUser(data)
      .then((data) => {
        if (data.status === 400) {
          setIsFetching(true);
          setHasError(true);
          setErrorObject(data);
          setIsFetching(false);
        } else if (data.status === 404) {
          setIsFetching(true);
          setHasError(true);
          setErrorObject(data);
          setIsFetching(false);
        } else {
          setIsFetching(true);
          setHasError(false);
          setErrorObject(null);
          dispatch({ type: 'LOGIN_INFO', data: data });
          dispatch({ type: 'LOGIN_SUCCESS' });
          localStorage.setItem('user', JSON.stringify(data));
          setIsFetching(false);
          const decodeToken = jwtDecode(data.token);
          if (data.userDetails.image === null) {
            navigate(`/userProfile/${decodeToken.id}`);
          } else if (decodeToken.isAdmin) {
            navigate('/dashboard');
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
    // <ThemeProvider theme={theme}>
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
    // </ThemeProvider>
  );
};

const LoginForm = (props) => (
  <LoginFormView loginUser={loginUser} {...props}></LoginFormView>
);
export default LoginForm;
