import React from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Messages = ({ messages, issueId, userName, userId }) => {
  const filteredMessages = messages.filter(
    (message) => message.issueId === issueId
  );
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => {
                return (
                  <>
                    <Message key={index} message={message} />
                  </>
                );
              })
            ) : (
              <Card>
                <CardContent>
                  <Typography>
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
      </CardContent>
    </Card>
  );
};

export default Messages;
