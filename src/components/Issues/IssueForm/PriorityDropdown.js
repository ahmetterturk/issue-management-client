import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';

const PriorityDropdown = ({ register, errors }) => {
  const classes = useStyles();

  return (
    <Box className={classes.individualSelectBox}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
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
