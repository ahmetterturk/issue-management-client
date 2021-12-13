import { Typography } from '@mui/material';
import React from 'react';

const Message = ({ message }) => {
  console.log(message);
  return (
    <div>
      <Typography>{message.author}</Typography>
      <Typography>{message.message}</Typography>
    </div>
  );
};

export default Message;
