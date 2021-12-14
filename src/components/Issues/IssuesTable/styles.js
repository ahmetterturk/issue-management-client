import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950,
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
}));

export default useStyles;
