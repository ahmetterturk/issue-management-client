import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { updateIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from '@mui/material';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormHelperText,
//   Link,
//   TextField,
//   Typography,
// } from '@mui/material';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const IssueEditForm = ({ issue, id }) => {
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageDesc, setErrorMessageDesc] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { dispatch, state } = useGlobalContext();

  const data = {
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
    status: issue.status,
    type: issue.type,
    userId: issue.userId,
    userName: issue.userName,
    members: issue.members,
  };

  const [issueData, setIssueData] = useState(data);

  useEffect(() => {
    setIssueData(data);
  }, [issue]);

  const handleChange = (event) => {
    setIssueData({
      ...issueData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value === '') {
      setHasError(true);
      setErrorMessageTitle("Title can't be blank");
    } else if (event.target[2].textContent === '') {
      setHasError(false);
      setHasError(true);
      setErrorMessageDesc("Description can't be blank");
    } else {
      setHasError(false);
      updateIssue(id, { ...issueData, members: state.issueUpdateMembers })
        .then(() => {
          dispatch({ type: 'INCREASE_COUNTER' });
          dispatch({ type: 'SET_ISSUE_UPDATE_MEMBERS', data: [] });
        })
        .catch((error) => {
          console.log(error);
        });
      handleClose();
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        color='primary'
        variant='contained'
        startIcon={<EditIcon />}
      >
        Edit Issue
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={issueData.title}
              name='title'
              id='outlined-basic'
              label='Title'
              variant='outlined'
              onChange={handleChange}
            />
            {hasError && (
              <span style={{ color: 'red' }}>{errorMessageTitle}</span>
            )}
            <TextField
              value={issueData.description}
              name='description'
              multiline
              rows={2}
              maxRows={4}
              label='Description'
              onChange={handleChange}
            />
            {hasError && (
              <span style={{ color: 'red' }}>{errorMessageDesc}</span>
            )}
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Type'
                value={issueData.type}
                name='type'
                onChange={handleChange}
              >
                <MenuItem value='Public'>Public</MenuItem>
                <MenuItem value='Private'>Private</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Status'
                value={issueData.status}
                name='status'
                onChange={handleChange}
              >
                <MenuItem value='New'>New</MenuItem>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Resolved'>Resolved</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Status'
                value={issueData.priority}
                name='priority'
                onChange={handleChange}
              >
                <MenuItem value='Low'>Low</MenuItem>
                <MenuItem value='High'>High</MenuItem>
              </Select>
              <MembersUpdateDropdown name='members' issueData={issueData} />
            </FormControl>
            <input type='submit' value='Update Issue' />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default IssueEditForm;
