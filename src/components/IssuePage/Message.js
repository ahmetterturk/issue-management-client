import { Divider, Typography, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

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

const Message = ({ message, index }) => {
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  const decodedToken = jwtdecode(token);
  const classes = useStyles();
  const handleDelete = (id) => {
    deleteMessage(id)
      .then((data) => {
        console.log(data);
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((err) => console.log(err));
  };

  console.log(message);
  return (
    <Card
      elevation={3}
      key={index}
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

export default Message;
