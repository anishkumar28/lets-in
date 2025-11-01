import React from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import CardData from "../FormComponents/CardData";

export default function BoardSection() {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <Box component="main" sx={{ flexGrow: 1, p:4, pt:12, width: "100%" }}>
          <CardData />
        </Box>
      </Box>
    </>
  );
}
