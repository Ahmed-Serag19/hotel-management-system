import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../../context/authcontext";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import NavbarPortal from "../NavbarPortal/NavbarPortal";
import Navbar from "../Navbar/Navbar";
import { Outlet, replace, useNavigate } from "react-router-dom";
import SidebarComponent from "../Sidebar/Sidebar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function MasterLayout() {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const navigate = useNavigate()
  const {loginData} = useContext(AuthContext) || {};


  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle case when AuthContext is not provided
    return <div>Loading...</div>;
  }



  return (
    <>
         {isLoading ? <LoadingScreen/>:<Box>
   
   
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents-bodys-crolling
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
             width: {xs:"250px",sm:"80px", md: collapsed ? "100px" : "250px"},
            height: "100vh",
            transition: "width 0.3s",
            overflowX: "hidden",
            bgcolor: "#f0f0f0",
            zIndex: 1000,
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
          // height: "100vh",
          overflowY: "auto",
          padding: loginData?.role === "admin" ? 2 : 0,
          paddingX: loginData?.role === "admin" ? 2 : 0,

          // bgcolor: loginData?.role === "admin" ? "#fafafa" : "white",
        }}
      >
        {loginData?.role === "admin" && <Navbar />}
        {loginData?.role !== "admin" && <NavbarPortal />}
        <Box
          sx={{
            padding: loginData?.role === "admin" ? 2 : 2,
            paddingX: loginData?.role === "admin" ? 2 : 6,
            // minHeight: "calc(100vh - 290px)",
          }}
        >
          <Outlet />
        </Box>
        {loginData?.role !== "admin" && <Footer />}
      </Box>
    </Box>
    </Box>}
    </>


  );
}
