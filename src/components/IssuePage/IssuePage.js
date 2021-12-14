import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import Messages from './Messages/Messages';
import issueData from './issueData';
import IssueInfo from './IssueInfo/IssueInfo';
import PersonSelect from './PersonSelect/PersonSelect';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const IssuePage = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [issue, setIssue] = useState([]);

  console.log(id);
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
