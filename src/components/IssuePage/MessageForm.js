import { Button, TextField, Grid } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import SendIcon from '@mui/icons-material/Send';
import { createMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';

const MessageForm = ({ issueId, userName }) => {
  const { dispatch } = useGlobalContext();
  const data = {
    messageBody: '',
    issueId: issueId,
    userName: userName,
  };
  const classes = useStyles();
  const [formData, setFormData] = useState(data);

  const handleSubmit = (event) => {
    event.preventDefault();

    createMessage(formData)
      .then(dispatch({ type: 'INCREASE_COUNTER' }))
      .catch((error) => console.log(error));

    setFormData({ ...formData, messageBody: '' });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid className={classes.container} container justifyContent="center">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth={true}
          placeholder="Enter Comment"
          multiline
          rows={5}
          name="messageBody"
          value={formData.messageBody}
          onChange={handleChange}
        ></TextField>
        <Button
          size="large"
          sx={{ m: 2 }}
          className={classes.sendButton}
          variant="contained"
          type="submit"
        >
          Send Message
          <SendIcon fontSize="small" className={classes.sendIcon} />
        </Button>
      </form>
    </Grid>
  );
};

export default MessageForm;
