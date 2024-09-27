import React from "react";
import { Typography, Box, Link,Grid2 } from "@mui/material";
// import Grid2 from "@mui/material-next/Grid2"; 

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        padding: "40px 20px",
        marginTop: "20px",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid2 container spacing={4}>
        {/* Staycation Brand and Description */}
        <Grid2 xs={12} sm={4}>
          <Typography variant="h6" sx={{ color: "#1565C0", fontWeight: "700" }}>
            Stay<span style={{ color: "black" }}>cation.</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6c757d", marginTop: "10px" }}
          >
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Grid2>

        {/* For Beginners Section */}
        <Grid2 xs={12} sm={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", marginBottom: "15px" }}
          >
            For Beginners
          </Typography>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            New Account
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            Start Booking a Room
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            Use Payments
          </Link>
        </Grid2>

        {/* Explore Us Section */}
        <Grid2 xs={12} sm={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", marginBottom: "15px" }}
          >
            Explore Us
          </Typography>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            Our Careers
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            Privacy
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ display: "block", marginBottom: "8px", color: "#6c757d" }}
          >
            Terms & Conditions
          </Link>
        </Grid2>

        {/* Connect Us Section */}
        <Grid2 xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", marginBottom: "15px" }}
          >
            Connect Us
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "8px", color: "#6c757d" }}
          >
            support@staycation.id
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "8px", color: "#6c757d" }}
          >
            022 - 2208 - 1996
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "8px", color: "#6c757d" }}
          >
            Staycation, Kemang, Jakarta
          </Typography>
        </Grid2>
      </Grid2>

      {/* Copyright Section */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="body2" sx={{ color: "#6c757d" }}>
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
