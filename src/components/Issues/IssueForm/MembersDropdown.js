import * as React from 'react';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

// mui specific constants
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

// mui specific function
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MembersDropdown = () => {
  const theme = useTheme();
  // state used to organize dropdown data
  const [personName, setPersonName] = React.useState([]);
  // destructuring state and dispatch function from context provider
  const { state, dispatch } = useGlobalContext();
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // defining a users constant to assign the names and ids of every user in the database
  const users = state.users.allUsers.map((user) => [
    `${user.firstName} ${user.lastName}`,
    user._id,
  ]);

  // handle change function to set state on dropdown action change
  const handleChange = (event) => {
    setPersonName(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
    dispatch({ type: 'SET_ISSUE_MEMBERS', data: event.target.value });
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

export default MembersDropdown;
