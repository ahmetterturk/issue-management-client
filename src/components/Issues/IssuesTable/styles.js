import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: 375,
    },
  },
  icons: {
    display: 'flex',
  },
  visibilityIcon: {
    display: 'flex',
    padding: 0,
  },
  tableCell: {
    height: theme.spacing(6),
    borderBottom: 'none',
  },
  tablePagination: {},
}));

export default useStyles;
