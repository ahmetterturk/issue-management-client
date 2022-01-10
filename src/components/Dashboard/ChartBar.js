import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from '@mui/material';
import { useGlobalContext } from '../../contextReducer/Context';
import moment from 'moment';
import { useStyles } from './Styles';

const ChartBar = () => {
  const theme = useTheme();
  const styleProps = {
    borderColor: 'rgba(28, 121, 252, 0.5)',
  };
  const classes = useStyles(styleProps);
  const {
    state: { issues },
  } = useGlobalContext();

  const dates = issues
    .map((issue) => moment(issue.createdAt).format('YYYYMMDD'))
    .sort((a, b) => a - b);
  const datesSet = [...new Set(dates)];
  // we needed to create another array and then with proper moment format to pass as our dates in linechart compoenet
  const datesSetNew = datesSet.map((date) => moment(date).format('ll'));
  const issuesAtDateCount = datesSet.map(
    (date) => dates.filter((x) => x === date).length
  );

  const data = {
    datasets: [
      {
        backgroundColor: '#1c79fc',
        data: issuesAtDateCount,
      },
    ],
    labels: datesSetNew,
  };

  const options = {
    options: {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      // responsive: true,
      scales: {
        xAxes: [
          {
            barThickness: 25,
            maxBarThickness: 25,
            ticks: {
              fontColor: theme.palette.text.secondary,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              stepSize: 1,
              min: 0,
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: theme.palette.divider,
              drawBorder: false,
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
              zeroLineColor: theme.palette.divider,
            },
          },
        ],
        tooltips: {
          backgroundColor: theme.palette.background.paper,
          bodyFontColor: theme.palette.text.secondary,
          borderColor: theme.palette.divider,
          borderWidth: 1,
          enabled: true,
          footerFontColor: theme.palette.text.secondary,
          intersect: false,
          mode: 'index',
          titleFontColor: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Card elevation={5} className={classes.border}>
      <CardHeader title="Latest Issues" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar data={data} options={options.options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartBar;
