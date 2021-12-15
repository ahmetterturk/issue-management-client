import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PriorityDropdown = ({ handleChange, priority, name }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Status"
          onChange={handleChange}
          name={name}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriorityDropdown;
