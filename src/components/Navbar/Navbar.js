import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './NavbarStyle';
import { useGlobalContext } from '../../contextReducer/Context';
import { useMediaQuery } from '@mui/material';
import DropDownIssues from './DropDownIssues';

const Navbar = (props) => {
  const { onMenuClick } = props;
  // isLarge screent will check if them breakuppoints is in lg size if it is set the properties to false
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });
  // using classes from useStyle that we made with makeStyles from mui
  const classes = useStyles({ isLargeScreen });
  // getting state from globalcontext
  const { state } = useGlobalContext();
  // destructuring the userDetails from state currentUser
  const { userDetails } = state.currentUser;

  const menuIcon = (
    <IconButton
      onClick={onMenuClick}
      edge='start'
      sx={{
        display: {
          xs: 'inline-flex',
          lg: 'none',
        },
      }}
    >
      <MenuIcon fontSize='small' />
    </IconButton>
  );

  return (
    <AppBar>
      <Toolbar className={classes.navbar}>
        {!isLargeScreen && menuIcon}
        <Box className={classes.avatarWrapper}>
          {/* rendering the dropDown issues in AppBar */}
          <DropDownIssues />
          <span className={classes.userGreeting}>
            Hi{' '}
            {state.currentUser &&
              `${userDetails.firstName} ${userDetails.lastName}`}
          </span>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt='Remy Sharp'
              src={state.currentUser && userDetails.image}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
