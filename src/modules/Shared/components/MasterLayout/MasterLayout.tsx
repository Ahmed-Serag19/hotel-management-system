import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SidebarComponent from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents body scrolling
      }}
    >
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          width: collapsed ? "75px" : "243px", // Collapsed or expanded width
          height: "100vh", // Ensure it takes full height
          transition: "width 0.3s",
          overflowX: "hidden", // Prevent horizontal scroll when collapsed
          bgcolor: "#f0f0f0", // Sidebar background color (optional)
          zIndex: 1000, // Ensure it stays on top of the content
        }}
      >
        <SidebarComponent onToggle={toggleSidebar} collapsed={collapsed} />
      </Box>

      {/* Main Content (Outlet) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto", // Enables scrolling for the main content
          padding: 2,
          bgcolor: "#fafafa", // Background color for the main content (optional)
        }}
      >
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}
