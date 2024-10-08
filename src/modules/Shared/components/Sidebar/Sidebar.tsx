import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import BookOnlineTwoToneIcon from "@mui/icons-material/BookOnlineTwoTone";
import PrecisionManufacturingTwoToneIcon from "@mui/icons-material/PrecisionManufacturingTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/authcontext";

interface SidebarProps {
  onToggle?: () => void;
  collapsed?: boolean;
}

export default function SidebarComponent({


  
  onToggle,
  collapsed,
}: SidebarProps) {
  const { logout }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  // const [isCollapse, setIsCollapse] = useState(() => {
  //   const storedValue = localStorage.getItem("isCollapse");
  //   if (!storedValue) return false;

  //   return JSON.parse(storedValue);
  // });
  // let togglerCollapse = () => {
  //   setIsCollapse(!isCollapse);

  //   localStorage.setItem("isCollapse", !isCollapse);
  // };
  const handleLogout = () => {
    logout();
    navigate("/dashboard/homepage");
  };

  // Helper function to determine if the path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    {/* <Box

            sx={{
            position: "sticky",
            top: 0,
            left: 0,
            //width: collapsed ? "100px" : "280px",
            height: "100vh",
            transition: "width 0.3s",
            overflowX: "hidden",
            bgcolor: "#f0f0f0",
            zIndex: 1000,
          }}
    
    > */}
    <Sidebar
      rootStyles={{
        height: "100vh",
      }}
    >
      <IconButton
        onClick={onToggle}
        sx={{
          transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all 0.3s",
          position: "absolute",
          right: collapsed ? "170px" : "5px",
          color: "white",
        }}
      >
        <Box sx={{display:{xs:"none",md:"inline"}}}>
        <DoubleArrowIcon />       
              </Box>

      </IconButton>
      <Menu
        rootStyles={{
          paddingTop: "4rem",
          backgroundColor: "rgba(32, 63, 199, 1)",
          height: "100%",
        }}
      >
        <MenuItem
          component={<Link to="/dashboard/home" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/home")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
            
          >
            <HomeTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Home</span>}
              </Box>
       
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/users" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/users")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PeopleAltTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Users</span>}    
              </Box>
         
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/rooms" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/rooms")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <DashboardTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Rooms</span>}
              </Box>
         
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/Ads-list" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/Ads-list")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <CalendarMonthTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Ads</span>}
            </Box>
           
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/List-booking" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/List-booking")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <BookOnlineTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Bookings</span>}
              </Box>
    
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/facilities" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/facilities")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PrecisionManufacturingTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && (
              <span style={{ marginLeft: "1rem" }}>Facilities</span>
            )}
              </Box>
        
          </Box>
        </MenuItem>

        <MenuItem
          component={<Link to="/dashboard/change-password" />}
          rootStyles={{
            backgroundColor: isActive("/dashboard/change-password")
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LockOpenTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && (
              <span style={{ marginLeft: "1rem" }}>Change Password</span>
            )}
              </Box>
         
          </Box>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "0.5rem" : "1rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LogoutTwoToneIcon />
            <Box sx={{display:{xs:"none",md:"inline"}}}>
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Logout</span>}
              </Box>
           
          </Box>
        </MenuItem>
      </Menu>
    </Sidebar>
    {/* </Box> */}
    </>
  );
}
