import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useStyles } from './GraphPageStyles';
const DoughnutChart = ({ data, title, labels }, props) => {
  const classes = useStyles();
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              color='textSecondary'
              gutterBottom
              align='center'
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Doughnut
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    backgroundColor: ['#F6C23E', '#1CC88A', '#4E73DF'],
                    borderColor: ['#F6C23E', '#1CC88A', '#4E73DF'],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    // <Typography>{title}</Typography>
    // <Doughnut
    //   data={{
    //     labels: labels,
    //     datasets: [
    //       {
    //         data: data,
    //         backgroundColor: ['#F6C23E', '#1CC88A', '#4E73DF'],
    //         borderColor: ['#F6C23E', '#1CC88A', '#4E73DF'],
    //         borderWidth: 1,
    //       },
    //     ],
    //   }}
    // />
  );
};

export default DoughnutChart;
