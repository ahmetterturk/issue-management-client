import React from 'react';
// import { getProfiles } from '../../../apiServices/ProfileApi';
import { useGlobalContext } from '../../../contextReducer/Context';
import useStyles from './Style';
import { Link } from 'react-router-dom';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Stack,
  Paper,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProfilesTable = ({ profilesList }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { state, dispatch } = useGlobalContext();

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
                      <Avatar alt='Remy Sharp' src={profile.image} />
                      <Link
                        className={classes.profileTitle}
                        to={`/profiles/${profile._id}`}
                      >
                        <Typography>{profile.fullName}</Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {profile.createdAt && profile.createdAt.slice(0, 10)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{profile.mobilePhone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{profile.emergencyContact}</Typography>
                  </TableCell>
                  <TableCell>
                    {state.userProfile && (
                      <Stack direction='row' spacing={2}>
                        <DeleteIcon className={classes.deleteIcon} />
                        <EditIcon className={classes.editIcon} />
                      </Stack>
                    )}
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
