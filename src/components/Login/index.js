import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from '../../apiServices/UserApi';
import { useGlobalContext } from '../../contextReducer/Context';
import { useNavigate } from 'react-router';

// const Bar = () => {
//   return (
//     <>
//       <AppBar position="relative">
//         <Toolbar>
//           <LockRoundedIcon />
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

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

export default function SignIn() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  // handle form after submit
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(userInput)
      .then((data) => {
        dispatch({ type: 'LOGIN_INFO', data: data });
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => console.log(error));
    setUserInput({ email: '', password: '' });
    navigate('/profile')
  };

  // handle input changes
  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Bar /> */}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Lock Security
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={handleChange}
              value={userInput.email}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={handleChange}
              value={userInput.password}
              autoComplete='current-password'
            />
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
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
