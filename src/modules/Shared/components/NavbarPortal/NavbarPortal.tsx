import {
  AppBar,
  Box,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "../../../../context/authcontext";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { selectStyle } from "../../../Admin/components/Facilities/FacilitiesData";

interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const StyledNavLink = styled(NavLink)<{ isActive: boolean }>(
  ({ isActive }) => ({
    textDecoration: "none",
    borderBottom: isActive ? "2px solid #3252df" : "2px solid #fff",
    marginRight: "40px",
    color: "#152C5B",
    "&:hover": {
      color: "#FF498B",
    },
  })
);
export default function NavbarPortal(props: Props) {
  const navigate = useNavigate();
  const { loginData, logout }: any = useContext(AuthContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogOut = () => {
    logout();
    navigate("/homepage");
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex", mb: 5 }}>
        <CssBaseline />
        <AppBar
          component="nav"
          color="inherit"
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #E5E5E5",
            position: "static",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={() => navigate("/dashboard/homepage")}
              variant="h5"
              color="primary"
              sx={{
                color: "#3252df",
                paddingLeft: "60px",
                fontSize: "26px",
                fontFamily: "Poppins",
                ontWeight: 500,
                flexGrow: 1,
                display: { xs: "none", md: "block" },
                width: "50%",
                cursor: "pointer",
              }}
            >
              Stay
              <Box
                sx={{
                  color: "#152c5b",
                  display: "inline",
                  fontSize: "26px",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
                cation.
              </Box>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "block" }, me: 4 }}>
              <StyledNavLink
                isActive={location.pathname === "/dashboard/homepage"}
                to={"/dashboard/homepage"}
              >
                Home
              </StyledNavLink>

              <StyledNavLink
                isActive={location.pathname === "/dashboard/all-rooms"}
                to={"/dashboard/all-rooms"}
              >
                Explore
              </StyledNavLink>

              {loginData?.role ? (
                <>
                  <StyledNavLink
                    isActive={location.pathname === "/dashboard/favorites"}
                    to={"/dashboard/favorites"}
                  >
                    Favorites
                  </StyledNavLink>

                  <StyledNavLink
                    isActive={location.pathname === "/dashboard/all-bookings"}
                    to={"/dashboard/all-bookings"}
                  >
                    All Bookings
                  </StyledNavLink>

                  <Select
                    sx={selectStyle}
                    style={{ marginRight: "40px" }}
                    value=""
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem
                      onClick={() => navigate("/dashboard/change-password")}
                      sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                      value={20}
                    >
                      Change Password
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                      onClick={handleLogOut}
                      value={30}
                    >
                      Logout
                    </MenuItem>
                  </Select>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-button"
                    style={{
                      textDecoration: "none",
                      color: "#152C5B",
                      marginRight: "30px",
                    }}
                    to={"/register"}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    className="nav-button"
                    style={{
                      textDecoration: "none",
                      color: "#152C5B",
                    }}
                    to={"/login"}
                  >
                    Login Now
                  </NavLink>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {/* -----------------for mobile--------------------- */}
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  my: 2,
                  color: "#3252df",
                  paddingLeft: "10px",
                }}
              >
                Stay
                <Box sx={{ color: "#152c5b", display: "inline" }}>cation.</Box>
              </Typography>
              <Divider />

              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText
                      primary="Home"
                      onClick={() => navigate("/dashboard/homepage")}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText
                      primary=" Explore"
                      onClick={() => navigate("/dashboard/all-rooms")}
                    />
                  </ListItemButton>
                </ListItem>
                {loginData?.role ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary="Favorites"
                          onClick={() => navigate("/dashboard/favorites")}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary="All Bookings"
                          onClick={() => navigate("/dashboard/all-bookings")}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary="Change Password"
                          onClick={() => navigate("/dashboard/change-password")}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary="Logout"
                          onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary=" Register"
                          onClick={() => navigate("/register")}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary="Login Now"
                          onClick={() => navigate("/login")}
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        </nav>
      </Box>
    </>
  );
}
