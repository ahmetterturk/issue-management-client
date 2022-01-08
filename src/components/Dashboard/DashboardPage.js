import { Box, Container, Grid } from '@mui/material';
import TotalTickets from './TotalTickets';
import TotalEmployees from './TotalEmployees';
import NewTickets from './NewTickets';
import ResolvedTickets from './ResolvedTickets';
const DashboardPage = () => {
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
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalTickets
                title='Issues'
                total='22'
                subtitle='Check the Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalEmployees
                title='Employees'
                total='22'
                subtitle="Check employee's page"
                to='/employee'
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <NewTickets
                title='New Tickets'
                total='10'
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <ResolvedTickets
                title='Resolved'
                total='18'
                subtitle='Check Tickets'
                to='/issues'
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {/* <Sales /> */}
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              {/* <TrafficByDevice sx={{ height: '100%' }} /> */}
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              {/* <LatestProducts sx={{ height: '100%' }} /> */}
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {/* <LatestOrders /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;
