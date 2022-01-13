import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProfileDetails from './ProfileDetails';
// ProfilePage components is just for rendering the profileDetails component with some extra styles
const ProfilePage = () => {
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          mt: 10,
        }}
      >
        <Container maxWidth='lg'>
          <Typography sx={{ mb: 3 }} variant='h4'>
            Profile Account
          </Typography>
          <ProfileDetails />
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
