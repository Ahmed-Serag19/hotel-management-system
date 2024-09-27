import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        {/* Left Section for the Title */}
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Staycation.
        </Typography>

        {/* Right Section for Navigation Links */}
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Browse by</Button>
          <Button color="inherit">Stories</Button>
          <Button color="inherit">Agents</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
