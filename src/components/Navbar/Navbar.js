import * as React from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contextReducer/Context';
import { useStyles } from './NavbarStyle';

const Navbar = () => {
  const { state, dispatch } = useGlobalContext();
  const { user } = state;
  const classes = useStyles();

  // logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CURRENT_PROFILE', data: null });
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <LockRoundedIcon />
        </Toolbar>
      </AppBar>
      {/* <Navbar /> */}
      <nav>
        {!user ? (
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        ) : (
          <Link to="/login" onClick={handleLogout} className={classes.link}>
            Logout
          </Link>
        )}

        <Link to="/issues" className={classes.link}>
          Issues
        </Link>
        <Link to="/profile" className={classes.link}>
          Create Profile
        </Link>
        <Link to="/profiles" className={classes.link}>
          Profiles
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
