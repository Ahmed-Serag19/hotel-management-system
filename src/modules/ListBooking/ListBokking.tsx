import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";

export default function ListBooking() {
  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Booking Table Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        You can check all details
      </Typography>

      <Grid2 container spacing={2}>
        {/* Row 1 */}
        <Grid2 item xs={12} md={4}>
          <Box sx={{ border: "1px solid", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Column 1</Typography>
            {/* Add your content here */}
          </Box>
        </Grid2>

        <Grid2 item xs={12} md={4}>
          <Box sx={{ border: "1px solid", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Column 2</Typography>
            {/* Add your content here */}
          </Box>
        </Grid2>

        <Grid2 item xs={12} md={4}>
          <Box sx={{ border: "1px solid", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Column 3</Typography>
            {/* Add your content here */}
          </Box>
        </Grid2>

        {/* Row 2 */}
        <Grid2 item xs={12} md={6}>
          <Box sx={{ border: "1px solid", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Column 4</Typography>
            {/* Add your content here */}
          </Box>
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Box sx={{ border: "1px solid", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Column 5</Typography>
            {/* Add your content here */}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
