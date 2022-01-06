import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { deleteIssue } from '../../../apiServices/IssueApi';
import { useGlobalContext } from '../../../contextReducer/Context';
import useStyles from './styles';

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

const DeleteIssueConfirmation = ({ issueId }) => {
  const { state, dispatch } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const handleDelete = () => {
    deleteIssue(issueId)
      .then(() => {
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button sx={{ p: 0 }}>
        <DeleteIcon
          className={classes.deleteButton}
          style={{ fill: 'red' }}
          onClick={handleOpen}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this issue?
          </Typography>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteIssueConfirmation;
