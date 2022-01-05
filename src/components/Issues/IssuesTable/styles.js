import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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
  issueTitle: {
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

export default useStyles;
