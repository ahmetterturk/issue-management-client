import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import IssueInfo from './IssueInfo';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { getAllMessages } from '../../apiServices/MessageApi';
import Members from './Members';
import { Typography, Grid } from '@mui/material';
import notFoundImage from '../../images/notFound2.jpg';
import Errors from '../ErrorPages/Errors';

export const IssuePageView = ({ getAllMessages, getIssue, useParams }) => {
  // defining a classes constant to use with styling of components
  const classes = useStyles();
  // Getting the MongoDB id of the issue from params
  const { id } = useParams();
  // using state and jwtdecode package to decode and use user data stored in the jwt token, stored in the local storage
  const { state, dispatch } = useGlobalContext();
  const { currentUser, assignedIssues } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);
  // defining necessary state values
  const [hasError, setHasError] = useState(false);
  const [issue, setIssue] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [issueMembers, setIssueMembers] = useState([]);

  // Fetching issue by id from the MongoDB database, using the id param retreived from params
  // 'getIssue()' function is defined in the api services and uses axios make the get request
  useEffect(() => {
    setIsLoading(true);
    getIssue(id)
      .then((response) => {
        if (response.status === 500) {
          setHasError(true);
        } else {
          setIssue(response);
          setIsLoading(false);
          setHasError(false);
        }
      })
      .catch((error) => console.log(error));
  }, [id, state.counter]);

  // Fetching all messages from MongoDB database with the 'getAllMessages()' function that is
  // defined in the api services and uses axios make the get request
  useEffect(() => {
    getAllMessages()
      .then((response) => {
        setMessages(response);
      })
      .catch((error) => console.log(error));
  }, [state.counter]);

  useEffect(() => {
    const currentAssignedIssues = assignedIssues.filter(
      (issue) => issue._id !== id
    );
    dispatch({ type: 'SET_ASSIGNED_ISSUES', data: currentAssignedIssues });
  }, [id, dispatch]);

  // finding users that are included in the issue as members
  useEffect(() => {
    if (issue.members && state.users.allUsers) {
      const members = state.users.allUsers.filter((user) =>
        issue.members.includes(`${user.firstName} ${user.lastName}`)
      );
      setIssueMembers(members);
    }
  }, [issue, state.users.allUsers]);

  // rendering the error page if there is an error
  if (hasError) {
    return (
      <Errors
        status="404"
        title="There is no issue with current id in our server"
        errorMessage="Please make sure issue exist"
        route="/issues"
        imageSrc={notFoundImage}
        btnMessage="Back to main page"
      />
    );
  }

  return (
    <Grid sx={{ marginTop: 14 }}>
      <Typography
        data-testid="issue-title"
        className={classes.header}
        variant="h4"
      >
        {issue.title}
      </Typography>

      <Grid container className={classes.container} spacing={2}>
        <Grid item lg={7} md={7} xs={12}>
          <IssueInfo isLoading={isLoading} issue={issue} id={id} />
          <br></br>
          <Members
            issueMembers={issueMembers}
            issue={issue}
            id={id}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Messages
            isLoading={isLoading}
            messages={messages}
            issueId={id}
            userName={`${currentUser.userDetails.firstName} ${currentUser.userDetails.lastName}`}
            userId={decodedToken.id}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const IssuePage = (props) => (
  <IssuePageView
    getAllMessages={getAllMessages}
    getIssue={getIssue}
    useParams={useParams}
    {...props}
  ></IssuePageView>
);
export default IssuePage;
