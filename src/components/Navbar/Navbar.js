import * as React from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const Navbar = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <LockRoundedIcon />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
