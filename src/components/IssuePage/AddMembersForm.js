import React, { useState, useEffect } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { updateIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import useStyles from './styles';

const AddMembersForm = ({ issue, id }) => {
  // mui methods to handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // getting dispatch function and state from context provider
  const { dispatch, state } = useGlobalContext();
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // initial state constant values of the currently viewed issue
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

  // state that is set to issue values
  const [issueData, setIssueData] = useState(data);

  // useEffect hook used to update the issueData state, as the issue being passed on from the parent component has a value of null on first render
  useEffect(() => {
    setIssueData(data);
  }, [issue]);

  // handleSubmit function that is used to only update mambers of an issue
  const handleSubmit = (event) => {
    event.preventDefault();
    // 'updateIssue()' function is defined in the api services and uses axios make a patch request
    updateIssue(id, { ...issueData, members: state.issueUpdateMembers })
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
        dispatch({ type: 'SET_ISSUE_UPDATE_MEMBERS', data: [] });
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="contained"
        size="small"
        sx={{ marginTop: 3 }}
      >
        Add Members
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ boxShadow: 24 }} className={classes.membersBoxContainer}>
          <form onSubmit={handleSubmit}>
            <MembersUpdateDropdown
              className={classes.members}
              name="members"
              issueData={issueData}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              size="large"
            >
              Update Members
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddMembersForm;
