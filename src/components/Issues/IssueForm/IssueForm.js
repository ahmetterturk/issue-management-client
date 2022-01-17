import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGlobalContext } from '../../../contextReducer/Context';
import { createIssue } from '../../../apiServices/IssueApi';
import { useForm } from 'react-hook-form/dist/index.cjs';
import TypeDropdown from './TypeDropdown';
import PriorityDropdown from './PriorityDropdown';
import StatusDropdown from './StatusDropdown';
import MembersDropdown from './MembersDropdown';
import jwtdecode from 'jwt-decode';
import useStyles from './styles';
import {
  Box,
  Container,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

export const IssueFormView = ({ createIssue }) => {
  // destructuring state and dispatch function from context provider
  const { state, dispatch } = useGlobalContext();
  // using state and jwtdecode package to decode and use user data stored in the jwt token, stored in the local storage
  const { currentUser } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // destructured react-hook-forms functions to help with the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // mui specific modal functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // onSubmit function is used to create issues when the form is submitted. It uses the createIssue function to make a post request to the server with axios. That function is defined in the api functions
  const onSubmit = (data) => {
    data.userId = currentUser && decodedToken.id;
    data.userName =
      currentUser &&
      `${currentUser.userDetails.firstName} ${currentUser.userDetails.lastName}`;
    data.members = state.issueMembers !== [] && state.issueMembers;

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
      <Box>
        {currentUser.userDetails.image === null ? (
          <>
            <Typography variant='h5' sx={{ p: 2, color: '#666' }}>
              In order to publish ticket you need to create a profile first
            </Typography>
          </>
        ) : (
          <>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justify='flex-end'
            >
              <Grid
                item
                xs={12}
                lg={12}
                xl={12}
                sx={{ mt: 2, display: 'flex' }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleOpen}
                  xs={{ height: 40 }}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  New Issue
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className={classes.boxContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.titleDiv}>
                <TextField
                  {...register('title', { required: true })}
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
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
                  label='Description'
                  fullWidth
                />
                {errors.description && (
                  <p style={{ color: 'red' }}>Description can't be blank!</p>
                )}
              </div>
              <MembersDropdown name='members' className={classes.members} />

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
                type='submit'
                variant='contained'
                fullWidth
                disableElevation
                size='large'
              >
                Create Issue
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

const IssueForm = (props) => (
  <IssueFormView createIssue={createIssue} {...props}></IssueFormView>
);
export default IssueForm;
