import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Chip, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';

const IssuesTable = ({ issuesList }) => {
  const classes = useStyles();

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
      <Typography variant="h3" align="center" className={classes.heading}>
        Tickets
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Issue</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
              <TableCell className={classes.tableHeaderCell}>Type</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Created By
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesList &&
              issuesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((issue) => (
                  <TableRow key={issue._id}>
                    <TableCell>
                      <Link className={classes.issueTitle} to={issue._id}>
                        <Typography>{issue.title}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={issue.status}
                        style={{
                          backgroundColor:
                            (issue.status === 'Pending' && '#007BF5') ||
                            (issue.status === 'New' && '#ED5500') ||
                            (issue.status === 'Resolved' && '#00CC8F'),
                          color: 'white',
                        }}
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography>{issue.type}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {issue.createdAt &&
                          moment(issue.createdAt).format('ll')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{issue.userName}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={issuesList && issuesList.length}
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

export default IssuesTable;
