import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme();

const useStyles = makeStyles(() => ({
  appWrapper: {
    display: 'flex',
    height: '100vh',
  },
  rightContent: {
    backgroundColor: '#E6E6E6',
    flex: 1,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: (props) => (props.isLoggedIn ? 226 : 0),
    },
  },
}));

export default useStyles;
