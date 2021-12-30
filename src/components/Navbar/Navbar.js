import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useStyles } from './NavbarStyle';
import { useGlobalContext } from '../../contextReducer/Context';
import { useMediaQuery } from '@mui/material';

const Navbar = (props) => {
  const { onMenuClick } = props;
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });
  const classes = useStyles({ isLargeScreen });
  const { state } = useGlobalContext();
  const { userDetails } = state.currentUser;

  const menuIcon = (
    <IconButton
      onClick={onMenuClick}
      edge="start"
      sx={{
        display: {
          xs: 'inline-flex',
          lg: 'none',
        },
      }}
    >
      <MenuIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Toolbar className={classes.navbar}>
        {!isLargeScreen && menuIcon}
        <Box className={classes.avatarWrapper}>
          <span className={classes.userGreeting}>
            Hi {state.currentUser && userDetails.name}
          </span>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={state.currentUser && userDetails.image}
            />
          </Box>
        </Box>
      </Toolbar>
    </>
  );
};

export default Navbar;
