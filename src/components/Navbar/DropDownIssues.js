import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useGlobalContext } from '../../contextReducer/Context';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const DropDownIssues = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { state, dispatch } = useGlobalContext();
  const { userDetails } = state.currentUser;
  const { issues, assignedIssues } = state;
  // const [assignedIssues, setAssignedIssues] = React.useState([]);

  React.useEffect(() => {
    if (state.currentUser) {
      const currentAssignedIssues = issues
        .map((issue) => {
          if (
            issue.members.includes(
              `${userDetails.firstName} ${userDetails.lastName}`
            )
          ) {
            return issue;
          }
        })
        .filter((issue) => issue !== undefined);
      dispatch({ type: 'SET_ASSIGNED_ISSUES', data: currentAssignedIssues });
    }
  }, [state.currentUser, state.issues, state.counter]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={assignedIssues.length} color='secondary'>
          <NotificationsIcon color='action' />
        </Badge>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {assignedIssues &&
          assignedIssues.map((issue) => {
            return (
              <Link
                key={issue._id}
                to={`/issues/${issue._id}`}
                style={{
                  textDecoration: 'none',
                  color: '#555',
                }}
              >
                <MenuItem onClick={handleClose}>{issue.title}</MenuItem>
              </Link>
            );
          })}
      </Menu>
    </div>
  );
};

export default DropDownIssues;
