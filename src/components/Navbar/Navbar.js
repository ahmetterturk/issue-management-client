import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useStyles } from './NavbarStyle';
import { useGlobalContext } from '../../contextReducer/Context';

const Navbar = () => {
  const classes = useStyles();
  const { state } = useGlobalContext();
  const { userDetails } = state.currentUser;

  return (
    <>
      <Toolbar className={classes.navbar}>
        <span className={classes.userGreeting}>
          Hi {state.currentUser && userDetails.name}
        </span>
        <Box sx={{ flexGrow: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024"
          />
          {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
        </Box>
      </Toolbar>
    </>
  );
};

export default Navbar;
