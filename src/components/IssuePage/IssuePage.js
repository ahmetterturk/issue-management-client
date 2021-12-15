import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Messages from './Messages/Messages';
import issueData from './issueData';
import IssueInfo from './IssueInfo/IssueInfo';
import PersonSelect from './PersonSelect/PersonSelect';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../apiServices/IssueApi';

const IssuePage = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [issue, setIssue] = useState([]);

  useEffect(() => {
    getIssue(id)
      .then((response) => setIssue(response))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <Container className={classes.container}>
        <Typography className={classes.header} variant="h4">
          Ticket
        </Typography>

        <IssueInfo issue={issue} issueData={issueData} />

        <div className={classes.descriptionContainer}>
          <Typography variant="h6">Subject: {issue.title}</Typography>
          <Typography>{issue.description}</Typography>
        </div>

        <PersonSelect />

        <Messages messages={issueData.messages} />
      </Container>
    </>
  );
};

export default IssuePage;
