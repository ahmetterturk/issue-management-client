import React, { useEffect } from 'react';
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
} from '@mui/material';
import { useStyles } from './EmployeStyle';
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const {
    users: { allUsers },
  } = state;
  console.log(allUsers);

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
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
              <TableCell className={classes.tableHeaderCell}>Type</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Created By
              </TableCell>
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
                        <Typography>{user.name}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography>{user.type}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {user.createdAt && user.createdAt.slice(0, 10)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{user.userName}</Typography>
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
