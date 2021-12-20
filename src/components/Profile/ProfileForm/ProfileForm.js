import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useStyles } from './ProfileFormStyle';
import { createProfile } from '../../../apiServices/ProfileApi';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { uploadProfileImage } from '../../../apiServices/ProfileApi';
import { Logout } from '@mui/icons-material';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [createdProfile, setCreatedProfile] = useState({});
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  if (state.user.error && state.user.error.code) {
    navigate('/login');
  } else if (state.userProfile) {
    navigate('/issues');
  }
  const { user } = state;
  // check if state is on updateMode
  const [isFetching, setIsFetching] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [profileImageInput, setProfileImageInput] = useState('');
  const [profileImage, setProfileImage] = useState({});
  let dataFetch;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsFetching(true);
    data.userId = (user && user.uid) || '';
    uploadProfileImage({ image: profileImageInput })
      .then((imageData) => {
        data.image = imageData && imageData.image.src;
        createProfile(data)
          .then((formData) => setCreatedProfile(formData))
          .catch((err) => console.log(err));
        if (state.userProfile === undefined) {
          localStorage.setItem('profile', JSON.stringify(data));
        }
        navigate('/issues');
        console.log(createdProfile);
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (state.user) {
      const match = state.profiles.filter(
        (profile) => profile.userId === state.user.uid
      );
      dispatch({ type: 'CURRENT_PROFILE', data: match[0] });
      localStorage.setItem('profile', JSON.stringify(match[0]));
    }
  }, [state.user, state.userProfile]);

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
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    {...register('fullName', { required: true, minLength: 3 })}
                    variant='filled'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PersonOutlineIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.fullName && (
                    <Typography variant='span' style={{ color: 'red' }}>
                      Name can't be blank, minimum of 3 characters
                    </Typography>
                  )}
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Address'
                    {...register('address', { required: true, minLength: 3 })}
                    variant='filled'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <ImportContactsIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.address && (
                    <Typography variant='span' style={{ color: 'red' }}>
                      Address can't be blank, minimum of 3 characters
                    </Typography>
                  )}
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Emergency Contact'
                    {...register('emergencyContact', {
                      required: true,
                      minLength: 3,
                    })}
                    variant='filled'
                    type='text'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PermContactCalendarIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.emergencyContact && (
                    <Typography variant='span' style={{ color: 'red' }}>
                      Emeregency contact can't be blank
                    </Typography>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    {...register('mobilePhone', {
                      required: true,
                    })}
                    variant='filled'
                    type='tel'
                    placeholder='0470555555'
                    pattern='[0-9]{10}'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LocalPhoneIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.mobilePhone && (
                    <Typography variant='span' style={{ color: 'red' }}>
                      Phone number can't be blank and must contain only numbers
                    </Typography>
                  )}
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    {...register('dateOfBirth', { required: true })}
                    required
                    type='date'
                    variant='filled'
                  />
                  {errors.dateOfBirth && (
                    <Typography variant='span' style={{ color: 'red' }}>
                      D.O.B can't be blank
                    </Typography>
                  )}
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

export default ProfileForm;
