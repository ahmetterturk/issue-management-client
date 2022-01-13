import React from 'react';
import { Card, CardContent, Box, Avatar, Divider } from '@mui/material';
import { useStyles } from './EmployeeStyles';
// EmployeeAvatar component is for rendring current user image
const EmployeeAvatar = ({ image }) => {
  // declaring classes to assign useStyles to use Costomize css
  const classes = useStyles();
  return (
    <Card className={classes.avatarBorder} elevation={5}>
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
              height: 200,
              mb: 2,
              width: 200,
              borderRadius: '50%',
            }}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default EmployeeAvatar;
