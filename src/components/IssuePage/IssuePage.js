import { Container, Typography } from '@mui/material';
import React from 'react';
import Messages from './Messages/Messages';
import issueData from './issueData';
import IssueInfo from './IssueInfo/IssueInfo';
import PersonSelect from './PersonSelect/PersonSelect';
import useStyles from './styles';

const IssuePage = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <Typography className={classes.header} variant="h4">
          Ticket
        </Typography>

        <IssueInfo issueData={issueData} />

        <div className={classes.descriptionContainer}>
          <Typography variant="h6">Subject: {issueData.title}</Typography>
          <Typography>{issueData.subject}</Typography>
        </div>

        <PersonSelect />

        <Messages messages={issueData.messages} />
      </Container>
    </>
  );
};

export default IssuePage;
