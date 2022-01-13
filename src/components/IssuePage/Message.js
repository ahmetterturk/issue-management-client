import React from 'react';
import { deleteMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Typography, Card, CardContent, Grid } from '@mui/material';

// function that handles styling of this component
const useStyles = makeStyles((theme) => ({
  deleteMsgIcon: {
    color: '#ED5500',
    cursor: 'pointer',
    transition: 'ease-in-out',
    '&:hover': {
      color: 'red',
    },
  },
}));

export const MessageView = ({ message, index, deleteMessage }) => {
  // getting state data from global context provider
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  // decoding jwt token stored in local storage
  const decodedToken = jwtdecode(token);
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // 'deleteMessage()' function is defined in the api services and uses axios make a delete request
  const handleDelete = (id) => {
    deleteMessage(id)
      .then((data) => {
        console.log(data);
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      elevation={3}
      className={classes.mutualContainer}
      sx={{ marginBottom: 2 }}
    >
      <CardContent>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Typography>{message.userName}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography color="GrayText">
              {moment(message.createdAt).format('MMM Do YYYY, h:mm:ss a')}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={11}>
            <Typography>{message.messageBody}</Typography>
          </Grid>
          <Grid item xs={1}>
            {(decodedToken.id === message.userId || decodedToken.isAdmin) && (
              <DeleteIcon
                className={classes.deleteMsgIcon}
                onClick={() => handleDelete(message._id)}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Message = (props) => (
  <MessageView deleteMessage={deleteMessage} {...props}></MessageView>
);
export default Message;
