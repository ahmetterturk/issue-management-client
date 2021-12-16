import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StatusDropdown = ({ handleChange, status, name }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          name={name}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StatusDropdown;
