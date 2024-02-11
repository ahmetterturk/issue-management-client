import React from 'react';
import { Line } from 'react-chartjs-2';
import { useStyles } from './GraphPageStyles';
import { Card, Box, CardHeader, CardContent, Divider } from '@mui/material';
const LineChart = ({ dates, issuesAtDateCount }, props) => {
  const classes = useStyles();

  // data provided to the line chart
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Issues By Day',
        data: issuesAtDateCount,
        borderColor: '#3094ff',
        fill: true,
        backgroundColor: '#d6eaff',
        borderWidth: 5,
      },
    ],
  };

  // graph options provided to the chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <Card elevation={5} className={classes.border}>
      <CardHeader title="Issues By Day" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
