import { Divider, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const Message = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.mutualContainer}>
      <Typography>{message.userName}</Typography>
      <Divider />
      <Typography>{message.messageBody}</Typography>
    </div>
  );
};

export default Message;
