import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  graphsPageContainerGrid: {
    marginTop: theme.spacing(15),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    paddingBottom: theme.spacing(6),
  },
  singleDonutGrid: {
    [theme.breakpoints.down('md')]: {
      width: 355,
    },
  },
  dounutCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  singleLineGrid: {
    [theme.breakpoints.down('sm')]: {
      width: 375,
    },
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
}));
