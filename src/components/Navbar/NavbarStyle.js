import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: 'white',
    justifyContent: (props) =>
      props.isLargeScreen ? 'flex-end' : 'space-between',
  },
  avatarWrapper: { display: 'flex', alignItems: 'center' },
  userGreeting: {
    marginRight: '10px',
  },
}));
