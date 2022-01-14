import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import DashboardCard from './DashboardCard';
import ChartBar from './ChartBar';
import { useGlobalContext } from '../../contextReducer/Context';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from './Styles';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const DashboardPageView = ({ useLocation }) => {
  // getting state and dispatch from globalContext
  const { state, dispatch } = useGlobalContext();
  // declare location and assign useLocation from react router dom to use the pathname property for checking the current url path to do some actions regarding
  const location = useLocation();
  // declare classes and assign it to the useStyles for custom css
  const classes = useStyles();
  // destructuring allUsers and issues from state
  const {
    users: { allUsers },
    issues,
  } = state;
  // creating state for loading to set to true for rendering spinner
  const [loading, setLoading] = useState(true);
  // creating state for issuesCount to have a length of all issues from database
  const [issuesCount, setIssuesCount] = useState(0);
  // creating state for userCount to have a length of all user from database
  const [userCount, setUserCount] = useState(0);
  // creating state for newIssuesCount to have a length of all new issues from database
  const [newIssuesCount, setNewIssuesCount] = useState(0);
  // creating state for pendingIssuesCount to have a length of all pending issues from database
  const [pendingIssuesCount, setPendingIssuesCount] = useState(0);
  // creating state for resolvedIssuesCount to have a length of all resolved issues from database
  const [resolvedIssuesCount, setResolvedIssuesCount] = useState();
  // with useEffect we declare some new vars to set our states
  useEffect(() => {
    // declaring newIssues var and filtering all issues where single issues status is new, it will assigne a new array with all issues that has a new status
    const newIssues = issues.filter((issue) => issue.status === 'New');
    // declaring resolvedIssues var and filtering all issues where single issues status is resolved, it will assigne a new array with all issues that has a resolved status
    const resolvedIssues = issues.filter(
      (issue) => issue.status === 'Resolved'
    );
    // declaring pendingIssues var and filtering all issues where single issues status is pending, it will assigne a new array with all issues that has a resolved status
    const pendingIssues = issues.filter((issue) => issue.status === 'Pending');
    // setting the number of isseus to issuesCount state
    setIssuesCount(issues.length);
    // setting the number of users to userCount state
    setUserCount(allUsers ? allUsers.length : 1);
    // setting the number of new issues to newIssuesCount state
    setNewIssuesCount(newIssues.length);
    // setting the number of resolved issues to resolvedIsseusCount state
    setResolvedIssuesCount(resolvedIssues.length);
    // setting the number of pending issues to pendingIsseusCount state
    setPendingIssuesCount(pendingIssues.length);
    // adding issues and allUsers as dependency to our useEffect, that useEffect can render upon any changes to these two states
  }, [issues, allUsers]);

  // using useEffect to chack the location pathname and render or do some actions regards to change of url path
  useEffect(() => {
    // check if location.path is equal to '/dashboard' we use dispatch to increase the counter in global state, where counter state being used as an dependecies in App component for two differ useEffect for setting all issues and all users for rerendering them again
    if (location.pathname === '/dashboard') {
      dispatch({ type: 'INCREASE_COUNTER' });
    }
    // declare var for timer and assign a setTimeout for 1500 ms, to set isLoading state to false and stop rendering spinner
    let timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    // clearing the timeoute
    return () => {
      clearTimeout(timer);
    };
    // using location pathname and dispatch as a dependencies to rerender upon any changes regard them
  }, [location.pathname, dispatch]);

  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: '50px',
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              {/* DashboardCard component is been used to render all data from above states */}
              <DashboardCard
                title='Issues'
                total={
                  issuesCount !== 0 ? (
                    issuesCount
                  ) : (
                    <CircularProgress sx={{ color: '#1c79fc' }} />
                  )
                }
                subtitle='Check Tickets'
                to='/issues'
                icon={<AppRegistrationIcon />}
                cardColor='rgba(28, 121, 252, 0.5)'
                iconBgColor='#1c79fc'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <DashboardCard
                title='Employees'
                total={
                  userCount !== 1 ? (
                    userCount
                  ) : (
                    <CircularProgress sx={{ color: '#00ffbb' }} />
                  )
                }
                subtitle='Check Employees Page'
                to='/employee'
                cardColor='rgba(0, 255, 187, 0.5)'
                iconBgColor='#00ffbb'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <DashboardCard
                title='New Tickets'
                total={
                  newIssuesCount !== 0 ? (
                    newIssuesCount
                  ) : loading ? (
                    <CircularProgress sx={{ color: '#fc9d17' }} />
                  ) : (
                    newIssuesCount
                  )
                }
                subtitle='Check Tickets'
                to='/issues?status=New'
                cardColor='rgba(252, 157, 23, 0.5)'
                iconBgColor='#fc9d17'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <DashboardCard
                title='Resolved'
                total={
                  resolvedIssuesCount !== 0 ? (
                    resolvedIssuesCount
                  ) : loading ? (
                    <CircularProgress sx={{ color: '#4c00d9' }} />
                  ) : (
                    resolvedIssuesCount
                  )
                }
                subtitle='Check Tickets'
                to='/issues?status=Resolved'
                cardColor='rgba(76, 0, 217, 0.5)'
                iconBgColor='#4c00d9'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <DashboardCard
                title='Pending'
                total={
                  pendingIssuesCount !== 0 ? (
                    pendingIssuesCount
                  ) : loading ? (
                    <CircularProgress sx={{ color: '#ff0059' }} />
                  ) : (
                    pendingIssuesCount
                  )
                }
                subtitle='Check Tickets'
                to='/issues?status=Pending'
                cardColor='rgba(255, 0, 89, 0.5)'
                iconBgColor='#ff0059'
              />
            </Grid>
            <Grid
              className={classes.chartBarGrid}
              item
              xs={12}
              sm={12}
              lg={12}
              md={12}
            >
              <ChartBar />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const DashboardPage = (props) => (
  <DashboardPageView useLocation={useLocation} {...props}></DashboardPageView>
);
export default DashboardPage;
