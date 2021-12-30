import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import { Grid } from '@mui/material';
import moment from 'moment';

const GraphsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { issues } = state;
  console.log(issues);

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

  //   console.log(priority);
  //   console.log(status);
  //   console.log(type);

  //   console.log(prioritySet);
  //   console.log(statusSet);
  //   console.log(typeSet);

  //   console.log(prioritySetNumbers);
  //   console.log(statusSetNumbers);
  //   console.log(typeSetNumbers);

  // Data for line chart
  const dates = issues.map((issue) => moment(issue.createdAt).format('ll'));
  const datesSet = [...new Set(dates)];
  const issuesAtDateCount = datesSet.map(
    (date) => dates.filter((x) => x === date).length
  );
  console.log(dates);
  console.log(datesSet);
  console.log(issuesAtDateCount);

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={6} sm={12}>
        <DoughnutChart
          labels={prioritySet}
          data={prioritySetNumbers}
          title="Priority"
        />
      </Grid>
      <Grid item lg={4} md={6} sm={12}>
        <DoughnutChart
          labels={statusSet}
          data={statusSetNumbers}
          title="Status"
        />
      </Grid>
      <Grid item lg={4} md={6} sm={12}>
        <DoughnutChart labels={typeSet} data={typeSetNumbers} title="Type" />
      </Grid>
      <Grid item lg={10}>
        <LineChart dates={datesSet} issuesAtDateCount={issuesAtDateCount} />
      </Grid>
    </Grid>
  );
};

export default GraphsPage;
