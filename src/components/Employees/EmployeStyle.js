import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  tablePaper: {
    alignSelf: 'center',
    overflow: 'hidden',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    margin: '50px auto',
    [theme.breakpoints.down('sm')]: {
      width: 375,
      margin: '75px auto',
      marginBottom: theme.spacing(6),
    },
  },
  tableContainer: {
    // borderRadius: 15,
    maxWidth: '100%',
    ['@media (max-width:780px)']: {
      maxWidth: 950,
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#E8E8E8',
    color: '#25282B',
  },
  userTitle: {
    textDecoration: 'none',
    color: '#555',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  avatarIcon: {
    marginRight: '5px',
  },
  editIcon: {
    color: '#666',
    cursor: 'pointer',
  },
  deleteIcon: {
    color: 'red',
    cursor: 'pointer',
  },
  tablePagination: {
    content: '',
    width: '100%',
    display: 'inline-block',
  },
  heading: {
    color: '#6787E3',
  },
}));
