import React, { useState } from 'react';
import { useStyles } from './styles';
import FormInput from '../UserProfile/FormInput';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  FormControlLabel,
  Alert,
  AlertTitle,
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import { signupUser } from '../../apiServices/UserApi';
import { useGlobalContext } from '../../contextReducer/Context';

const label = { inputProps: { 'aria-label': 'Admin' } };
const SignupForm = () => {
  const classes = useStyles();
  const { dispatch } = useGlobalContext();
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setHasError(false);
    setErrorObject(null);
    setIsFetching(true);
    signupUser(data)
      .then((data) => {
        if (data.status === 400) {
          setHasError(true);
          setErrorObject(data);
        } else {
          setIsFetching(false);
          dispatch({ type: 'INCREASE_COUNTER' });
          dispatch({ type: 'CREATE_SUCCESS' });
          setHasError(false);
          setErrorObject(null);
          navigate('/employee');
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      dispatch({ type: 'AFTER_CREATE' });
      isFetching(false);
    }, 5000);
  };
  console.log(errorObject);
  return (
    <>
      <Box sx={{ m: 5 }}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          className={classes.heading}
        >
          Create Employee Account
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.card}>
            <CardContent>
              {hasError && errorObject ? (
                <Alert severity='warning' p={4}>
                  <AlertTitle>Warning</AlertTitle>
                  {errorObject.data.message}
                </Alert>
              ) : null}
              <Grid container spacing={3}>
                <FormInput
                  register={register}
                  label='Email'
                  name='email'
                  type='email'
                  xs={12}
                  md={12}
                  size={3}
                  icons={<EmailIcon />}
                  className={classes.icon}
                  errors={errors.email}
                  errorMessage="Please add your email, input can't be blank"
                  className={classes.error}
                />
                <FormInput
                  register={register}
                  label='Password'
                  name='password'
                  type='password'
                  xs={12}
                  md={12}
                  size={6}
                  icons={<PasswordIcon />}
                  className={classes.icon}
                  errors={errors.password}
                  errorMessage="Password can't be blank, minimum of 6 chracters."
                  className={classes.error}
                />
                <Grid item xs={12} md={12}>
                  <FormControlLabel
                    control={<Checkbox {...register('isAdmin')} />}
                    label='Admin'
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                      type='submit'
                    >
                      {isFetching ? 'Wait...' : 'Create account'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </form>
      </Box>
    </>
  );
};

export default SignupForm;
