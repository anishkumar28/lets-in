import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


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


function JobInfo(){
    const [location, setLocation] = React.useState('');

    const handleChange = (event) => {
        setLocation(event.target.value);
      };

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
        margin-top: 2px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
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

    return(
      <>
          <Box 
            component="form"
            sx={{
              '& > :not(style)': { m: 0, mt: 2, width:'fit-screen', p: 0, gap: 3, flexShrink: 0},
            }}
            NoValidate
            autoComplete="off"
          >
            <div className="flex flex-row justify-around m-0 p-0">
            <TextField id="standard-basic" className="add-card-input" label="Company Name *" variant="standard" />
              <TextField id="standard-basic" className="add-card-input" label="Job Title *" variant="standard" />
            </div>

            <div className="flex flex-row justify-around m-0 p-0">
            <TextField id="standard-basic" className="add-card-input" label="Link" variant="standard" />
            <TextField id="standard-basic" className="add-card-input" label="Location" variant="standard" />
              
            </div>

            <div className="flex flex-row justify-around m-0 p-0">
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
          </Box>
          <Box>
            <Textarea
              minRows={12}
              maxRows={12}
              aria-label="maximum height"
              placeholder="Description"
              defaultValue=""
            />
          </Box>
          </>

    

    )
}

export default JobInfo;