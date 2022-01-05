import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useStyles } from './NavbarStyle';
import { useGlobalContext } from '../../contextReducer/Context';
import { useMediaQuery } from '@mui/material';
import DropDownIssues from './DropDownIssues';

const Navbar = (props) => {
  const { onMenuClick } = props;
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });
  const classes = useStyles({ isLargeScreen });
  const { state, disptach } = useGlobalContext();
  const { userDetails } = state.currentUser;
  const { issues } = state;

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
          <DropDownIssues />
          <span className={classes.userGreeting}>
            Hi{' '}
            {state.currentUser &&
              `${userDetails.firstName} ${userDetails.lastName}`}
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
