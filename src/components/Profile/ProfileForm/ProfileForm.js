import { useState } from 'react';
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
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { inputFieldNames } from './InputNames';

import { useStyles } from './ProfileFormStyle';
import { createProfile } from '../../../apiServices/ProfileApi';

const ProfileForm = () => {
  // check if state is on updateMode
  const [updateMode, setUpdateMode] = useState(false);
  // state for all the input names
  const [profileInput, setProfileInput] = useState(inputFieldNames);
  // custom classes
  const classes = useStyles();

  // handle the submit when user create account
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic goes here
  };
  // handle all changes as user type
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
                    name='name'
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
                    name='phone'
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
                    label='Mobile Number'
                    name='mobile'
                    variant='filled'
                    onChange={handleChange}
                    type='text'
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PhoneAndroidIcon className={classes.icon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    name='dateOfBirth'
                    required
                    type='date'
                    variant='filled'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
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
