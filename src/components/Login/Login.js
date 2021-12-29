import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from '../../apiServices/UserApi';
import { useGlobalContext } from '../../contextReducer/Context';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6887E3',
    },
    secondary: {
      main: '#6887E3',
    },
  },
});

const Login = () => {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    loginUser(data)
      .then((data) => {
        if (data.status == '400') {
          setHasError(true);
          setErrorObject(data);
        } else if (data.status == '404') {
          setHasError(true);
          setErrorObject(data);
        } else {
          setHasError(false);
          setErrorObject(null);
          dispatch({ type: 'LOGIN_INFO', data: data });
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/issues');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography
        component='h1'
        variant='h4'
        color='#6887E3'
        textAlign={'center'}
        padding={4}
      >
        Lock Security
      </Typography>
      {/* <Bar /> */}
      <Container
        component='main'
        maxWidth='xs'
        Box
        sx={{
          border: 0.5,
          borderRadius: 3,
          borderColor: '6887E3',
          bgcolor: '#E8E8E8',
        }}
      >
        <CssBaseline />

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {hasError && errorObject ? (
            <p style={{ color: 'red' }}>{errorObject.data.message}</p>
          ) : null}
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              background='white'
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
              required
              fullWidth
              {...register('password', { required: true })}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {errors.password && (
              <Typography variant='span' style={{ color: 'red' }}>
                Password is required with min of 6 characters
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />

            <Button
              type='submit'
              // fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 3 }} />
        <Link href='#' variant='body2' textAlign={'center'}>
          Forgot password?
        </Link>
      </Container>
    </ThemeProvider>
  );
};

function Copyright(props) {
  return (
    <>
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {' © Lock Security '}
      </Typography>
    </>
  );
}

export default Login;
