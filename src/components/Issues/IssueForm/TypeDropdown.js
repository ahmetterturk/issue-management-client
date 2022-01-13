import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';

// Dropdown select component for the type value of the issue, that is used in the issue create form
const TypeDropdown = ({ register, errors }) => {
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  return (
    <Box className={classes.individualSelectBox}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
          data-testid="Type"
          {...register('type', { required: true })}
        >
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
        {errors.type && <p style={{ color: 'red' }}>Type can't be blank!</p>}
      </FormControl>
    </Box>
  );
};

export default TypeDropdown;
