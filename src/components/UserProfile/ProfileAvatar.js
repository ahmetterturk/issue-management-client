import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useGlobalContext } from '../../contextReducer/Context';
import { useForm } from 'react-hook-form';
import { uploadProfileImage } from '../../apiServices/UserApi';
import CircularProgress from '@mui/material/CircularProgress';

export const ProfileAvatarView = ({ uploadProfileImage, ...props }) => {
  // using state from globalState
  const { state } = useGlobalContext();
  // useState hook to get file input and set to this state
  const [profileImageInput, setProfileImageInput] = useState('');
  // useState to check if is fetching
  const [isFetching, setIsFetching] = useState(false);
  // getting image property by destructuring the currentUser from the state
  const {
    currentUser: {
      userDetails: { image },
    },
  } = state;
  // destructureing the userDetails from state currentUser
  const { userDetails } = state.currentUser;
  //  destucturing handleSubmit from useForm and set defaultValues with userDetails
  const { handleSubmit } = useForm({
    defaultValues: userDetails,
  });

  // onSubmit function which we pass as an argument to the handleSubmit on the onSubmit in form to make a request on uploadProfileImage
  const onSubmit = (data) => {
    // set is fetching to true to show spinner while making request
    setIsFetching(true);
    // deleting the current image from data if there is any
    delete data.image;
    // calling uploadProfileImage from userApi sevices and pass the profileImageInput state to and it return promise with an object contians image url property
    uploadProfileImage({ image: profileImageInput })
      .then((imageData) => {
        // adding image property to the userDetails and if there is imageDate we will asign teh imageData.image.src
        userDetails.image = imageData && imageData.image.src;
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card {...props} elevation={5}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={image ? image : ''}
            sx={{
              height: 200,
              mb: 2,
              width: 200,
              borderRadius: '50%',
            }}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='file'
            id='file'
            accept='image/*'
            onChange={(e) => {
              setProfileImageInput(e.target.files[0]);
            }}
            style={{ display: 'none' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button
              variant='contained'
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              <label htmlFor='file'>Upload Image</label>
            </Button>
            <Button variant='contained' type='submit' sx={{ ml: 5 }}>
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'Save Image'
              )}
            </Button>
          </Box>
        </form>
      </CardActions>
    </Card>
  );
};

const ProfileAvatar = (props) => (
  <ProfileAvatarView
    uploadProfileImage={uploadProfileImage}
    {...props}
  ></ProfileAvatarView>
);
export default ProfileAvatar;
