import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import Messages from './Messages/Messages';
import issueData from './issueData';
import IssueInfo from './IssueInfo/IssueInfo';

const IssuePage = () => {
  return (
    <>
      <Container>
        <Typography variant="h4">Ticket</Typography>

        <IssueInfo issueData={issueData} />

        <Typography>{issueData.title}</Typography>
        <Typography>Subject: {issueData.subject}</Typography>

        <Messages messages={issueData.messages} />
      </Container>
    </>
  );
};

export default IssuePage;
