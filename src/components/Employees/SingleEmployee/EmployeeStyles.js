import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  card: {
    margin: '50px auto',
  },
  userImage: {
    display: 'block',
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px black',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
