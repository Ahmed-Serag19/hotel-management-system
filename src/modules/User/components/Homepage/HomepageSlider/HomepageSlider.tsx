import Slider from "react-slick";
import { Box, Typography, Stack, IconButton } from "@mui/material";
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

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        paddingY: "70px",
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
              //   overflow: "hidden",
              height: "500px",
              display: "flex !important",
              justifyContent: "flex-start",
              gap: "50px",
              alignItems: "center",
            }}
          >
            {/* Left side: Image */}
            <Box
              sx={{
                width: "30%",
                height: "100%",
                position: "relative",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "bottom center",
                  position: "absolute",
                  top: "30px",
                  left: "30px",
                  borderBottomRightRadius: "20%",
                }}
              />
            </Box>

            {/* Right side: Text and Information */}
            <Box
              sx={{
                width: "50%",
                padding: "5px 5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                  fontSize: "25px",
                  lineHeight: 1.6,
                }}
              >
                {testimonial.text}
              </Typography>

              <Typography
                sx={{ fontWeight: "bold", color: "#888", marginBottom: 1 }}
              >
                {testimonial.name} {testimonial.role}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HomepageSlider;
