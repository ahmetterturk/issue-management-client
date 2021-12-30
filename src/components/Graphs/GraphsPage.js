import React from 'react';
import DoughnutChart from './DoughnutChart';
import { useGlobalContext } from '../../contextReducer/Context';
import { Grid } from '@mui/material';

const GraphsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { issues } = state;

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

  console.log(priority);
  console.log(status);
  console.log(type);

  console.log(prioritySet);
  console.log(statusSet);
  console.log(typeSet);

  console.log(prioritySetNumbers);
  console.log(statusSetNumbers);
  console.log(typeSetNumbers);

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
    </Grid>
  );
};

export default GraphsPage;
