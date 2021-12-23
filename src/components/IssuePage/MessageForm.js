import { Button, TextField, Grid } from '@mui/material';
import React from 'react';
import useStyles from './styles';
import SendIcon from '@mui/icons-material/Send';

const MessageForm = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container justifyContent="center">
      <TextField
        fullWidth={true}
        placeholder="Enter Comment"
        multiline
        rows={5}
      ></TextField>
      <Button
        size="large"
        sx={{ m: 2 }}
        className={classes.sendButton}
        variant="contained"
      >
        Send Message <SendIcon fontSize="small" className={classes.sendIcon} />
      </Button>
    </Grid>
  );
};

export default MessageForm;
