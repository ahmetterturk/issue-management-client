import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  TablePagination,
  Avatar,
} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import { useStyles } from './EmployeStyle';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
const EmployeeTable = () => {
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const {
    users: { allUsers },
  } = state;
  console.log(allUsers);
  const { id } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant='h3' align='center' className={classes.heading}>
        Tickets
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Hire Date
              </TableCell>
              <TableCell className={classes.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.currentUser &&
              allUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Link className={classes.userTitle} to={user._id}>
                        <Avatar
                          src={user.imageUrl}
                          className={classes.avatarIcon}
                        />
                        <Typography>{user.name}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {allUsers && moment(user.createdAt).format('LL')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link to={user._id}>
                        <ModeEditOutlineSharpIcon
                          className={classes.editIcon}
                        />
                      </Link>
                      <Link to={user._id}>
                        <DeleteForeverSharpIcon
                          className={classes.deleteIcon}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={allUsers && allUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;
