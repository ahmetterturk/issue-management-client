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
    color: 'black',
    '&:hover': {
      color: '#0046bf',
    },
  },
  tableCell: {
    height: theme.spacing(6),
    borderBottom: 'none',
  },
  // deleteModal: {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   backgroundColor: 'white',
  //   textAlign: 'center',
  //   padding: theme.spacing(5),
  //   borderRadius: theme.spacing(1),
  //   [theme.breakpoints.down('sm')]: {
  //     width: 200,
  //   },
  // },
  issueTitle: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#0046bf',
    },
  },
}));

export default useStyles;
