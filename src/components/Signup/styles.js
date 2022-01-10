import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  heading: {
    paddingBottom: '15px',
    color: '#6787E3',
  },
  card: {
    maxWidth: '600px',
    margin: '10px auto',
    border: '4px solid',
    borderColor: 'rgba(28, 121, 252, 0.4)',
    padding: '20px 10px 0 10px',
  },
  icon: {
    color: '#6787E3',
  },

  error: {
    padding: '0 5px',
    fontSize: '10px',
    color: 'red',
  },
}));
