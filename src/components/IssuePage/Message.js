import { Divider, Typography, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { deleteMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({}));

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
              <DeleteForeverSharpIcon
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
