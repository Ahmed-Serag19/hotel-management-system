// Footer.tsx
import React from "react";
import { Box, Typography, Grid2, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", p: 4 }}>
      <Grid2 container spacing={4}>
        {/* Brand Section */}
        <Grid2 item xs={12} sm={3}>
          <Typography variant="h6" color="primary" gutterBottom>
            Staycation.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Grid2>

        {/* For Beginners */}
        <Grid2 item xs={12} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            For Beginners
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              New Account
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              Start Booking a Room
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              Use Payments
            </Link>
          </Typography>
        </Grid2>

        {/* Explore Us */}
        <Grid2 item xs={12} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Explore Us
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              Our Careers
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              Privacy
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              Terms & Conditions
            </Link>
          </Typography>
        </Grid2>

        {/* Connect Us */}
        <Grid2 item xs={12} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Connect Us
          </Typography>
          <Typography variant="body2" color="textSecondary">
            support@staycation.id
          </Typography>
          <Typography variant="body2" color="textSecondary">
            021 - 2208 - 1996
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Staycation, Kemang, Jakarta
          </Typography>
        </Grid2>
      </Grid2>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Copyright © 2023 - All rights reserved - Staycation.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
