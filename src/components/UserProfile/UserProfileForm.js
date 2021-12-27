import React, { useState, useEffect } from 'react';
import { useStyles } from './UserProfileFormStyle';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../contextReducer/Context';
import { uploadProfileImage, updateUser } from '../../apiServices/UserApi';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const UserProfileForm = () => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState(false);
  const [profileImageInput, setProfileImageInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
          })
          .catch((err) => console.log(err));
        navigate('/issues');
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
    console.log(data);
  };

  return (
    <>
      <Box>
        <Typography variant='h3' align='center' className={classes.heading}>
          Profile
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.card}>
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
                  classes={classes.icon}
                  errors={errors.firstName}
                  errorMessage="Firstname can't be blank, minimum of 3 characters"
                  classes={classes.error}
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
                  classes={classes.error}
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
                  classes={classes.error}
                />

                <FormInput
                  icons={<PasswordIcon />}
                  register={register}
                  label='Password'
                  name='password'
                  type='password'
                  xs={12}
                  md={12}
                  size={6}
                  errors={errors.password}
                  errorMessage="Password can't be blank, minimum of 6 charactes"
                  classes={classes.error}
                />
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
                      className={classes.button}
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                    >
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) =>
                          setProfileImageInput(e.target.files[0])
                        }
                      />
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                      type='submit'
                    >
                      {isFetching ? 'Wait...' : 'Create'}
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

export default UserProfileForm;
