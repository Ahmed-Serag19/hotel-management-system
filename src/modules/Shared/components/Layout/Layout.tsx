import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { AuthContext } from "../../../../context/authcontext";

// Styled components
const LogoTypography = styled(Typography)({
  flexGrow: 1,
  fontWeight: 700,
  fontSize: "24px",
  color: "#1565C0",
});

const MenuButton = styled(Button)({
  marginLeft: "20px",
  color: "#1565C0",
});

const AuthButton = styled(Button)({
  marginLeft: "20px",
  backgroundColor: "#1565C0",
  color: "white",
  "&:hover": {
    backgroundColor: "#0d47a1",
  },
});

const LoggedInButton = styled(Button)({
  marginLeft: "20px",
  color: "#1565C0",
});

const Layout: React.FC = () => {
  const { loginData } = useContext(AuthContext);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {/* Logo */}
        <LogoTypography variant="h6">
          Stay<span style={{ color: "black" }}>cation.</span>
        </LogoTypography>

        {/* Menu Buttons */}
        <Box display="flex" flexGrow={1}>
          <MenuButton>Home</MenuButton>
          <MenuButton>Explore</MenuButton>
        </Box>

        {/* Conditional Rendering based on User Login */}
        {!loginData ? (
          <>
            <AuthButton variant="contained">Register</AuthButton>
            <AuthButton variant="contained">Login Now</AuthButton>
          </>
        ) : (
          <>
            <LoggedInButton>Favorites</LoggedInButton>
            <LoggedInButton>Review</LoggedInButton>
            <Typography variant="body1" style={{ marginLeft: "20px" }}>
              Welcome back, {loginData.username}!
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
