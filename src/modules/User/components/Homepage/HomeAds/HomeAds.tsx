import { Box, Card, CardMedia, Typography, Stack } from "@mui/material";
import Pic8 from "../../../../../assets/images/pic8.png";
import Pic9 from "../../../../../assets/images/pic9.png";
import Pic10 from "../../../../../assets/images/pic10.png";
import Pic11 from "../../../../../assets/images/pic11.png";

// Static dummy data with discount labels for the first three H
const dummyAds = [
  {
    id: "1",
    adName: "PS Wood",
    location: "Depok, Indonesia",
    image: Pic8,
    label: "20% Off",
  },
  {
    id: "2",
    adName: "One Five",
    location: "Jakarta, Indonesia",
    image: Pic9,
    label: "10% Off",
  },
  {
    id: "3",
    adName: "Minimal",
    location: "Bogor, Indonesia",
    image: Pic10,
    label: "13% Off",
  },
  {
    id: "4",
    adName: "Stays Home",
    location: "Wonosobo, Indonesia",
    image: Pic11,
  },
];

const HomeAds = () => {
  return (
    <Box sx={{ padding: "20px", paddingTop: "75px", color: "#152c5b" }}>
      <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
        Ads
      </Typography>

      {/* Stack for horizontal row of cards */}
      <Stack direction="row" spacing={3}>
        {dummyAds.map((ad) => (
          <Card
            key={ad.id}
            sx={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              width: "350px", // Fixed width for uniformity
              height: "300px", // Fixed height for all images
              boxShadow: "none",
              color: "#152c5b",
              cursor: "pointer",
              transition: "0.3s all ease-in-out",
              ":hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* Discount label for the first three cards */}
            {ad.label && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  backgroundColor: "#ff498b",
                  color: "#fff",
                  padding: "5px 10px",
                  border: "none",
                  width: "150px",
                  textAlign: "center",
                  zIndex: 1,
                  borderBottomLeftRadius: "10px",
                }}
              >
                {ad.label}
              </Box>
            )}

            {/* Ad Image */}
            <CardMedia
              component="img"
              height="220"
              image={ad.image}
              alt={ad.adName}
              sx={{ objectFit: "cover", borderRadius: "8px" }}
            />

            {/* Ad Info */}
            <Box sx={{ padding: "10px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {ad.adName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {ad.location}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default HomeAds;
