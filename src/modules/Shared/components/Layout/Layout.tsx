import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";

const Layout: React.FC = () => {
  const { loginData, logout }: any = useContext(AuthContext);
  let navigate = useNavigate();
  const linkStyles = (isActive: boolean) => ({
    textDecoration: "none",
    color: isActive ? "#3252df" : "#152c5b",
    marginRight: "20px",
    "&:hover": {
      color: "red",
    },
  });
  const handleLogout = () => {
    logout();
    navigate("/dashboard/homepage");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: "1px solid #e2e2e0" }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          color="primary"
          sx={{
            flexGrow: 1,
            color: "#3252df",
            paddingLeft: "60px",
          }}
        >
          Stay
          <Box sx={{ color: "#152c5b", display: "inline" }}>cation.</Box>
        </Typography>

        <Box>
          {loginData?.role ? (
            <>
              <NavLink
                to="/dashboard/homepage"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/all-rooms"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Explore
              </NavLink>
              <NavLink
                to="/dashboard/reviews"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Reviews
              </NavLink>
              <NavLink
                to="/dashboard/favorites"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Favorites
              </NavLink>
              <Button
                onClick={handleLogout}
                sx={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "#3252df",
                  padding: "8px 25px",
                  transition: "0.3s all",
                  ":hover": {
                    backgroundColor: "#4c6af0",
                  },
                }}
                className="nav-button"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/homepage"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/all-rooms"
                style={({ isActive }) => linkStyles(isActive)}
              >
                Explore
              </NavLink>
              <NavLink
                to="/login"
                style={({ isActive }) => linkStyles(isActive)}
                className="nav-button"
              >
                Login Now
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) => linkStyles(isActive)}
                className="nav-button"
              >
                Register
              </NavLink>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
