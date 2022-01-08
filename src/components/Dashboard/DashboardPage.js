import { Box, Container, Grid } from '@mui/material';
import TotalTickets from './TotalTickets';
import TotalEmployees from './TotalEmployees';
import NewTickets from './NewTickets';
import ResolvedTickets from './ResolvedTickets';
import ChartBar from './ChartBar';
import PendingTickets from './PendingTickets';
import { useGlobalContext } from '../../contextReducer/Context';
const DashboardPage = () => {
  const {
    state: { users, issues },
  } = useGlobalContext();
  const newIssues = issues.filter((issue) => issue.status === 'New');
  const resolvedIssues = issues.filter((issue) => issue.status === 'Resolved');
  const pendingIssues = issues.filter((issue) => issue.status === 'Pending');

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
                total={issues.length}
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalEmployees
                title='Employees'
                total={users ? users.allUsers.length - 1 : 0}
                subtitle="Check employee's page"
                to='/employee'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <NewTickets
                title='New Tickets'
                total={newIssues.length}
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <ResolvedTickets
                title='Resolved'
                total={resolvedIssues.length}
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <PendingTickets
                title='Pending'
                total={pendingIssues.length}
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xs={12}>
              <ChartBar />
            </Grid>
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;
