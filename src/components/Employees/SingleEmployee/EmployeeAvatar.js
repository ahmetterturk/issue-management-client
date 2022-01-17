import React from 'react';
import { CardContent, Box, Avatar } from '@mui/material';
const EmployeeAvatar = ({ image }) => {
  return (
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Avatar
          src={image}
          sx={{
            height: 300,
            mb: 2,
            width: 300,
            // borderRadius: '50%',
          }}
        />
      </Box>
    </CardContent>
  );
};

export default EmployeeAvatar;
