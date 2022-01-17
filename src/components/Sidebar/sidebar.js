import React from 'react';
import Box from '@mui/material/Box';
import GridViewIcon from '@mui/icons-material/GridView';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import { useGlobalContext } from '../../contextReducer/Context';
import { Drawer, useMediaQuery, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Component used to render individual links in the Sidebar
// They receive an href for redirection and a callback to close the sidebar
const SidebarLink = (props) => {
  const classes = useStyles();

  const Icon = props.icon;
  return (
    <Link className={classes.sidebarButtonLink} to={props.href}>
      <ListItemButton
        onClick={props.onClick}
        sx={{
          margin: '6px 14px',
          padding: '10px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#26284687',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: '45px' }}>
          <Icon sx={{ fontSize: '20px', color: '#E6E6E6' }} />
        </ListItemIcon>

        <ListItemText
          primary={props.text}
          primaryTypographyProps={{
            variant: 'body2',
          }}
          sx={{
            display: 'inline',
            margin: '4px',
            overflowX: 'hidden',
            color: 'white',
            whiteSpace: 'nowrap',
            minWidth: '126px',
          }}
        />
      </ListItemButton>
    </Link>
  );
};

// The main sidebar component. Its rendered within a drawer to provide an
// expanded / collapsed state on certain resolutions
const Sidebar = (props) => {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const { token } = state.currentUser && state.currentUser;
  const decodedToken = jwtDecode(token);
  // We use useMediaQuery to identify which breakpoint the user resolution lands in.
  // We'll use this value to know if the Drawer will need the collapse functionality or not
  // console.log(decodedToken.id);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  // logout function, it removes the session from the user through a dispatched action
  // and we redirect the user to the login
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  // The content of the drawer stays the same regardless of the resolution
  const drawerContent = (
    <Box className={classes.sidebar}>
      <Box className={classes.sidebarButtons}>
        <Avatar
          sx={{
            m: '50px auto',
            bgcolor: '#fff',
            color: '#1c79fc',
            padding: '20px',
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <hr className="rounded" />
        {decodedToken.isAdmin ? (
          <>
            <SidebarLink
              text="Dashboard"
              href="/dashboard"
              icon={GridViewIcon}
              onClick={onClose}
            />

            <SidebarLink
              text="Issues"
              href="/issues"
              icon={ReceiptLongRoundedIcon}
              onClick={onClose}
            />
            <SidebarLink
              text="Graphs"
              href="/graphs"
              icon={AssessmentOutlinedIcon}
              onClick={onClose}
            />
            <SidebarLink
              text="Employees"
              href="/employee"
              icon={PeopleOutlineIcon}
              onClick={onClose}
            />
            <SidebarLink
              text="Create Employee"
              href="/employeeSignup"
              icon={ManageAccountsIcon}
              onClick={onClose}
            />
            {state.currentUser && (
              <SidebarLink
                text="Profile"
                href={`/userProfile/${decodedToken.id}`}
                icon={ManageAccountsOutlinedIcon}
                onClick={onClose}
              />
            )}
            <SidebarLink
              text="Log out"
              href="/login"
              onClick={handleLogout}
              icon={MeetingRoomOutlinedIcon}
            />
          </>
        ) : (
          <>
            <SidebarLink
              text="Issues"
              href="/issues"
              icon={ReceiptLongRoundedIcon}
              onClick={onClose}
            />
            <SidebarLink
              text="Your Tickets"
              href={`/issues?userId=${decodedToken.id}`}
              icon={ReceiptLongRoundedIcon}
              onClick={onClose}
            />
            {state.currentUser && (
              <SidebarLink
                text="Profile"
                href={`/userProfile/${decodedToken.id}`}
                icon={ManageAccountsOutlinedIcon}
                onClick={onClose}
              />
            )}
            <SidebarLink
              text="Log out"
              href="/login"
              onClick={handleLogout}
              icon={MeetingRoomOutlinedIcon}
            />
          </>
        )}
      </Box>
      <Box className="footer" sx={{ textAlign: 'center', padding: '15px' }}>
        <span>© Lock Security</span>
      </Box>
    </Box>
  );

  // If the user is in a large screen we'll hardcode the drawer to always be open
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 226,
          },
        }}
        variant="persistent"
      >
        {drawerContent}
      </Drawer>
    );
  }

  // If the screen resolution is not large we'll configure the drawer to open / close depending
  // on the props passed down to the sidebar from the App component.
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={isOpen}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 226,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
