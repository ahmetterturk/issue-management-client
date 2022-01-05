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
import { Typography, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useStyles from './styles';

const IssueForm = () => {
  const { state, dispatch } = useGlobalContext();
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);
  const classes = useStyles();

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
    data.userName =
      currentUser &&
      `${currentUser.userDetails.firstName} ${currentUser.userDetails.lastName}`;
    data.members = state.issueMembers !== [] && state.issueMembers;

    console.log(data);

    createIssue(data)
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((error) => console.log(error));
    setOpen(false);

    dispatch({ type: 'SET_ISSUE_MEMBERS', data: [] });
  };

  return (
    <>
      <div>
        {currentUser.userDetails.image === null ? (
          <Typography variant="p">
            In order to publish ticket you need to create a profile first
          </Typography>
        ) : (
          <Button
            onClick={handleOpen}
            color="primary"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            New Issue
          </Button>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.boxContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.titleDiv}>
                <TextField
                  {...register('title', { required: true })}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                />
                {errors.title && (
                  <p style={{ color: 'red' }}>Title can't be blank!</p>
                )}
              </div>
              <div className={classes.descriptionDiv}>
                <TextField
                  {...register('description', { required: true })}
                  multiline
                  rows={5}
                  maxRows={10}
                  label="Description"
                  fullWidth
                />
                {errors.description && (
                  <p style={{ color: 'red' }}>Description can't be blank!</p>
                )}
              </div>
              <MembersDropdown name="members" className={classes.members} />

              <Grid container className={classes.dropdownContainer}>
                <Grid item className={classes.gridItem}>
                  <TypeDropdown register={register} errors={errors} />
                </Grid>
                <Grid item className={classes.gridItem}>
                  <PriorityDropdown register={register} errors={errors} />
                </Grid>
                <Grid item className={classes.gridItem}>
                  <StatusDropdown register={register} errors={errors} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disableElevation
                size="large"
              >
                Create Issue
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default IssueForm;
