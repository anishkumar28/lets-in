import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Box from '@mui/material/Box';
import ModalForm from "../../ModalForm"






export default function BoardSection(){
  
    return(
        <>
        
        <Box sx={{display: 'flex'}}>
          <Sidebar/>
          <Box marginTop={10} marginLeft={6}>
          <Box component="main" sx={{ flexGrow: 1}}>
                 <ModalForm/> 
                
          </Box>
        </Box>
        </Box>

        
        </>
    )
}