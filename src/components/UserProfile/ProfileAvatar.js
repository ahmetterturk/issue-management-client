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
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const ProfileAvatar = (props) => {
  const { state, dispatch } = useGlobalContext();
  const [profileImageInput, setProfileImageInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentUser: {
      userDetails: { image },
    },
  } = state;
  const { userDetails } = state.currentUser;

  const { register, handleSubmit } = useForm({
    defaultValues: userDetails,
  });

  const onSubmit = (data) => {
    setIsFetching(true);
    delete data.image;
    uploadProfileImage({ image: profileImageInput })
      .then((imageData) => {
        userDetails.image = imageData && imageData.image.src;
        setIsFetching(false);
        console.log('from upload image =>>', userDetails);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card {...props}>
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
            onChange={(e) => setProfileImageInput(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <Button
            variant='contained'
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            <label for='file'>Upload Image</label>
          </Button>
          <Button variant='contained' type='submit' sx={{ ml: 5 }}>
            {isFetching ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : (
              'Save Image'
            )}
          </Button>
        </form>
      </CardActions>
    </Card>
  );
};

export default ProfileAvatar;
