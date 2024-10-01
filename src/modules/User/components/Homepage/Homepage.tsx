import { Box } from "@mui/material";
import HeroSection from "./Hero/Hero";
import PopularAds from "./PopularAds/PopularAds";
import Houses from "./Houses/Houses";
import LivingRooms from "./LivingRooms/LivingRooms";
import HomeAds from "./HomeAds/HomeAds";
import HomepageSlider from "./HomepageSlider/HomepageSlider";

const Homepage = () => {
  return (
    <Box sx={{ background: "white", paddingTop: "100px" }}>
      <HeroSection />
      <PopularAds />
      <Houses />
      <LivingRooms />
      <HomeAds />
      <HomepageSlider />
    </Box>
  );
};

export default Homepage;
