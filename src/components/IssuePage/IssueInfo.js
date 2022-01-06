import { CardHeader, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IssueEditForm from './IssueEditForm';
import jwtdecode from 'jwt-decode';
import { useGlobalContext } from '../../contextReducer/Context';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ff8a80',
  },
  // titleNameContainer: {
  //   marginBottom: theme.spacing(3),
  // },
  // issueDate: {
  //   marginBottom: theme.spacing(3),
  // },
  // issueDescription: {
  //   marginBottom: theme.spacing(3),
  // },
  // specItems: {
  //   marginBottom: theme.spacing(3),
  // },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#F6F6F6',
  borderRadius: '15px',
  margin: '10px 0',
  padding: '15px',
}));

const IssueInfo = ({ issue, id }) => {
  const classes = useStyles();
  const { state, dispatch } = useGlobalContext();
  const { currentUser, assignedIssues } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  return (
    <Card>
      <CardContent>
        <Grid container className={classes.titleNameContainer}>
          <Grid item md={9} xs={7}>
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              color="text.secondary"
            >
              Issue Title
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
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
          <Typography gutterBottom variant="body1" component="div">
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
          <Typography gutterBottom variant="body1">
            {issue.createdAt}
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
          <Typography gutterBottom variant="body1">
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
            <Typography gutterBottom variant="body1" component="div">
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
            <Typography gutterBottom variant="body1" component="div">
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
            <Typography gutterBottom variant="body1" component="div">
              {issue.status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IssueInfo;
