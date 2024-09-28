import React from "react";
import { Box, Typography, Link, Grid2 } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        py: 4,
        px: 2,
        borderTop: "1px solid #e2e2e0",
      }}
    >
      {/* Container grid */}
      <Grid2
        container
        columns={12}
        spacing={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* Brand Section */}
        <Box sx={{ width: "15%" }}>
          <Typography
            variant="h5"
            sx={{ color: "#4252df", fontWeight: "bold", mb: 2 }}
          >
            Stay
            <Box component="span" sx={{ color: "#152c5b" }}>
              cation.
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#9e9e9e", maxWidth: "200px" }}
          >
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Box>

        {/* For Beginners */}
        <Box sx={{ width: "15%" }}>
          <Typography
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: "bold", mb: 2 }}
          >
            For Beginners
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              New Account
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              Start Booking a Room
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              Use Payments
            </Link>
          </Typography>
        </Box>

        {/* Explore Us */}
        <Box sx={{ width: "15%" }}>
          <Typography
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: "bold", mb: 2 }}
          >
            Explore Us
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              Our Careers
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              Privacy
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="hover" sx={{ color: "#152c5b" }}>
              Terms & Conditions
            </Link>
          </Typography>
        </Box>

        {/* Connect Us */}
        <Box sx={{ width: "15%" }}>
          <Typography
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: "bold", mb: 2 }}
          >
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            support@staycation.id
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            021 - 2208 - 1996
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Staycation, Kemang, Jakarta
          </Typography>
        </Box>
      </Grid2>

      {/* Copyright */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
          Copyright © 2024 - All rights reserved - Staycation.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
