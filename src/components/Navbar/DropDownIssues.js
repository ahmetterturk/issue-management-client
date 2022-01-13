import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useGlobalContext } from '../../contextReducer/Context';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SingleDropdownIssue from './SingleDropdownIssue';
import { Typography, Divider } from '@mui/material';

const DropDownIssues = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // getting state and disptahc from globalState
  const { state, dispatch } = useGlobalContext();
  // destructuring issues, assignedIssues and currentUser from state
  const { issues, assignedIssues, currentUser } = state;
  // destructuring userDetails from current user
  const { userDetails } = currentUser;

  // usign useEffect to create notification on navbar
  React.useEffect(() => {
    // first check if the currentUser exist
    if (currentUser) {
      // declaring new variable to create a new array by maping and filtering issues state
      const currentAssignedIssues = issues
        .map((issue) => {
          // issue model has members property, first check if memebrs includes userDetails firstName and lastName,
          if (
            issue.members.includes(
              `${userDetails.firstName} ${userDetails.lastName}`
            )
          ) {
            // if it does will return the condioned issue
            return issue;
          }
          // if it doesn't it will return the rest of issues as undefine, here will filter those are undefined
        })
        .filter((issue) => issue !== undefined);
      // using dispatch to set the currentAssignedIssues to the assignedIssue state in global state
      dispatch({ type: 'SET_ASSIGNED_ISSUES', data: currentAssignedIssues });
    }
    // using currentUser, issues, counter as a dependency to rerender the current useEffect if any of these state has new data
  }, [state.currentUser, state.issues, state.counter, dispatch]);

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
        {/* badge content will show the length of assignedIssues as a number of notification */}
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
          disablePadding: true,
        }}
      >
        <Divider />
        {/* here we check if assignedIssues state is exist and if the keys length bigger then 0 */}
        {assignedIssues && Object.keys(assignedIssues).length > 0 ? (
          // mapping through assignedIssues to show them in dropdown menu with link from react router dom to navigate to specific issues
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
                {/* in singleDropDown components we will show the issues to the currentUser if user has been assign to any */}
                <SingleDropdownIssue handleClose={handleClose} issue={issue} />
              </Link>
            );
          })
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography fontSize={18}>You have no new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default DropDownIssues;
