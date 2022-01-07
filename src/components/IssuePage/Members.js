import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../../contextReducer/Context';
import { Grid } from '@mui/material';
import AddMembersForm from './AddMembersForm';
import jwtdecode from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';

const Members = ({ issue, id, isLoading }) => {
  const { state, dispatch } = useGlobalContext();
  const { currentUser, assignedIssues } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  // console.log(issue.members)
  // console.log(state.users.allUsers);
  // console.log(
  //   state.users.allUsers.filter((user) =>
  //     issue.members.includes(`${user.firstName} ${user.lastName}`)
  //   )
  // );

  return (
    <Card elevation={3}>
      <CardContent>
        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container>
            <Grid item sm={9} xs={7}>
              {issue.members && issue.members.length > 0 && (
                <Typography gutterBottom variant="h5" component="div">
                  Members
                </Typography>
              )}

              {issue.members && issue.members.length > 0 ? (
                issue.members.map((member) => {
                  return <Typography variant="h6">{member}</Typography>;
                })
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
