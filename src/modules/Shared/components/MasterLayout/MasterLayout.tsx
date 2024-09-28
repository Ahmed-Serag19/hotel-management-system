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
            width: collapsed ? "75px" : "243px",
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
          height: "100vh",
          overflowY: "auto",
          padding: loginData?.role === "admin" ? 2 : 0,
          paddingX: loginData?.role === "admin" ? 2 : 0,

          bgcolor: loginData?.role === "admin" ? "#fafafa" : "white",
        }}
      >
        {loginData?.role === "admin" && <Navbar />}
        {loginData?.role !== "admin" && <Layout />}
        <Box
          sx={{
            padding: loginData?.role === "admin" ? 2 : 2,
            paddingX: loginData?.role === "admin" ? 2 : 6,
            minHeight: "calc(100vh - 290px)",
          }}
        >
          <Outlet />
        </Box>
        {loginData?.role !== "admin" && <Footer />}
      </Box>
    </Box>
  );
}
