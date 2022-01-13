import React, { useState, useEffect } from 'react';
import { updateIssue } from '../../apiServices/IssueApi';
import { useGlobalContext } from '../../contextReducer/Context';
import useStyles from './styles';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Grid,
  Modal,
  Button,
  Box,
} from '@mui/material';

export const IssueEditFormView = ({ issue, id, updateIssue }) => {
  // state values necessary for the component
  const [hasError, setHasError] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageDesc, setErrorMessageDesc] = useState('');
  // modal open and close handler methods
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // getting the dispatch function from context provider
  const { dispatch } = useGlobalContext();
  // defining a classes constant to use with styling of components
  const classes = useStyles();

  // constant defined to initially store the values of the current issue being viewed
  const data = {
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
    status: issue.status,
    type: issue.type,
    userId: issue.userId,
    userName: issue.userName,
  };

  // state that is set to issue values
  const [issueData, setIssueData] = useState(data);

  // useEffect hook used to update the issueData state, as the issue being passed on from the parent component has a value of null on first render
  useEffect(() => {
    setIssueData(data);
  }, [issue]);

  // handlechange method
  const handleChange = (event) => {
    setIssueData({
      ...issueData,
      [event.target.name]: event.target.value,
    });
  };

  // handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault();
    // validations
    if (event.target.elements.title.value === '') {
      setHasError(true);
      setErrorMessageTitle("Title can't be blank");
    } else if (event.target.elements.description.textContent === '') {
      setHasError(false);
      setHasError(true);
      setErrorMessageDesc("Description can't be blank");
    } else {
      setHasError(false);
      // 'updateIssue()' function is defined in the api services and uses axios make a patch request
      updateIssue(id, { ...issueData })
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
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="contained"
        size="small"
      >
        Edit Issue
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ boxShadow: 24 }} className={classes.boxContainer}>
          <form onSubmit={handleSubmit}>
            <div className={classes.titleDiv}>
              <TextField
                value={issueData.title}
                name="title"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
              {hasError && (
                <span style={{ color: 'red' }}>{errorMessageTitle}</span>
              )}
            </div>

            <div className={classes.descriptionDiv}>
              <TextField
                className={classes.description}
                value={issueData.description}
                name="description"
                multiline
                rows={5}
                label="Description"
                onChange={handleChange}
                fullWidth
              />
              {hasError && (
                <span style={{ color: 'red' }}>{errorMessageDesc}</span>
              )}
            </div>
            <Grid container className={classes.dropdownContainer}>
              <Grid item className={classes.gridItem}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    value={issueData.type}
                    name="type"
                    onChange={handleChange}
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    value={issueData.status}
                    name="status"
                    onChange={handleChange}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    value={issueData.priority}
                    name="priority"
                    onChange={handleChange}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              size="large"
            >
              Update Issue
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

const IssueEditForm = (props) => {
  return (
    <IssueEditFormView {...props} updateIssue={updateIssue}></IssueEditFormView>
  );
};

export default IssueEditForm;
