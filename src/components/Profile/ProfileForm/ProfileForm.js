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

import { useStyles } from './ProfileFormStyle';

const ProfileForm = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const classes = useStyles();

  // function for form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic goes here
  };

  const handleChange = (e) => {
    // logic goes here
  };

  return (
    <>
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
                  className={classes.input}
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
                  name='emergency-contact'
                  required
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
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  name='phone'
                  variant='filled'
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
                  name='DOB'
                  required
                  type='date'
                  variant='filled'
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
    </>
  );
};

export default ProfileForm;
