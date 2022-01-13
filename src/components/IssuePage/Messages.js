import React from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';

const Messages = ({ messages, issueId, userName, userId, isLoading }) => {
  // defining a constant to filter the messages that belong to the specific issue being viewed.
  const filteredMessages = messages.filter(
    (message) => message.issueId === issueId
  );
  return (
    <Card elevation={5} sx={{ marginBottom: 20 }}>
      <CardContent>
        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5">
                Messages
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message, index) => {
                  return <Message message={message} key={index} />;
                })
              ) : (
                <Card elevation={3} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography fontSize={18}>
                      There are no messages on this issue. Be the first one to
                      send a message.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
            <Grid item xs={12}>
              <MessageForm
                issueId={issueId}
                userName={userName}
                userId={userId}
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default Messages;
