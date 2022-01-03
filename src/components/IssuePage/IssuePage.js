import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Messages from './Messages';
// import issueData from './issueData';
import IssueInfo from './IssueInfo';
// import PersonSelect from './PersonSelect';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../apiServices/IssueApi';
import IssueEditForm from './IssueEditForm';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { getAllMessages } from '../../apiServices/MessageApi';
import Members from './Members';

const IssuePage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { state } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  const [issue, setIssue] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getIssue(id)
      .then((response) => setIssue(response))
      .catch((error) => console.log(error));
  }, [id, state.counter]);

  useEffect(() => {
    getAllMessages()
      .then((response) => {
        setMessages(response);
      })
      .catch((error) => console.log(error));
  }, [state.counter]);

  return (
    <>
      <Container className={classes.container}>
        {(decodedToken.id === issue.userId || decodedToken.isAdmin) && (
          <IssueEditForm issue={issue} id={id} />
        )}

        <Typography className={classes.header} variant="h4">
          Ticket
        </Typography>

        <IssueInfo issue={issue} />

        <div className={classes.mutualContainer}>
          <Typography variant="h6">{issue.title}</Typography>
          <Typography>{issue.description}</Typography>
        </div>

        {/* <PersonSelect /> */}
        <Members issue={issue} />

        <Messages
          messages={messages}
          issueId={id}
          userName={`${currentUser.userDetails.firstName} ${currentUser.userDetails.lastName}`}
          userId={decodedToken.id}
        />
      </Container>
    </>
  );
};

export default IssuePage;
