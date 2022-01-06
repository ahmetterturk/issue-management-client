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
  Typography,
  TablePagination,
  Avatar,
  Alert,
  Stack,
  Grid,
} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useStyles } from './EmployeStyle';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwtdecode from 'jwt-decode';

const EmployeeTable = () => {
  const { state } = useGlobalContext();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  if (!state.currentUser) {
    return (
      <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
        You need to login first
        <Link to='/login' className={classes.link}>
          Log In
        </Link>
      </h1>
    );
  }
  const {
    users: { allUsers },
  } = state;

  const {
    currentUser: { token },
  } = state;
  const decodedToken = jwtdecode(token);
  const { isAdmin } = decodedToken;

  if (!isAdmin) {
    return (
      <>
        <h1 style={{ marginTop: '100px' }}>
          You are not authorized to visit this page
        </h1>
        <Link
          to='/issues'
          style={{
            display: 'inline-block',
            color: '#3489eb',
            marginLeft: '5px',
          }}
        >
          Back to Main page
        </Link>
      </>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid item xs={10} sx={{ margin: '70px auto 0' }} justifyContent='center'>
        {state.isUpdated ||
          (state.isCreated && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={state.isUpdated ? 'warning' : 'success'}>
                {state.isUpdated &&
                  'You have updated your profile successfully'}
                {state.isCreated &&
                  'You have created a new account successfully'}
              </Alert>
            </Stack>
          ))}

        <Typography variant='h3' align='center' className={classes.heading}>
          Employees
        </Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label='simple table'>
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
                          <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {allUsers && moment(user.createdAt).format('LL')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {(decodedToken.id === user._id ||
                          decodedToken.isAdmin) && (
                          <>
                            <Link to={user._id}>
                              <DeleteForeverSharpIcon
                                className={classes.deleteIcon}
                              />
                            </Link>
                          </>
                        )}
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
      </Grid>
    </>
  );
};

export default EmployeeTable;
