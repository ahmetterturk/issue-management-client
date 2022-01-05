import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  tableContainer: {
    borderRadius: 15,
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
    paddingBottom: '15px',
    color: '#6787E3',
  },
}));
