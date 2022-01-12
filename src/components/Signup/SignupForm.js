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
      setIsFetching(false);
    }, 5000);
  };
  console.log(errorObject);
  return (
    <>
      <Box sx={{ m: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.heading}
        >
          Create Employee Account
        </Typography>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={classes.formBorder}
        >
          <Card className={classes.card}>
            <CardContent>
              {hasError && errorObject ? (
                <Alert severity="warning" p={4}>
                  <AlertTitle>Warning</AlertTitle>
                  {errorObject.data.message}
                </Alert>
              ) : null}
              <Grid container spacing={3}>
                <FormInput
                  register={register}
                  label="First Name"
                  name="firstName"
                  type="text"
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
                  label="Last Name"
                  name="lastName"
                  type="text"
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
                  label="Email"
                  name="email"
                  type="email"
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
                  label="Password"
                  name="password"
                  type="password"
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
                    label="Admin"
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
                      variant="contained"
                      style={{ marginLeft: '5px', backgroundColor: '#1c79fc' }}
                      type="submit"
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
