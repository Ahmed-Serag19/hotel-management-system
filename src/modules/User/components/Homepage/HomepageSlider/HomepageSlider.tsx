import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import React from "react";

// Import Images (replace with your actual image paths)
import Family1 from "../../../../../assets/images/family1.jpg";
import Family2 from "../../../../../assets/images/family2.png";

// Dummy data
const testimonials = [
  {
    id: 1,
    image: Family1,
    title: "Happy Family",
    text: "What a great trip with my family and I should try again next time soon ...",
    name: "Angga",
    role: "Product Designer",
    rating: 5,
  },
  {
    id: 2,
    image: Family2,
    title: "Adventure Time",
    text: "We enjoyed every moment of the trip. The adventure was thrilling and exciting!",
    name: "Sarah",
    role: "Travel Blogger",
    rating: 4,
  },
];

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const HomepageSlider = () => {
  // Custom Next/Prev Arrow buttons for the carousel
  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        color: "#3252DF",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        "&:hover": {
          backgroundColor: "#3252DF",
          color: "#fff",
        },
      }}
    >
      <ArrowForwardIcon />
    </IconButton>
  );

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        color: "#3252DF",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        "&:hover": {
          backgroundColor: "#3252DF",
          color: "#fff",
        },
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box
      sx={{
        paddingY: { xs: "30px", md: "70px" }, // Adjust padding based on screen size
        maxWidth: "100%",
        background: "#fff",
        borderRadius: "16px",
      }}
    >
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            sx={{
              background: "#fff",
              borderRadius: "16px",
              height: { xs: "auto", md: "600px" }, // Adjust height for mobile
              display: "flex !important",
              flexDirection: { xs: "column", md: "row" }, // Stack in column on small screens
              justifyContent: "flex-start",
              gap: { xs: "20px", md: "50px" }, // Adjust gap
              alignItems: "center",
              paddingX: { xs: "20px", md: "60px" }, // Adjust padding for mobile
            }}
          >
            {/* Left side: Image */}
            <Box
              sx={{
                width: { xs: "100%", md: "30%" }, // Full width on small screens
                height: { xs: "400px", md: "90%", sm: "300px" },
                position: "relative",
                border: "1px solid grey",
                borderRadius: "5px",
                marginBottom: { xs: "20px", md: "0" }, // Add margin-bottom for mobile
              }}
            >
              <Box
                component="img"
                src={testimonial.image}
                alt={testimonial.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  position: "absolute",
                  top: { sm: "0", md: "30px" },
                  left: { sm: "0", md: "30px" },
                  borderBottomRightRadius: {
                    xs: "0%", // Set border radius to 0 on small screens and below
                    sm: "0%", // Also set to 0 on sm (optional, as xs includes sm by default)
                    md: "20%", // Apply 20% border radius on medium screens and above
                  },
                }}
              />
            </Box>

            {/* Right side: Text and Information */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" }, // Full width on mobile
                padding: "5px 5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" }, // Center text on small screens
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#152c5b",
                }}
              >
                {testimonial.title}
              </Typography>

              {/* Rating */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" }, // Center rating on small screens
                  alignItems: "center",
                  mb: 2,
                }}
              >
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ color: "#FFD700", fontSize: "30px" }}
                  />
                ))}
              </Box>

              <Typography
                sx={{
                  color: "#152c5b",
                  marginBottom: "20px",
                  fontSize: { xs: "18px", md: "25px" }, // Adjust font size based on screen size
                  lineHeight: 1.6,
                }}
              >
                {testimonial.text}
              </Typography>

              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#888",
                  marginBottom: 1,
                  textAlign: { xs: "center", md: "left" }, // Center text on small screens
                }}
              >
                {testimonial.name} - {testimonial.role}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HomepageSlider;
