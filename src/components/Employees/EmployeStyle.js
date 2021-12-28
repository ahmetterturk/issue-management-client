import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  tableContainer: {
    borderRadius: 15,
    margin: '10px auto',
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#E8E8E8',
    color: '#25282B',
  },
  userTitle: {
    textDecoration: 'none',
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
