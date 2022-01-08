import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },

  border: (props) => ({
    border: '3px solid',
    borderColor: props.borderColor,
    height: props.height,
    cursor: props.cursor,
  }),
}));
