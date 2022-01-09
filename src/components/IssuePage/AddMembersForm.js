import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { updateIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import useStyles from './styles';

const AddMembersForm = ({ issue, id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { dispatch, state } = useGlobalContext();
  const classes = useStyles();

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
