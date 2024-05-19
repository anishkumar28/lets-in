import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, Stepper, TextField } from "@mui/material";
import { useState } from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import CoverLetter from "./FormComponents/CoverLetter";
import { Toast } from "reactstrap";
import {getDatabase, ref, set } from 'firebase/database';
import {app} from "../components/Firebase.js";




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

    const [cardData, setCardData ] = useState({
      companyName:"",
      jobTitle:"",
      link:"",
      location:"",
      salary:"",
      status:"",
      jobDescription:"",
      coverLetter:"",

    });

    let name, value;
    const handleChange = (e) => {
      name = e.target.name;
      value = e.target.value;
      
      setCardData(cardData => ({
        ...cardData,
        [name]: [value],
      }));
    } 


    const {companyName, jobTitle, link, location, salary, status, jobDescription, coverLetter} = cardData;
    

    const submitForm = async(e) => {
      e.preventDefault();
      const db = getDatabase(app);
      set(ref(db,'users'),{cardData});

    }

    return (
        <div style={{textAlign:'center'}}>
            <Button onClick={functionopenpopup} color="primary" variant="contained">Add</Button>
            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2} margin={4} marginTop={4}>
                    <DialogContentText color={"blue"}>Job Info Section</DialogContentText>
                        <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" name="companyName" value={cardData.companyName}  label="Company Name" onChange={handleChange} variant="standard" required  />
                              <TextField id="standard-basic" className="add-card-input" name="jobTitle" value={cardData.jobTitle} label="Job Title" variant="standard" required onChange={handleChange}/>
                            </div>

                            <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" name="link" value={cardData.link} label="Link" variant="standard" onChange={handleChange} />
                            <TextField id="standard-basic" className="add-card-input" name="location" value={cardData.location} label="Location" variant="standard" onChange={handleChange} />
              
                            </div>

                            <div className="flex flex-row justify-between m-0 p-0">
                            <TextField id="standard-basic" className="add-card-input" name="salary" value={cardData.salary} label="Salary" variant="standard" onChange={handleChange} />
                            <TextField
                                className="add-card-input"
                                id="standard-select-currency"
                                select
                                name="status"
                                value={cardData.status}
                                label="Status"
                                defaultValue="Applied"
                                helperText="Current status of your application"
                                variant="standard"
                                onChange={handleChange}
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
                              name="jobDescription"
                              value={cardData.jobDescription}
                              aria-label="maximum height"
                              placeholder="Job Description"
                              onChange={handleChange}
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
                              name="coverLetter"
                              value={cardData.coverLetter}
                              aria-label="maximum height"
                              placeholder="Add cover letter"
                              onChange={handleChange}
                            />
                          </Box>
                    </Stack>


                </DialogContent>
                <DialogActions>
                
                    <Button onClick={closepopup} color="error" variant="contained">CLOSE</Button>
                    <Button onClick={submitForm} color="primary" variant="contained" value="submit">SAVE CARD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modalpopup;