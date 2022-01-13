import * as React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import { makeStyles } from '@mui/styles';
import IssueEditForm from './IssueEditForm';
import jwtdecode from 'jwt-decode';
import moment from 'moment';
import {
  Divider,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';

// function that handles styling for this components
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ff8a80',
  },
}));

const IssueInfo = ({ issue, id, isLoading, setIsLoading }) => {
  // defining a classes constant to use with styling of components
  const classes = useStyles();
  // using state and jwtdecode package to decode and use user data stored in the jwt token, stored in the local storage
  const { state } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  return (
    <Card elevation={5}>
      <CardContent>
        {isLoading ? (
          <Grid
            container
            className={classes.titleNameContainer}
            justifyContent="center"
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid container className={classes.titleNameContainer}>
              <Grid item sx={{ marginBottom: 2 }} xs={12}>
                <Typography gutterBottom variant="h5">
                  Issue Details
                </Typography>
                <Divider />
              </Grid>

              <Grid item md={9} xs={7}>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={15}
                  sx={{
                    display: 'inline-block',
                    borderBottom: '1px solid #c4c4c4',
                  }}
                >
                  Issue Title
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  fontSize={18}
                >
                  {issue.title}
                </Typography>
              </Grid>
              <Grid item md={3} xs={5}>
                {(decodedToken.id === issue.userId || decodedToken.isAdmin) && (
                  <IssueEditForm issue={issue} id={id} />
                )}
              </Grid>
            </Grid>
            <Grid className={classes.issueDate}>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={15}
                sx={{
                  display: 'inline-block',
                  borderBottom: '1px solid #c4c4c4',
                }}
              >
                Issue Author
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                fontSize={18}
              >
                {issue.userName}
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={15}
                sx={{
                  display: 'inline-block',
                  borderBottom: '1px solid #c4c4c4',
                }}
              >
                Issue Date
              </Typography>
              <Typography gutterBottom variant="body1" fontSize={18}>
                {moment(issue.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Grid>
            <Grid className={issue.issueDescription}>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={15}
                sx={{
                  display: 'inline-block',
                  borderBottom: '1px solid #c4c4c4',
                }}
              >
                Issue Description
              </Typography>
              <Typography gutterBottom variant="body1" fontSize={18}>
                {issue.description}
              </Typography>
            </Grid>
            <Grid container>
              <Grid item md={4} sm={12} xs={12} className={classes.specItems}>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={15}
                  sx={{
                    display: 'inline-block',
                    borderBottom: '1px solid #c4c4c4',
                  }}
                >
                  Issue Type
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  fontSize={18}
                  style={{
                    color:
                      (issue.type === 'Private' && '#ED5500') ||
                      (issue.type === 'Public' && '#00CC8F'),
                  }}
                >
                  {issue.type}
                </Typography>
              </Grid>
              <Grid item md={4} sm={12} xs={12} className={classes.specItems}>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={15}
                  sx={{
                    display: 'inline-block',
                    borderBottom: '1px solid #c4c4c4',
                  }}
                >
                  Issue Status
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  fontSize={18}
                  style={{
                    color:
                      (issue.priority === 'High' && '#ED5500') ||
                      (issue.priority === 'Low' && '#00CC8F'),
                  }}
                >
                  {issue.priority}
                </Typography>
              </Grid>
              <Grid item md={4} sm={12} xs={12} className={classes.specItems}>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={15}
                  sx={{
                    display: 'inline-block',
                    borderBottom: '1px solid #c4c4c4',
                  }}
                >
                  Issue Priority
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  fontSize={18}
                  style={{
                    color:
                      (issue.status === 'Pending' && '#007BF5') ||
                      (issue.status === 'New' && '#ED5500') ||
                      (issue.status === 'Resolved' && '#00CC8F'),
                  }}
                >
                  {issue.status}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueInfo;
