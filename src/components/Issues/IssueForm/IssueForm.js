import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TypeDropdown from './TypeDropdown';
import PriorityDropdown from './PriorityDropdown';
import StatusDropdown from './StatusDropdown';
import MembersDropdown from './MembersDropdown';
import { useGlobalContext } from '../../../contextReducer/Context';
import { createIssue } from '../../../apiServices/IssueApi';
import { useForm } from 'react-hook-form/dist/index.cjs';
import jwtdecode from 'jwt-decode';
import { Typography } from '@mui/material';

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
  const { state, dispatch } = useGlobalContext();
  const { currentUser } = state;

  const { token } = currentUser;

  const decodedToken = jwtdecode(token);
  console.log(currentUser.userDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    data.userId = currentUser && decodedToken.id;
    data.userName = currentUser && decodedToken.name;

    createIssue(data)
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((error) => console.log(error));
    setOpen(false);
  };

  return (
    <>
      <div>
        {currentUser.userDetails.image === null ? (
          <Typography variant='p'>
            In order to publish ticket you need to create a profile first
          </Typography>
        ) : (
          <Button onClick={handleOpen}>New Issue</Button>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('title', { required: true })}
                id='outlined-basic'
                label='Title'
                variant='outlined'
              />
              {errors.title && (
                <p style={{ color: 'red' }}>Title can't be blank!</p>
              )}
              <TextField
                {...register('description', { required: true })}
                multiline
                rows={2}
                maxRows={4}
                label='Description'
              />
              {errors.description && (
                <p style={{ color: 'red' }}>Description can't be blank!</p>
              )}
              <TypeDropdown register={register} />
              {errors.type && (
                <p style={{ color: 'red' }}>Type can't be blank!</p>
              )}
              <PriorityDropdown register={register} />
              {errors.priority && (
                <p style={{ color: 'red' }}>Priority can't be blank!</p>
              )}
              <StatusDropdown register={register} />
              {errors.status && (
                <p style={{ color: 'red' }}>Status can't be blank!</p>
              )}
              {/* <MembersDropdown name="members" /> */}
              <input type='submit' value='Submit' />
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default IssueForm;
