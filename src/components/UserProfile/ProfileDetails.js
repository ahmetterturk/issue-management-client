import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormControlLabel,
} from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import { useStyles } from './UserProfileFormStyle';
import FormInput from './FormInput';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../contextReducer/Context';
import Checkbox from '@mui/material/Checkbox';
import { updateUser } from '../../apiServices/UserApi';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import jwtDecode from 'jwt-decode';

const ProfileDetails = (props) => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState(false);
  const [setProfileImageInput] = useState('');
  const { state, dispatch } = useGlobalContext();
  let { currentUser } = state;
  let { userDetails } = currentUser;
  const { token } = currentUser;
  const decodedToken = jwtDecode(token);
  const { isAdmin } = decodedToken;
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userDetails,
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsFetching(true);
    delete data.name;
    delete data.image;
    data.imageUrl = userDetails.image;
    updateUser(data, id)
      .then((userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch({ type: 'UPDATE_SUCCESS' });
        console.log(userData);

        navigate('/issues');
        window.location.reload();
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      dispatch({ type: 'AFTER_UPDATE' });
    }, 4000);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <ProfileAvatar
            onChange={(e) => setProfileImageInput(e.target.files[0])}
          />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <form
            autoComplete='off'
            noValidate
            {...props}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card>
              <CardHeader
                subheader='The information can be edited'
                title='Profile'
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <FormInput
                    register={register}
                    label='First Name'
                    name='firstName'
                    required={true}
                    type='text'
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
                    required={true}
                    type='text'
                    xs={12}
                    md={6}
                    size={3}
                    errors={errors.lastName}
                    errorMessage="Lastname can't be blank, minimum of 3 characters"
                    className={classes.error}
                  />
                  <FormInput
                    icons={<EmailIcon />}
                    register={register}
                    label='Email'
                    name='email'
                    required={true}
                    type='text'
                    xs={12}
                    md={12}
                    size={3}
                    errors={errors.email}
                    errorMessage="Email can't be blank"
                    className={classes.error}
                  />

                  <FormInput
                    icons={<PasswordIcon />}
                    register={register}
                    label='Password'
                    name='password'
                    required={true}
                    type='password'
                    xs={12}
                    md={12}
                    size={5}
                    errors={errors.password}
                    errorMessage="Password can't be blank, minimum of 5 charactes"
                    className={classes.error}
                  />
                  {isAdmin && (
                    <Grid item xs={6} md={6}>
                      <FormControlLabel
                        control={<Checkbox {...register('isAdmin')} />}
                        label='Admin'
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Button color='primary' variant='contained' type='submit'>
                  {isFetching ? (
                    <CircularProgress style={{ color: 'white' }} />
                  ) : (
                    'Save Details'
                  )}
                </Button>
              </Box>
            </Card>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileDetails;
