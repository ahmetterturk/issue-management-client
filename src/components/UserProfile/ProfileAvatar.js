import React from 'react';
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
const ProfileAvatar = (props, { onChange }) => {
  const {
    state: {
      currentUser: {
        userDetails: { image },
      },
    },
  } = useGlobalContext();

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
        <input
          type='file'
          id='file'
          accept='image/*'
          onChange={onChange}
          style={{ display: 'none' }}
        />
        <Button
          variant='contained'
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          <label for='file'>Upload Image</label>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileAvatar;
