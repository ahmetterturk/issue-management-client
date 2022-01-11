import React, { useState } from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import { useStyles } from './EmployeStyle';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwtdecode from 'jwt-decode';
import Errors from '../ErrorPages/Errors';
import unauthorizedImage from '../../images/unauthorized.jpg';
import loginImage from '../../images/login.jpg';
import { deleteUser } from '../../apiServices/UserApi';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import CircularProgress from '@mui/material/CircularProgress';
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

const EmployeeTable = () => {
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  if (!state.currentUser) {
    return (
      <Errors
        title="You need to login first"
        errorMessage="You cannot access the application unless you login first"
        route="/login"
        imageSrc={loginImage}
        btnMessage="Back to login page"
      />
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
      <Errors
        status="401"
        title="You are not authorized to access this page"
        errorMessage="You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation"
        route="/issues"
        imageSrc={unauthorizedImage}
        btnMessage="Back to login page"
      />
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (id) => {
    setIsFetching(true);
    deleteUser(id)
      .then((data) => {
        dispatch({ type: 'INCREASE_COUNTER' });
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {state.issuesIsLoading ? (
        <Grid container justifyContent="center" sx={{ marginTop: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid>
          <Typography
            variant="h3"
            align="center"
            className={classes.heading}
            sx={{ marginTop: '100px' }}
          >
            Employees
          </Typography>

          <Paper elevation={5} className={classes.tablePaper}>
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
            <TableContainer className={classes.tableContainer}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCell}>
                      Name
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Role
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Email
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Hire Date
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.currentUser &&
                    allUsers &&
                    allUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                              {user.isAdmin ? 'Admin' : 'Employee'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{user.email}</Typography>
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
                                <DeleteConfirmation
                                  entity="employee"
                                  handleDelete={() => handleDelete(user._id)}
                                  isFetching={isFetching}
                                />
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allUsers && allUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default EmployeeTable;
