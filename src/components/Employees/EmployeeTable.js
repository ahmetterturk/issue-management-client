import React, { useState } from 'react';
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
import Errors from '../ErrorPages/Errors';
import unauthorizedImage from '../../images/unauthorized.jpg';
import loginImage from '../../images/login.jpg';
import { deleteUser } from '../../apiServices/UserApi';
import DeleteIssueConfirmation from '../Issues/IssuesTable/DeleteIssueConfirmation';

const EmployeeTable = () => {
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
      <Grid
        item
        xs={10}
        sx={{ margin: '100px auto 0' }}
        justifyContent='center'
      >
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
                            <DeleteIssueConfirmation
                              handleDelete={() => handleDelete(user._id)}
                              isFetching={isFetching}
                            />
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
