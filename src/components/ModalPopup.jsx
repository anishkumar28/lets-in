import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, Stepper, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import CoverLetter from "./FormComponents/CoverLetter";
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"

const currencies = [
    {
      value: 'Wishlist',
      label: 'Wishlist',
    },
    {
      value: 'Applied',
      label: 'Applied',
    },
    {
      value: 'Interview',
      label: 'Interview',
    },
    {
      value: 'Offer',
      label: 'Offer',
    },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
  ];

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: none;
    resize: none;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[500]};
          
    }
  
    //firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );


const Modalpopup = () => {
    const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    return (
        <div style={{textAlign:'center'}}>
            <Button onClick={functionopenpopup} color="primary" variant="contained">Add</Button>
            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                {/* <DialogTitle>User Registeration  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle> */}
                <DialogContent>
                    <Stack spacing={2} margin={4} marginTop={4}>
                    <DialogContentText color={"blue"}>Job Info Section</DialogContentText>
                        <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" label="Company Name" variant="standard" required />
                              <TextField id="standard-basic" className="add-card-input" label="Job Title" variant="standard" re/>
                            </div>

                            <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" label="Link" variant="standard" />
                            <TextField id="standard-basic" className="add-card-input" label="Location" variant="standard" />
              
                            </div>

                            <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" label="Salary" variant="standard" />
                            <TextField
                                className="add-card-input"
                                id="standard-select-currency"
                                select
                                label="Status"
                                defaultValue="Applied"
                                helperText="Current status of your application"
                                variant="standard"
                              >
                                {currencies.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          
                          <Box>
                            <Textarea
                              minRows={12}
                              maxRows={12}
                              aria-label="maximum height"
                              placeholder="Job Description"
                              defaultValue=""
                            />
                          </Box>  

                    
                    </Stack>

                    <Stack spacing={2} margin ={4} marginTop={8}>
                    <DialogContentText color={"blue"}>Contacts Section</DialogContentText>
                    <div className="flex flex-row justify-between m-0 p-0">
                      <TextField id="standard-basic" className="add-card-input" label="Full Name" variant="standard" />
                        <TextField id="standard-basic" className="add-card-input" label="Phone Number" variant="standard" />
                      </div>

                      <div className="flex flex-row justify-between m-0 p-0">
                      <TextField id="standard-basic" className="add-card-input" label="Email Address" variant="standard" />
                      <TextField id="standard-basic" className="add-card-input" label="Job Title" variant="standard" />
                      </div>

                      <div className="flex flex-row justify-between m-0 p-0">
                      <TextField id="standard-basic" className="add-card-input" label="Linkedin Profile URL" variant="standard" />
                      <TextField id="standard-basic" className="add-card-input" label="Company Website" variant="standard" />
                      </div>

                      <Button color="primary" variant="contained">Add Contact</Button>
                    </Stack>


                    {/* Upload Resume Section */}

                     <Stack spacing={2} margin={4} marginTop={8}>
                    <DialogContentText color={"blue"}>Cover Letter</DialogContentText>
                          <Box>
                            <Textarea
                              minRows={12}
                              maxRows={12}
                              aria-label="maximum height"
                              placeholder="Add cover letter"
                              defaultValue=""
                            />
                          </Box>
                    </Stack>


                </DialogContent>
                <DialogActions>
                
                    <Button onClick={closepopup} color="error" variant="contained">CLOSE</Button>
                    <Button color="primary" variant="contained">SAVE CARD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modalpopup;