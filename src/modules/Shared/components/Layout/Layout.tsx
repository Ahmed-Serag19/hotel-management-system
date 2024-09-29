import {
  AppBar,
  Box,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
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
//const navItems = ['Home', 'About', 'Contact'];
export default function Layout(props: Props) {
  const navigate = useNavigate();
  const { loginData }: any = useContext(AuthContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
              <Link
                style={{
                  textDecoration: "none",
                  color: "#152C5B",
                  marginRight: "40px",
                }}
                to={"/dashboard"}
              >
                Home
              </Link>

              <Link
                style={{ textDecoration: "none", color: "#152C5B" }}
                to={"/dashboard/all-rooms"}
              >
                Explore
              </Link>

              {loginData?.role ? (
                <>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#152C5B",
                      marginInline: "40px",
                    }}
                    to={"/dashboard/favorite-room"}
                  >
                    Favorite
                  </Link>

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
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                      value={30}
                    >
                      Logout
                    </MenuItem>
                  </Select>
                </>
              ) : (
                <>
                  <Link
                    className="nav-button"
                    style={{
                      textDecoration: "none",
                      color: "#152C5B",
                      marginInline: "30px",
                    }}
                    to={"/"}
                  >
                    Login Now
                  </Link>
                  <Link
                    className="nav-button"
                    style={{
                      textDecoration: "none",
                      color: "#152C5B",
                      marginRight: "40px",
                    }}
                    to={"/register"}
                  >
                    Register
                  </Link>
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
            {/* for mobile */}
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  my: 2,
                  color: "#3252df",
                  paddingLeft: "30px",
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
                      onClick={() => navigate("/dashboard")}
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
                          primary="Favorite"
                          onClick={() => navigate("/dashboard/favorite-room")}
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
                          primary="Login Now"
                          onClick={() => navigate("/")}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary=" Register"
                          onClick={() => navigate("/register")}
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
