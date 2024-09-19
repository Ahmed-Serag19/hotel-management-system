import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import BookOnlineTwoToneIcon from "@mui/icons-material/BookOnlineTwoTone";
import PrecisionManufacturingTwoToneIcon from "@mui/icons-material/PrecisionManufacturingTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { Box } from "@mui/material";

export default function Sidebarr({ onToggle, collapsed }) {
  return (
    <Sidebar
      onClick={onToggle}
      rootStyles={{
        height: "100%",
      }}
    >
      <Menu
        rootStyles={{
          paddingTop: "4rem",
          backgroundColor: "rgba(32, 63, 199, 1)",
          height: "100%",
        }}
      >
        <MenuItem component={<Link to="/dashboard/home" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <HomeTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Home</span>}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard/users" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PeopleAltTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Users</span>}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard/rooms" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <DashboardTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Rooms</span>}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <CalendarMonthTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Ads</span>}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard/List-booking" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <BookOnlineTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Bookings</span>}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard/facilities" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <PrecisionManufacturingTwoToneIcon />
            {!collapsed && (
              <span style={{ marginLeft: "1rem" }}>Facilities</span>
            )}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/change-password" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LockOpenTwoToneIcon />
            {!collapsed && (
              <span style={{ marginLeft: "1rem" }}>
                Change <br /> Password
              </span>
            )}
          </Box>
        </MenuItem>

        <MenuItem component={<Link to="/dashboard" />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: collapsed ? "1.5rem" : "3rem",
              color: "white",
              transition: "all 0.3s",
              marginBottom: "1rem",
              paddingTop: "1rem",
            }}
          >
            <LogoutTwoToneIcon />
            {!collapsed && <span style={{ marginLeft: "1rem" }}>Logout</span>}
          </Box>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
