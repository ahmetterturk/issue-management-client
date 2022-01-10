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
const DashboardPage = () => {
  const { state, dispatch } = useGlobalContext();
  const location = useLocation();
  const classes = useStyles();

  const {
    users: { allUsers },
    issues,
  } = state;
  console.log(issues);
  const [issuesCount, setIssuesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [newIssuesCount, setNewIssuesCount] = useState(0);
  const [pendingIssuesCount, setPendingIssuesCount] = useState(0);
  const [resolvedIssuesCount, setResolvedIssuesCount] = useState(0);

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
  }, [location.pathname]);

  return (
    <>
      <Box
        component="main"
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
                title="Issues"
                total={
                  issuesCount !== 0 ? (
                    issuesCount
                  ) : (
                    <CircularProgress sx={{ color: '#1c79fc' }} />
                  )
                }
                subtitle="Check Tickets"
                to="/issues"
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalEmployees
                title="Employees"
                total={
                  userCount !== 1 ? (
                    userCount
                  ) : (
                    <CircularProgress sx={{ color: '#00ffbb' }} />
                  )
                }
                subtitle="Check Employees Page"
                to="/employee"
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <NewTickets
                title="New Tickets"
                total={
                  newIssuesCount !== 0 ? (
                    newIssuesCount
                  ) : (
                    <CircularProgress sx={{ color: '#fc9d17' }} />
                  )
                }
                subtitle="Check Tickets"
                to="/issues?status=New"
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <ResolvedTickets
                title="Resolved"
                total={
                  resolvedIssuesCount !== 0 ? (
                    resolvedIssuesCount
                  ) : (
                    <CircularProgress sx={{ color: '#4c00d9' }} />
                  )
                }
                subtitle="Check Tickets"
                to="/issues?status=Resolved"
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <PendingTickets
                title="Pending"
                total={
                  pendingIssuesCount !== 0 ? (
                    pendingIssuesCount
                  ) : (
                    <CircularProgress sx={{ color: '#ff0059' }} />
                  )
                }
                subtitle="Check Tickets"
                to="/issues?status=Pending"
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

export default DashboardPage;
