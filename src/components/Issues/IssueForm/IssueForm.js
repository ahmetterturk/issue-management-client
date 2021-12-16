import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TypeDropdown from './TypeDropdown/TypeDropdown';
import PriorityDropdown from './PriorityDropdown/PriorityDropdown';
import StatusDropdown from './StatusDropdown/StatusDropdown';
import MembersDropdown from './MembersDropdown/MembersDropdown';
import { useGlobalContext } from '../../../contextReducer/Context';
import { createIssue } from '../../../apiServices/IssueApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const IssueForm = () => {
  const { state } = useGlobalContext();
  const { user } = state;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const currentDate = new Date().toISOString().split('T')[0];
  // console.log(currentDate);

  const initialState = {
    title: '',
    description: '',
    type: '',
    priority: '',
    status: '',
    names: [],
    userId: user && state.user.uid,
  };

  const [inputData, setInputData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputData);

    createIssue(inputData)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    window.location.reload();
  };

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });

    console.log(inputData);
  };

  return (
    <>
      {state.userProfile && (
        <div>
          <Button onClick={handleOpen}>New Issue</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit}>
                <TextField
                  value={inputData.title}
                  onChange={handleChange}
                  name='title'
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
                />
                <TextField
                  value={inputData.description}
                  onChange={handleChange}
                  name='description'
                  multiline
                  rows={2}
                  maxRows={4}
                  label='Description'
                />
                <TypeDropdown
                  type={inputData.type}
                  handleChange={handleChange}
                  name={'type'}
                />
                <PriorityDropdown
                  priority={inputData.priority}
                  handleChange={handleChange}
                  name={'priority'}
                />
                <StatusDropdown
                  status={inputData.status}
                  handleChange={handleChange}
                  name={'status'}
                />
                {/* <MembersDropdown name="members" /> */}
                <input type='submit' value='Submit' />
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default IssueForm;
