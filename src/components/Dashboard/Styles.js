import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  border: (props) => ({
    border: '3px solid',
    borderColor: props.borderColor,
    height: props.height,
    cursor: props.cursor,
  }),
  chartBarGrid: {
    [theme.breakpoints.down('sm')]: {
      width: 375,
    },
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
}));
