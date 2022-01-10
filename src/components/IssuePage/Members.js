import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../../contextReducer/Context';
import { Divider, Grid } from '@mui/material';
import AddMembersForm from './AddMembersForm';
import jwtdecode from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';
import IssueMembersTable from './IssueMembersTable';

const Members = ({ issue, id, isLoading, issueMembers }) => {
  const { state } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  console.log(issueMembers);

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
