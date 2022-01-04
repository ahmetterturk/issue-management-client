import React from 'react';
import { Line } from 'react-chartjs-2';
import { useStyles } from './GraphPageStyles';
import { Card } from '@mui/material';
const LineChart = ({ dates, issuesAtDateCount }, props) => {
  const classes = useStyles();
  return (
    <Card {...props} className={classes.LineChartCard}>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Issues By Day',
              data: issuesAtDateCount,
              //   backgroundColor: 'red',
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
              borderWidth: 4,
            },
          ],
        }}
        options={{
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
        }}
        // height={400}
        // width={800}
      />
    </Card>
  );
};

export default LineChart;
