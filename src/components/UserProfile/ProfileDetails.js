import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import { useStyles } from './UserProfileFormStyle';
import FormInput from './FormInput';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../contextReducer/Context';
import { uploadProfileImage, updateUser } from '../../apiServices/UserApi';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const ProfileDetails = (props) => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState(false);
  const [profileImageInput, setProfileImageInput] = useState('');
  const { state, dispatch } = useGlobalContext();

  const { userDetails } = state.currentUser;
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
    setIsFetching(true);
    delete data.name;
    delete data.image;
    uploadProfileImage({ image: profileImageInput })
      .then((imageData) => {
        data.imageUrl = imageData && imageData.image.src;
        updateUser(data, id)
          .then((userData) => {
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: 'UPDATE_SUCCESS' });
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          })
          .catch((err) => console.log(err));
        navigate('/login');
        setIsFetching(false);
        setTimeout(() => {
          dispatch({ type: 'AFTER_UPDATE' });
        }, 4000);
      })
      .catch((err) => console.log(err));
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
          {/* <ProfileDetails /> */}
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
                    type='text'
                    xs={12}
                    md={6}
                    size={3}
                    className={classes.icon}
                    errors={errors.firstName}
                    errorMessage="Firstname can't be blank, minimum of 3 characters"
                    className={classes.error}
                  />
                  <FormInput
                    register={register}
                    label='Last Name'
                    name='lastName'
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
                    type='password'
                    xs={12}
                    md={12}
                    size={5}
                    errors={errors.password}
                    errorMessage="Password can't be blank, minimum of 5 charactes"
                    className={classes.error}
                  />
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
