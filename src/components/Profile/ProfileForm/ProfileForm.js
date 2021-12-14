import { useEffect, useState } from 'react';
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
import { createProfile, getProfiles } from '../../../apiServices/ProfileApi';
import { useGlobalContext } from '../../../contextReducer/Context';

const ProfileForm = () => {
  const { state, dispatch } = useGlobalContext();
  const { user } = state;

  // check if state is on updateMode
  const [updateMode, setUpdateMode] = useState(false);
  // state for all the input names
  const [profileInput, setProfileInput] = useState({
    fullName: '',
    address: '',
    emergencyContact: '',
    mobilePhone: '',
    dateOfBirth: '',
    userId: (user && user.uid) || '',
  });
  console.log(profileInput, user.uid);
  // custom classes
  const classes = useStyles();

  // handle the submit when user create account
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic goes here
    createProfile(profileInput)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setProfileInput({
      fullName: '',
      address: '',
      emergencyContact: '',
      mobilePhone: '',
      dateOfBirth: '',
      userId: '',
    });
  };

  // handle input changes
  const handleChange = (e) => {
    setProfileInput({
      ...profileInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box>
        <Typography variant='h3' align='center' className={classes.heading}>
          Profile
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='fullName'
                    required
                    variant='filled'
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PersonOutlineIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Address'
                    name='address'
                    required
                    variant='filled'
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <ImportContactsIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Emergency Contact'
                    name='emergencyContact'
                    required
                    variant='filled'
                    onChange={handleChange}
                    type='text'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PermContactCalendarIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    name='mobilePhone'
                    variant='filled'
                    onChange={handleChange}
                    type='text'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LocalPhoneIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name='dateOfBirth'
                    required
                    type='date'
                    variant='filled'
                    onChange={handleChange}
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
                      className={classes.button}
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                    >
                      Upload file
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                      type='submit'
                    >
                      {updateMode ? 'Update' : 'Create'}
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
