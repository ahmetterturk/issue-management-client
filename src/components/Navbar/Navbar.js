import * as React from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contextReducer/Context';
import { useStyles } from './NavbarStyle';
import { useNavigate } from 'react-router';
const Navbar = () => {
  const { state, disptach } = useGlobalContext();
  const { user } = state;
  const classes = useStyles();
  const navigate = useNavigate();
  // logout function
  const handleLogout = () => {
    // disptach({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };
  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <LockRoundedIcon />
        </Toolbar>
      </AppBar>
      {/* <Navbar /> */}
      <nav>
        {!user ? (
          <Link to='/login' className={classes.link}>
            Login
          </Link>
        ) : (
          <Link to='/login' onClick={handleLogout} className={classes.link}>
            Logout
          </Link>
        )}

        <Link to='/issuepage' className={classes.link}>
          Issue Page
        </Link>
        <Link to='/profile' className={classes.link}>
          Profile
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
