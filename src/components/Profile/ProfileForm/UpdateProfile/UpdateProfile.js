import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  updateProfile,
  uploadProfileImage,
} from '../../../../apiServices/ProfileApi';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useGlobalContext } from '../../../../contextReducer/Context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ProfileInput from '../ProfileInput';
import { useStyles } from '../ProfileFormStyle';
const UpdateProfile = () => {
  const { state } = useGlobalContext();
  const {
    fullName,
    address,
    emergencyContact,
    mobilePhone,
    dateOfBirth,
    image,
  } = state.userProfile;
  const date = dateOfBirth.slice(0, 10);
  console.log(date);
  const classes = useStyles();
  const [profileValues, setProfileValues] = useState({
    fullName,
    address,
    emergencyContact,
    mobilePhone,
    dateOfBirth: date,
    image,
  });
  console.log(profileValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profileValues,
  });
  const onSubmit = (data) => {
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
                <ProfileInput
                  icons={<PersonOutlineIcon />}
                  register={register}
                  label='Name'
                  name='fullName'
                  type='text'
                  errors={errors}
                  errorMessage="Name can't be blank"
                  xs={12}
                  md={12}
                  size={3}
                  classes={classes.icon}
                />

                <ProfileInput
                  icons={<ImportContactsIcon />}
                  register={register}
                  label='Address'
                  name='address'
                  type='text'
                  errors={errors}
                  errorMessage="Address can't be blank"
                  xs={12}
                  md={12}
                  size={5}
                />

                <ProfileInput
                  icons={<ImportContactsIcon />}
                  register={register}
                  label='Emergency Contact'
                  name='emergencyContact'
                  type='text'
                  errors={errors}
                  errorMessage="Emergency Contact can't be blank"
                  xs={12}
                  md={12}
                  size={3}
                />

                <ProfileInput
                  icons={<LocalPhoneIcon />}
                  register={register}
                  label='Phone Number'
                  name='mobilePhone'
                  type='tel'
                  placeholder='0470555555'
                  errors={errors}
                  errorMessage="Phone number can't be blank and must contain only numbers"
                  xs={12}
                  md={6}
                />

                <ProfileInput
                  icons={<PermContactCalendarIcon />}
                  register={register}
                  label='D.O.B'
                  name='dateOfBirth'
                  type='date'
                  errors={errors}
                  errorMessage="D.O.B can't be blank"
                  xs={12}
                  md={6}
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
                        // we need on change for profile image
                      />
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                      type='submit'
                    >
                      Update
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

export default UpdateProfile;
