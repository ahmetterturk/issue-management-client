import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  bg: {
    backgroundColor: '#1c79fc',
    width: '100%',
    height: '78%',
    clipPath: 'ellipse(100% 55% at 46% 44%)',
    paddingTop: '100px',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: '10px',
    alignSelf: 'center',
    padding: '20px',
  },
  cardBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingBottom: '50px',
  },
}));
