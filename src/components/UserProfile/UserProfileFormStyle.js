import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  heading: {
    paddingBottom: '15px',
    color: '#6787E3',
  },
  profileForm: {
    ['@media (max-width:780px)']: {
      padding: '5px',
    },
  },
  card: {
    border: '1px solid lightgrey',
    borderBottom: 'none',
    maxWidth: '600px',
    margin: '10px auto',
    ['@media (max-width:780px)']: {
      maxWidth: 370,
    },
  },
  icon: {
    color: '#6787E3',
  },
  button: {
    background: '#6787E3',
  },
  error: {
    padding: '0 5px',
    fontSize: '10px',
    color: 'red',
  },
}));
