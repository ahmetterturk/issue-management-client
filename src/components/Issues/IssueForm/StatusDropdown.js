import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';

const StatusDropdown = ({ register, errors }) => {
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
