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
