import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Box, Button, Typography, Modal, Stack } from '@mui/material';
import useStyles from './styles';

// delete confirmation modal that will be displayed in the tables to prompt the user to confirm that they want to delete a specific item
const DeleteConfirmation = ({ handleDelete, entity }) => {
  // model configuration states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  return (
    <Grid>
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
        <Box className={classes.deleteModal} sx={{ boxShadow: 24 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Are you sure you want to delete this {entity}?
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" onClick={handleDelete} color="error">
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
};

export default DeleteConfirmation;
