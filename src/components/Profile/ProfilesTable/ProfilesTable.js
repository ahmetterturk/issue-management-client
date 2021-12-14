import React, { useEffect } from 'react';
import { getProfiles } from '../../../apiServices/ProfileApi';
import { useGlobalContext } from '../../../contextReducer/Context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStyles from './Style';
import { Link } from 'react-router-dom';
import { Chip, TableFooter, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProfilesTable = ({ profilesList }) => {
  console.log(profilesList);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { state, dispatch } = useGlobalContext();
  useEffect(() => {
    getProfiles()
      .then((data) => dispatch({ type: 'GET_PROFILES', data: data }))
      .catch((error) => console.log(error));
  }, []);
  console.log(state.profiles);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant='h3' className={classes.employees} my={5}>
        Employees
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                Employee
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Hire Date
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Contact.N
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Emergency Contact
              </TableCell>
              <TableCell className={classes.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.profiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((profile) => (
                <TableRow key={profile._id}>
                  <TableCell>
                    <Stack direction='row' spacing={2}>
                      <Avatar
                        alt='Remy Sharp'
                        src='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                      />
                      <Link
                        className={classes.profileTitle}
                        to={`/profiles/${profile._id}`}
                      >
                        <Typography>{profile.fullName}</Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>Should add timestamps</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{profile.mobilePhone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{profile.emergencyContact}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={2}>
                      <DeleteIcon className={classes.deleteIcon} />
                      <EditIcon className={classes.editIcon} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={state.profiles.length}
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

export default ProfilesTable;
