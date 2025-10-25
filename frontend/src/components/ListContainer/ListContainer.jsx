import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function ListContainer(){
  return(
    <div className="flex flex-row"> 
        <Sidebar />
        <Outlet />  
    </div>
  )
} 