import { Typography } from '@mui/material';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data, title, labels }) => {
  return (
    <div>
      <Typography>{title}</Typography>
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
        //   height={50}
        //   width={100}
      />
    </div>
  );
};

export default DoughnutChart;
