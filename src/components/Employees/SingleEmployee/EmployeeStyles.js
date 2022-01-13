import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    margin: '50px auto',
    position: 'relative',
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
  backBtn: {
    textDecoration: 'none',
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    color: 'skyblue',
  },
  avatarBorder: {
    // border: 'solid 4px rgba(28, 121, 252, 0.4)',
  },
  employeeDetails: {
    // border: 'solid 4px rgba(255, 0, 89, 0.5)',
  },
  employeeTypo: {
    color: '#666',
  },
}));
