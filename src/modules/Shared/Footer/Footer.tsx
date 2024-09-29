import { Box, Container, Grid2, Link, Typography } from "@mui/material";

import React from "react";

const Footer: React.FC = () => {
  return (


    <Box
      sx={{
     ps:2,
      mt:2,
        py: 4,
       
        borderTop: "1px solid #e2e2e0",
      }}
    >
          <Container >
      
  
      {/* Container grid */}
      <Grid2
        container
        sx={{ display: "flex", justifyContent: "center" }}
      >

      <Grid2 size={{xs:12, sm:6,md:3}} >
      <Box >
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
        </Grid2>  
        {/* Brand Section */}
  

      <Grid2 size={{xs:12, sm:6,md:3}}>    <Box sx={{fontFamily:"Poppins"}}>
          <Typography
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: 500, mb: 2 ,fontFamily:"Poppins",}}
          >
            For Beginners
          </Typography>
          <Typography variant="body2"  sx={{ color: "#9e9e9e" }}>
          New Account
          
          </Typography>
          <Typography variant="body2"  sx={{ color: "#9e9e9e" }}>
          Start Booking a Room
     
          </Typography>
          <Typography variant="body2"  sx={{ color: "#9e9e9e" }}>
          Use Payments
          </Typography>
        </Box></Grid2> 
        {/* For Beginners */}
    
        <Grid2 size={{xs:12, sm:6,md:3}}>        <Box >
          <Typography 
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: 500, mb: 2 ,fontFamily:"Poppins"}}
          >
            Explore Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
          Our Careers
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
          Privacy
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
          Terms & Conditions
          </Typography>
        </Box></Grid2> 
        {/* Explore Us */}

        <Grid2 size={{xs:12, sm:6,md:3}}>  <Box >
          <Typography
            variant="h6"
            sx={{ color: "#152c5b", fontWeight: 500, mb: 2,fontFamily:"Poppins"}}
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
        </Box></Grid2> 
        {/* Connect Us */}
      
      </Grid2>

      {/* Copyright */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
          Copyright © 2024 - All rights reserved - Staycation.
        </Typography>
      </Box>
      </Container>
    </Box>
  );
};

export default Footer;
