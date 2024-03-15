import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import JobInfo from './FormComponents/JobInfo';
import { styled } from '@mui/material/styles';
import { purple, green, blue, red, cyan } from '@mui/material/colors';

import CoverLetter from './FormComponents/CoverLetter';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CloseButtton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: red[500],
    borderRadius: 12,
    '&:hover': {
      backgroundColor: red[700],
    },
  }));

  const SaveButtton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: cyan[200],
    borderRadius: 12,
    '&:hover': {
      backgroundColor: cyan[400],
    },
  }));

  

  return (
    <Box id='modalform' style = {{ width: '100%', display: 'flex', flexDirection: 'column', position: 'absolute'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', alignItems: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Job Info" {...a11yProps(0)} />
          <Tab label="To Do List" {...a11yProps(1)} />
          <Tab label="Notes" {...a11yProps(2)} />
          <Tab label="Contacts" {...a11yProps(3)} />
          <Tab label="Cover Letter" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <JobInfo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      To Do List content 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      Notes content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
       Contacts content 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CoverLetter/>
      </CustomTabPanel>
      <div className='flex flex-row end-0 bottom-1 gap-2'>
        <CloseButtton>Close</CloseButtton>
      <SaveButtton>Save Card</SaveButtton>
      </div>
    </Box>
  );
}