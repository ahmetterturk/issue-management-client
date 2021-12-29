import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '50px',
  },
  mutualContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: '25px',
    margin: '50px 0',
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
