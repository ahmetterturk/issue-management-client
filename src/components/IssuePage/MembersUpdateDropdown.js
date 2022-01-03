import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGlobalContext } from '../../contextReducer/Context';

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
  const { state, dispatch } = useGlobalContext();
  const [personName, setPersonName] = React.useState(issueData.members);

  const users = state.users.allUsers.map((user) => [
    `${user.firstName} ${user.lastName}`,
    user._id,
  ]);

  // console.log(users);

  const handleChange = (event) => {
    setPersonName(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
    dispatch({ type: 'SET_ISSUE_UPDATE_MEMBERS', data: event.target.value });
    // console.log(personName);
    // console.log(state.issueUpdateMembers);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
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
