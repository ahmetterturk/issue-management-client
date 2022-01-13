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
import CircularProgress from '@mui/material/CircularProgress';

export const SignupFormView = ({ signupUser }) => {
  const classes = useStyles();
  // getting dispatch from global state
  const { dispatch } = useGlobalContext();
  // useState hook for isFetching to set to true for spinner to show
  const [isFetching, setIsFetching] = useState(false);
  // useState hook, to check if request return error
  const [hasError, setHasError] = useState(false);
  // useState hook for error object, to assign error object if there is any error on request
  const [errorObject, setErrorObject] = useState(null);
  // using useNavigate to redirect to different router after submit
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // onSubmit function is used in handleSubmit as an argument to get data from form and pass it as user make a request to create account
  const onSubmit = (data) => {
    // set hasError to false, if there was any error after submit, it will remove the error message
    setHasError(false);
    setErrorObject(null);
    setIsFetching(true);
    // calling singupUser from userApi services to make a post request for signup
    signupUser(data)
      .then((data) => {
        // check if promise return data with status 400, means the user is already exist in database
        if (data.status === 400) {
          // set hasErrro to true, to show the warning message
          setHasError(true);
          // pass data to the ErrorObject
          setErrorObject(data);
          // set isFetching will be false to not render spinner
          setIsFetching(false);
          // else if we have successfull request
        } else {
          //  isFetching will be false
          setIsFetching(false);
          // with dispatch will increase the counter to rerender the employee table and counter state will be used as a dependecy on allUsers request useEffect in App comp
          dispatch({ type: 'INCREASE_COUNTER' });
          // with dispatch set inCreated state to true to show success message after successful signup
          dispatch({ type: 'CREATE_SUCCESS' });
          setHasError(false);
          setErrorObject(null);
          // with navigate, redirect ot employee page
          navigate('/employee');
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      dispatch({ type: 'AFTER_CREATE' });
      setHasError(false);
      setIsFetching(false);
    }, 5000);
  };
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
        <form
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={classes.formBorder}
        >
          <Card className={classes.card}>
            <CardContent>
              {hasError && errorObject ? (
                <Alert severity='warning' p={3} sx={{ mb: 2 }}>
                  <AlertTitle>Warning</AlertTitle>
                  {errorObject.data.message}
                </Alert>
              ) : null}
              <Grid container spacing={3}>
                <FormInput
                  register={register}
                  label='First Name'
                  name='firstName'
                  type='text'
                  required={false}
                  xs={12}
                  md={6}
                  size={3}
                  errors={errors.firstName}
                  errorMessage="Firstname can't be blank, minimum of 3 characters"
                  className={classes.error}
                />
                <FormInput
                  register={register}
                  label='Last Name'
                  name='lastName'
                  type='text'
                  required={false}
                  xs={12}
                  md={6}
                  size={3}
                  errors={errors.lastName}
                  errorMessage="Lastname can't be blank, minimum of 3 characters"
                  className={classes.error}
                />
                <FormInput
                  register={register}
                  label='Email'
                  name='email'
                  type='email'
                  required={true}
                  xs={12}
                  md={12}
                  size={3}
                  icons={<EmailIcon sx={{ color: '#555' }} />}
                  errors={errors.email}
                  errorMessage="Please add your email, input can't be blank"
                  className={classes.error}
                />
                <FormInput
                  register={register}
                  label='Password'
                  name='password'
                  type='password'
                  required={true}
                  xs={12}
                  md={12}
                  size={6}
                  icons={<PasswordIcon sx={{ color: '#555' }} />}
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
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#1c79fc' }}
                      type='submit'
                    >
                      {isFetching ? (
                        <CircularProgress style={{ color: 'white' }} />
                      ) : (
                        'Create account'
                      )}
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

const SignupForm = (props) => (
  <SignupFormView signupUser={signupUser} {...props}></SignupFormView>
);
export default SignupForm;
