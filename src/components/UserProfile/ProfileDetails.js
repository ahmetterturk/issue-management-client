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

export const ProfileDetailsView = ({ updateUser, ...props }) => {
  // using useStyles which been created by makeStyle from materail ui to have custom styles
  const classes = useStyles();
  // useState to set is fetching if there is any request
  const [isFetching, setIsFetching] = useState(false);
  // getting state and dispatch from global state
  const { state, dispatch } = useGlobalContext();
  // destructuring the currentUser from state
  let { currentUser } = state;
  // destructuring the userDetails from state
  let { userDetails } = currentUser;
  // destructuring the token from state
  const { token } = currentUser;
  // decoding the token with jwtDecode
  const decodedToken = jwtDecode(token);
  // destructuring the isAdmin from token
  const { isAdmin } = decodedToken;
  // using useNavigate from react router dom
  const navigate = useNavigate();
  // destructuring the id from useParams to get the current id from url
  const { id } = useParams();
  // using register, handleSubmit and forState errors from useFrom and assign a defaultValues with userDetails
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userDetails,
  });
  // onSubmit function for handleSubmit on onSubmit event on form
  const onSubmit = (data) => {
    // set is fetching to true to show the spinner while making request
    setIsFetching(true);
    // deleting the current data.name and data.image to assingn a new name
    delete data.name;
    delete data.image;
    // adding new iamgeUrl property to the data and assigning the userDetails.image
    data.imageUrl = userDetails.image;
    // calling updateUser and passing the data from form and current id
    updateUser(data, id)
      .then((userData) => {
        // setting local storage with new userData which update user retruns with promise
        localStorage.setItem('user', JSON.stringify(userData));
        // dispatching update success to show success message after update
        dispatch({ type: 'UPDATE_SUCCESS' });
        // redirecting to the issues page after updating user
        navigate('/issues');
        window.location.reload();
        // set setIsFetching to fasle
        setIsFetching(false);
        // using setTimeout to set isUpdating state to false with dispatch and clear the update message
        setTimeout(() => {
          dispatch({ type: 'AFTER_UPDATE' });
        }, 8000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          {/* rendering profileAvatar in profilDetails component */}
          <ProfileAvatar />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <form
            autoComplete="off"
            noValidate
            {...{ ...props }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card elevation={5}>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <FormInput
                    register={register}
                    label="First Name"
                    name="firstName"
                    required={true}
                    type="text"
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
                    required={true}
                    type="text"
                    xs={12}
                    md={6}
                    size={3}
                    errors={errors.lastName}
                    errorMessage="Lastname can't be blank, minimum of 3 characters"
                    className={classes.error}
                  />
                  <FormInput
                    icons={<EmailIcon sx={{ color: '#555' }} />}
                    register={register}
                    label="Email"
                    name="email"
                    required={true}
                    type="text"
                    xs={12}
                    md={12}
                    size={3}
                    errors={errors.email}
                    errorMessage="Email can't be blank"
                    className={classes.error}
                  />

                  <FormInput
                    icons={<PasswordIcon sx={{ color: '#555' }} />}
                    register={register}
                    label="Password"
                    name="password"
                    required={true}
                    type="password"
                    xs={12}
                    md={12}
                    size={5}
                    errors={errors.password}
                    errorMessage="Password can't be blank, minimum of 5 charactes"
                    className={classes.error}
                  />
                  {/* if current user is Admin form will show the checkbox for admin, by default is checked and set to true */}
                  {isAdmin && (
                    <Grid item xs={6} md={6}>
                      <FormControlLabel
                        control={<Checkbox {...register('isAdmin')} checked />}
                        label="Admin"
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
                <Button color="primary" variant="contained" type="submit">
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

const ProfileDetails = (props) => (
  <ProfileDetailsView updateUser={updateUser} {...props}></ProfileDetailsView>
);
export default ProfileDetails;
