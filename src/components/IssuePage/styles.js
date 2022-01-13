import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  membersBoxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    width: 500,
    height: 150,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(10),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 110,
      padding: theme.spacing(7),
    },
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    width: 500,
    height: 530,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(10),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 500,
      padding: theme.spacing(7),
    },
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  select: {
    minWidth: 230,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 316,
    },
  },
  personSelect: {
    minWidth: 570,
    maxWidth: 570,
    [theme.breakpoints.down('sm')]: {
      minWidth: 316,
      maxWidth: 316,
    },
  },
  gridItem: {
    margin: theme.spacing(3),
  },
  titleDiv: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  descriptionDiv: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    marginBottom: theme.spacing(2),
  },
  container: {
    marginTop: '50px',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  messagesGrid: {
    marginTop: theme.spacing(5),
  },
  mutualContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: '25px',
    padding: '15px',
  },
  sendIcon: {
    paddingLeft: '20px',
  },
  header: {
    textAlign: 'center',
  },
  deleteMsgIcon: {
    color: 'red',
    cursor: 'pointer',
  },
}));

export default useStyles;
