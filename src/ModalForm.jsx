import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { purple, green, blue, red, cyan } from '@mui/material/colors';
import TabPanel from "../src/components/TabPanel";

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    borderRadius: 12,
    '&:hover': {
      backgroundColor: green[700],
    },
  }));




  return (
    <div>
      <AddButton id='createcardbutton'variant="contained" style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleOpen}>Add</AddButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <TabPanel />
        </Box>
      </Modal>
      
    </div>
  );
}