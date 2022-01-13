// styling page that is used to style entities in the IssuesTable component
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      width: 375,
      marginBottom: theme.spacing(6),
    },
  },
  issuesGrid: {
    display: 'flex',
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
  issueTitle: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#0046bf',
    },
  },
}));

export default useStyles;
