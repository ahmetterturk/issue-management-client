import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  issuesGrid: {
    marginTop: theme.spacing(10),
    margin: '50px auto 0',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      // display: 'flex',
      // flexWrap: 'wrap',
      // justifyContent: 'center',
    },
  },
}));

export default useStyles;
