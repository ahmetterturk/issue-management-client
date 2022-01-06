import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  dounutGraphs: {
    justifyContent: 'center',
    marginBottom: '50px',
    ['@media (max-width:780px)']: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  dounutCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LineChartCard: {
    marginBottom: '50px',
  },
  link: {
    display: 'inline-block',
    color: '#3489eb',
    marginLeft: '5px',
  },
}));
