import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SidebarComponent from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../../../context/authcontext";
import Footer from "../../Footer/Footer";
import Layout from "../Layout/Layout";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle case when AuthContext is not provided
    return <div>Loading...</div>;
  }

  const { loginData } = authContext;

  console.log(loginData);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents body scrolling
      }}
    >
      {/* Sidebar */}
      {/* <Box
        component="nav"
        sx={{
          height: "100vh",
          width: collapsed ? "102px" : "243px", // Collapsed or expanded width
          transition: "width 0.3s",
          overflowX: "hidden", // Prevent horizontal scroll when collapsed
        }}
      >
        <Sidebarr onToggle={toggleSidebar} collapsed={collapsed} />
      </Box> */}
      {loginData?.role === "admin" && (
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
      )}

      {/* Main Content (Outlet) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          padding: loginData?.role === "admin" ? 2 : 0, // Conditional padding
          paddingX: loginData?.role === "admin" ? 2 : 10, // Conditional padding

          bgcolor: loginData?.role === "admin" ? "#fafafa" : "white",
        }}
      >
        {loginData?.role === "admin" && <Navbar />}
        {/* <Layout /> */}
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}
