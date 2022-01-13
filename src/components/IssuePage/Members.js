import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import AddMembersForm from './AddMembersForm';
import jwtdecode from 'jwt-decode';
import IssueMembersTable from './IssueMembersTable';
import {
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';

const Members = ({ issue, id, isLoading, issueMembers }) => {
  // using state and jwtdecode package to decode and use user data stored in the jwt token, stored in the local storage
  const { state } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  return (
    <Card elevation={5}>
      <CardContent>
        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container direction="column">
            <Grid item sm={9} xs={7}>
              {issue.members && issue.members.length > 0 && (
                <>
                  {' '}
                  <Typography gutterBottom variant="h5" component="div">
                    Members
                  </Typography>
                  <Divider />
                </>
              )}

              {issueMembers && issueMembers.length > 0 ? (
                <IssueMembersTable issueMembers={issueMembers} />
              ) : (
                <Typography>
                  There are currently no members on this issue
                </Typography>
              )}
            </Grid>
            <Grid item sm={3} xs={5}>
              {(decodedToken.id === issue.userId || decodedToken.isAdmin) && (
                <AddMembersForm issue={issue} id={id} />
              )}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default Members;
