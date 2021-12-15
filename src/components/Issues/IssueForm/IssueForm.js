import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TypeDropdown from './TypeDropdown/TypeDropdown';
import PriorityDropdown from './PriorityDropdown/PriorityDropdown';
import StatusDropdown from './StatusDropdown/StatusDropdown';
import MembersDropdown from './MembersDropdown/MembersDropdown';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>New Issue</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField id="outlined-basic" label="Title" variant="outlined" />
          <TextField multiline rows={2} maxRows={4} label="Description" />
          <TypeDropdown />
          <PriorityDropdown />
          <StatusDropdown />
          <MembersDropdown />
        </Box>
      </Modal>
    </div>
  );
};

export default IssueForm;
