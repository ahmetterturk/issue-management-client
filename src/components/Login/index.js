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
import { bgcolor } from '@mui/system';

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

    navigate('/profile');
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
              background='white'
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
}
