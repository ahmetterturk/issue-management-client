import { MenuItem, Typography, Grid, Divider } from '@mui/material';
import React from 'react';
import moment from 'moment';

const SingleDropdownIssue = ({ issue, handleClose }) => {
  return (
    <MenuItem
      onClick={handleClose}
      sx={{ borderBottom: '1px solid #d4d4d4', padding: 2 }}
    >
      <Grid>
        <Typography
          sx={{ marginTop: 1, marginBottom: 1 }}
          fontSize={17}
          color='#003061'
        >
          {issue.title}
        </Typography>
        <Typography color='text.secondary' fontSize={14}>
          {moment(issue.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
      </Grid>
    </MenuItem>
  );
};

export default SingleDropdownIssue;
