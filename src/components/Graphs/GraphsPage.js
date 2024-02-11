import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import { Grid, Container } from '@mui/material';
import moment from 'moment';
import { useStyles } from './GraphPageStyles';
import jwtDecode from 'jwt-decode';
import Errors from '../ErrorPages/Errors';
import unauthorizedImage from '../../images/unauthorized.jpg';
import loginImage from '../../images/login.jpg';

const GraphsPage = () => {
  // calling global state from the global context provider
  const { state } = useGlobalContext();
  // classes constant is defined to help style the graphs page
  const classes = useStyles();
  if (!state.currentUser) {
    return (
      <Errors
        title="You need to login first"
        errorMessage="You cannot access the application unless you login first"
        route="/login"
        imageSrc={loginImage}
        btnMessage="Back to login page"
      />
    );
  }
  // getting jwt and current user information from global state
  const {
    issues,
    currentUser: { token },
  } = state;
  const decodedToken = jwtDecode(token);
  const { isAdmin } = decodedToken;

  // error to show to user if they try to access this page without being an admin
  if (!isAdmin) {
    return (
      <Errors
        status="401"
        title="You are not authorized to access this page"
        errorMessage="You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation"
        route="/issues"
        imageSrc={unauthorizedImage}
        btnMessage="Back to login page"
      />
    );
  }

  // Data for doughnut charts
  const priority = issues.map((issue) => issue.priority);
  const status = issues.map((issue) => issue.status);
  const type = issues.map((issue) => issue.type);

  const prioritySet = [...new Set(priority)];
  const statusSet = [...new Set(status)];
  const typeSet = [...new Set(type)];

  const prioritySetNumbers = [...new Set(priority)].map(
    (element) => priority.filter((x) => x === element).length
  );
  const statusSetNumbers = [...new Set(status)].map(
    (element) => status.filter((x) => x === element).length
  );
  const typeSetNumbers = [...new Set(type)].map(
    (element) => type.filter((x) => x === element).length
  );

  // Data for line chart
  // just had to change the format og the moment and then chain sort to it to sort the items
  const dates = issues
    .map((issue) => moment(issue.createdAt).format('YYYYMMDD'))
    .sort((a, b) => a - b);
  const datesSet = [...new Set(dates)];
  // we needed to create another array and then with proper moment format to pass as our dates in linechart compoenet
  const datesSetNew = datesSet.map((date) => moment(date).format('ll'));
  const issuesAtDateCount = datesSet.map(
    (date) => dates.filter((x) => x === date).length
  );

  return (
    <>
      <Container maxWidth={false} className={classes.graphsPageContainerGrid}>
        <Grid container spacing={2}>
          <Grid
            item
            className={classes.singleDonutGrid}
            lg={4}
            md={6}
            sm={12}
            xs={12}
          >
            <DoughnutChart
              labels={prioritySet}
              data={prioritySetNumbers}
              title="Priority"
            />
          </Grid>
          <Grid
            item
            className={classes.singleDonutGrid}
            lg={4}
            md={6}
            sm={12}
            xs={12}
          >
            <DoughnutChart
              labels={statusSet}
              data={statusSetNumbers}
              title="Status"
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            sm={12}
            xs={12}
            className={classes.singleDonutGrid}
          >
            <DoughnutChart
              labels={typeSet}
              data={typeSetNumbers}
              title="Type"
            />
          </Grid>
          <Grid
            item
            className={classes.singleLineGrid}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <LineChart
              dates={datesSetNew}
              issuesAtDateCount={issuesAtDateCount}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GraphsPage;
