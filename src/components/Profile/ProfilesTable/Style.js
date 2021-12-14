import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  employees: {
    color: '#6787E3',
    textAlign: 'center',
  },
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
  profileTitle: {
    textDecoration: 'none',
    color: '#555',
    cursor: 'pointer',
  },
  deleteIcon: {
    color: 'red',
  },
  editIcon: {
    color: '#555',
  },
  tablePagination: {
    content: '',
    width: '100%',
    display: 'inline-block',
  },
}));

export default useStyles;
