import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../contextReducer/Context';
import DeleteConfirmation from '../../DeleteConfirmation/DeleteConfirmation';
import { deleteIssue } from '../../../apiServices/IssueApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import jwtdecode from 'jwt-decode';
import useStyles from './styles';
import moment from 'moment';
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
} from '@mui/material';

// IssuesTable function is the main component that will be rendered
export const IssuesTableView = ({ issuesList, deleteIssue }) => {
  // destructuring state and dispatch function from context provider
  const { state, dispatch } = useGlobalContext();
  // defining a classes constant to use with styling of components
  const classes = useStyles();
  // using state and jwtdecode package to decode and use user data stored in the jwt token, stored in the local storage
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);
  // defining a constant to authenticate who can see only public issues and who can see all issues. If the current user is an admin, they can access all issues.
  const visibleIssues = decodedToken.isAdmin
    ? issuesList
    : issuesList.filter(
        (issue) => issue.type === 'Public' || issue.userId === decodedToken.id
      );

  // states used in table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  // state used to activate circular loading component
  const [isFetching, setIsFetching] = useState(false);

  // mui specific table functionality methods
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // the handleDelete function is called in the trash icon to delete issues, the deleteIssue function sends a delete request to the server via axios, that is defined in the the api functions
  // we are using a counter global state value to help with the rerendering of components on its increase.
  const handleDelete = (issueId) => {
    setIsFetching(true);
    deleteIssue(issueId)
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {state.issuesIsLoading ? (
        <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Paper elevation={5} className={classes.paper}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Issue
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Type
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Created By
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      sx={{ backgroundColor: '#E8E8E8' }}
                    >
                      <Typography fontWeight="bold" fontSize={18}>
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleIssues &&
                    visibleIssues
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .reverse()
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
                              <Link
                                className={classes.issueTitle}
                                to={issue._id}
                              >
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
                                  <DeleteConfirmation
                                    entity="issue"
                                    handleDelete={() => handleDelete(issue._id)}
                                    isFetching={isFetching}
                                  />
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
        </>
      )}
    </>
  );
};

const IssuesTable = (props) => (
  <IssuesTableView deleteIssue={deleteIssue} {...props}></IssuesTableView>
);
export default IssuesTable;
