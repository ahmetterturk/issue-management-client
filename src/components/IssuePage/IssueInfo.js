import { Divider, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IssueEditForm from './IssueEditForm';
import jwtdecode from 'jwt-decode';
import { useGlobalContext } from '../../contextReducer/Context';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ff8a80',
  },
}));

const IssueInfo = ({ issue, id, isLoading, setIsLoading }) => {
  const classes = useStyles();
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
              <Grid sx={{ marginBottom: 2 }} xs={12}>
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
                >
                  Issue Type
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  fontSize={18}
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
