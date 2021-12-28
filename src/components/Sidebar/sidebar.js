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
import useStyles from './styles';
import { useGlobalContext } from '../../contextReducer/Context';

import logo from './logo2.png';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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
          <Icon sx={{ fontSize: '20px', color: 'lightgray' }} />
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
            color: 'lightgray',
            whiteSpace: 'nowrap',
            minWidth: '126px',
          }}
        />
      </ListItemButton>
    </Link>
  );
};

const Sidebar = () => {
  const { state, dispatch } = useGlobalContext();
  const classes = useStyles();
  const { token } = state.currentUser && state.currentUser;
  const decodedToken = jwtDecode(token);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.sidebarButtons}>
        <img
          alt='Product logo - Shield with check icon'
          className={classes.logo}
          src={logo}
        />
        <hr className='rounded' />
        <SidebarLink text='Dashboard' href='/dashboard' icon={GridViewIcon} />
        <SidebarLink
          text='Issues'
          href='/issues'
          icon={ReceiptLongRoundedIcon}
        />

        <SidebarLink
          text='Graphs'
          href='/graphs'
          icon={AssessmentOutlinedIcon}
        />
        <SidebarLink
          text='Employees'
          href='/employee'
          icon={PeopleOutlineIcon}
        />
        {state.currentUser && (
          <SidebarLink
            text='Profile'
            href={`/userProfile/${decodedToken.id}`}
            icon={ManageAccountsOutlinedIcon}
          />
        )}
        <SidebarLink
          text='Log out'
          href='/login'
          onClick={handleLogout}
          icon={MeetingRoomOutlinedIcon}
        />
      </Box>
      <Box className='footer'>
        <span>© Lock Security</span>
      </Box>
    </Box>
  );
};

export default Sidebar;
