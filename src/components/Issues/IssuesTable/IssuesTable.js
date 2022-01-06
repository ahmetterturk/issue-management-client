import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGlobalContext } from '../../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import DeleteIssueConfirmation from './DeleteIssueConfirmation';
import useStyles from './styles';

const IssuesTable = ({ issuesList }) => {
  const { state } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Issue</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
              <TableCell className={classes.tableHeaderCell}>Type</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Created By
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesList &&
              issuesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((issue) => {
                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={issue._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell className={classes.tableCell}>
                        <Link className={classes.issueTitle} to={issue._id}>
                          <Typography>{issue.title}</Typography>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography
                          style={{
                            color:
                              (issue.status === 'Pending' && '#007BF5') ||
                              (issue.status === 'New' && '#ED5500') ||
                              (issue.status === 'Resolved' && '#00CC8F'),
                          }}
                        >
                          {issue.status}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography>{issue.type}</Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography>
                          {issue.createdAt &&
                            moment(issue.createdAt).format('ll')}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography>{issue.userName}</Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Grid className={classes.icons}>
                          <Link
                            className={classes.visibilityIcon}
                            to={issue._id}
                          >
                            <VisibilityIcon />
                          </Link>
                          {(decodedToken.id === issue.userId ||
                            decodedToken.isAdmin) && (
                            <DeleteIssueConfirmation issueId={issue._id} />
                          )}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={issuesList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.tablePagination}
      />
    </Paper>
  );
};

export default IssuesTable;
