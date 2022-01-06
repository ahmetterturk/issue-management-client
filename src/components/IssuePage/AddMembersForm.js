import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { updateIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import EditIcon from '@mui/icons-material/Edit';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Grid,
} from '@mui/material';
import useStyles from './styles';

const AddMembersForm = ({ issue, id }) => {
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageDesc, setErrorMessageDesc] = useState('');
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

  const handleChange = (event) => {
    setIssueData({
      ...issueData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (event.target[0].value === '') {
    //   setHasError(true);
    //   setErrorMessageTitle("Title can't be blank");
    // } else if (event.target[2].textContent === '') {
    //   setHasError(false);
    //   setHasError(true);
    //   setErrorMessageDesc("Description can't be blank");
    // } else {
    //   setHasError(false);
    updateIssue(id, { ...issueData, members: state.issueUpdateMembers })
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
        dispatch({ type: 'SET_ISSUE_UPDATE_MEMBERS', data: [] });
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    // }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="contained"
        size="small"
      >
        Add Members
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ boxShadow: 24 }} className={classes.boxContainer}>
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
