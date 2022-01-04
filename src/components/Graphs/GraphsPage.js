import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import { Grid, Container } from '@mui/material';
import moment from 'moment';
import { useStyles } from './GraphPageStyles';
const GraphsPage = () => {
  const { state } = useGlobalContext();
  const { issues } = state;
  const classes = useStyles();

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
    <Container maxWidth={false}>
      <Grid container spacing={3} className={classes.dounutGraphs}>
        <Grid item lg={4} sm={6} xl={3} xs={12} sx={{ maxWidth: 370 }}>
          <DoughnutChart
            labels={prioritySet}
            data={prioritySetNumbers}
            title='Priority'
          />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12} sx={{ maxWidth: 370 }}>
          <DoughnutChart
            labels={statusSet}
            data={statusSetNumbers}
            title='Status'
          />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12} sx={{ maxWidth: 370 }}>
          <DoughnutChart labels={typeSet} data={typeSetNumbers} title='Type' />
        </Grid>
        <Grid item lg={8} md={8} xl={9} xs={10}>
          <LineChart
            dates={datesSetNew}
            issuesAtDateCount={issuesAtDateCount}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GraphsPage;
