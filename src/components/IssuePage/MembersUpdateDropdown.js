import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useGlobalContext } from '../../contextReducer/Context';
import useStyles from './styles';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

// custom mui configurations
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// custom mui configurations
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MembersUpdateDropdown = ({ issueData, name }) => {
  const theme = useTheme();
  // getting state and dispatch functions from context provider
  const { state, dispatch } = useGlobalContext();
  // state value to set names for form
  const [personName, setPersonName] = React.useState(issueData.members);
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // defining a users constant that has all the user's name and id information
  const users = state.users.allUsers.map((user) => [
    `${user.firstName} ${user.lastName}`,
    user._id,
  ]);

  // onchange handler method to set issue members to form input
  const handleChange = (event) => {
    setPersonName(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
    dispatch({ type: 'SET_ISSUE_UPDATE_MEMBERS', data: event.target.value });
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          name={name}
          className={classes.personSelect}
        >
          {users.map((user) => (
            <MenuItem
              key={user[1]}
              value={user[0]}
              style={getStyles(user, personName, theme)}
            >
              {user[0]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MembersUpdateDropdown;
