import { Button, TextField } from '@mui/material';
import React from 'react';

const MessageForm = () => {
  return (
    <div>
      <TextField placeholder="Enter Comment"></TextField>
      <Button variant="contained">Send</Button>
    </div>
  );
};

export default MessageForm;
