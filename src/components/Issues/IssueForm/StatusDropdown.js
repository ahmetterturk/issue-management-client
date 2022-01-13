import React from 'react';
import useStyles from './styles';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// Dropdown select component for the status value of the issue, that is used in the issue create form
const StatusDropdown = ({ register, errors }) => {
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  return (
    <Box className={classes.individualSelectBox}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          data-testid="Status"
          {...register('status', { required: true })}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </Select>
        {errors.status && (
          <p style={{ color: 'red' }}>Status can't be blank!</p>
        )}
      </FormControl>
    </Box>
  );
};

export default StatusDropdown;
