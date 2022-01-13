import React from 'react';
import Box from '@mui/material/Box';
import useStyles from './styles';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// Dropdown select component for the priority value of the issue, that is used in the issue create form
const PriorityDropdown = ({ register, errors }) => {
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  return (
    <Box className={classes.individualSelectBox}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Priority"
          data-testid="Priority"
          {...register('priority', { required: true })}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
        {errors.priority && (
          <p style={{ color: 'red' }}>Priority can't be blank!</p>
        )}
      </FormControl>
    </Box>
  );
};

export default PriorityDropdown;
