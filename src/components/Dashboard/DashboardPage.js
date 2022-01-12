import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TotalTickets from './TotalTickets';
import TotalEmployees from './TotalEmployees';
import NewTickets from './NewTickets';
import ResolvedTickets from './ResolvedTickets';
import ChartBar from './ChartBar';
import PendingTickets from './PendingTickets';
import { useGlobalContext } from '../../contextReducer/Context';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from './Styles';

export const DashboardPageView = ({ useLocations }) => {
  const { state, dispatch } = useGlobalContext();
  const location = useLocation();
  const classes = useStyles();

  const {
    users: { allUsers },
    issues,
  } = state;
  const [loading, setLoading] = useState(true);
  const [issuesCount, setIssuesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [newIssuesCount, setNewIssuesCount] = useState(0);
  const [pendingIssuesCount, setPendingIssuesCount] = useState(0);
  const [resolvedIssuesCount, setResolvedIssuesCount] = useState();

  useEffect(() => {
    const newIssues = issues.filter((issue) => issue.status === 'New');
    const resolvedIssues = issues.filter(
      (issue) => issue.status === 'Resolved'
    );
    const pendingIssues = issues.filter((issue) => issue.status === 'Pending');
    setIssuesCount(issues.length);
    setUserCount(allUsers ? allUsers.length : 1);
    setNewIssuesCount(newIssues.length);
    setResolvedIssuesCount(resolvedIssues.length);
    setPendingIssuesCount(pendingIssues.length);
  }, [issues, allUsers]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      dispatch({ type: 'INCREASE_COUNTER' });
    }
    let timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
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
              <TotalTickets
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
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalEmployees
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
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <NewTickets
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
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <ResolvedTickets
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
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <PendingTickets
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
  <DashboardPageView useLocatons={useLocation} {...props}></DashboardPageView>
);
export default DashboardPage;
