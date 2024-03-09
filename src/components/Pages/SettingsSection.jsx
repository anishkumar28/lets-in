import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Box from '@mui/material/Box';

export default function SettingsSection(){
    return(
        <>
        <Box sx={{display: 'flex'}}>
          <Sidebar/>
          
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings is what we have to take care of the the things and events related to some awesome purposes.when you can be good and fresh thank good for your sucess and deliverables around the globe.when you can be good and fresh thank good for your sucess and deliverables around the globe.when you can be good and fresh thank good for your sucess and deliverables around the globe.when you can be good and fresh thank good for your sucess and deliverables around the globe.when you can be good and fresh thank good for your sucess and deliverables around the globe.</h1>
          </Box>
        </Box>
        </>
    )
}