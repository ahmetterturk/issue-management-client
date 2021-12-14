import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  employeeContainer: {
    maring: '10px auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: '10px',
  },
}));

export default useStyles;
