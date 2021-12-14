import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const Message = ({ message }) => {
  // console.log(message);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>{message.author}</Typography>
      <Divider />
      <Typography>{message.message}</Typography>
    </div>
  );
};

export default Message;
