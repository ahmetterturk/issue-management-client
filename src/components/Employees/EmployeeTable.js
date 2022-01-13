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

export const EmployeeTableView = ({ deleteUser }) => {
  // getting state and dispatch from globalState
  const { state, dispatch } = useGlobalContext();
  // declare classes var to assign useStyles to use custom css from makeStyles mui
  const classes = useStyles();
  // set state for pages in table
  const [page, setPage] = useState(0);
  // set state to set it to true while request is fetching
  const [isFetching, setIsFetching] = useState(false);
  // set state to row per page to show 10 row for each page of table
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // check if currentUser does not exist and if users try to access any routes from url without signningin show them error page and navigate them to login page
  if (!state.currentUser) {
    return (
      <Errors
        title='You need to login first'
        errorMessage='You cannot access the application unless you login first'
        route='/login'
        imageSrc={loginImage}
        btnMessage='Back to login page'
      />
    );
  }
  // destructuring allUsers state from users state
  const {
    users: { allUsers },
  } = state;
  // destructuring token from currentUser state
  const {
    currentUser: { token },
  } = state;
  // decoding the token with jwtDeocde to get token properties
  const decodedToken = jwtdecode(token);
  // destructuring isAdmin from decodedToken
  const { isAdmin } = decodedToken;
  // check if the currentUser is not admin render 401 error page to show error message of unauthorized, if any user try to acceess unauthorized routes
  if (!isAdmin) {
    return (
      <Errors
        status='401'
        title='You are not authorized to access this page'
        errorMessage='You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation'
        route='/issues'
        imageSrc={unauthorizedImage}
        btnMessage='Back to login page'
      />
    );
  }
  // handleChangePage function will set newPage on page state on onClick event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // handleChangeRowsPerPage function will set row on table onClick event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // handleDelete function will delete any user on table if admin choose to do so
  const handleDelete = (id) => {
    // set isFetching to true to show the spinner while making delete request
    setIsFetching(true);
    // calling the deleteUser from userApi services and passing the id of user on the table
    deleteUser(id)
      .then((data) => {
        // using dispathc to increase the counter state which is been used as a dependency on useEffect in App comp for get allUsers, it will rerender the table again with new data
        dispatch({ type: 'INCREASE_COUNTER' });
        // set isFetching to false to stop rendering spinner
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {state.issuesIsLoading ? (
        <Grid container justifyContent='center' sx={{ marginTop: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid>
          <Typography
            variant='h3'
            align='center'
            className={classes.heading}
            sx={{ marginTop: '100px' }}
          >
            Employees
          </Typography>

          <Paper elevation={5} className={classes.tablePaper}>
            {/* check if isUpdated or isCreated state true, to show the success message regarding user's action  */}
            {(state.isUpdated || state.isCreated) && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={'success'}>
                  {state.isUpdated &&
                    'You have updated your profile successfully'}
                  {state.isCreated &&
                    'You have created a new account successfully'}
                </Alert>
              </Stack>
            )}
            <TableContainer className={classes.tableContainer}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography fontWeight='bold' fontSize={18}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography fontWeight='bold' fontSize={18}>
                        Role
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography fontWeight='bold' fontSize={18}>
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography fontWeight='bold' fontSize={18}>
                        Hire Date
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      <Typography fontWeight='bold' fontSize={18}>
                        Actions
                      </Typography>
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
                            {/* check if current user id and user.id from allUsers are the same or current user is admin, give permission to user to delete specific user/employee from table of content  */}
                            {(decodedToken.id === user._id ||
                              decodedToken.isAdmin) && (
                              <>
                                <DeleteConfirmation
                                  entity='employee'
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
              component='div'
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

const EmployeeTable = (props) => (
  <EmployeeTableView deleteUser={deleteUser} {...props}></EmployeeTableView>
);
export default EmployeeTable;
