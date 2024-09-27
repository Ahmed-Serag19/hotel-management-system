import { Box, Card, CardMedia, Typography, Stack } from "@mui/material";
import Pic1 from "../../../../../assets/images/pic.png";
import Pic2 from "../../../../../assets/images/pic (1).png";
import Pic3 from "../../../../../assets/images/pic (2).png";
import Pic4 from "../../../../../assets/images/pic (3).png";

const dummyHouses = [
  {
    id: "1",
    houseName: "Tabby Town",
    location: "Gunung Batu, Indonesia",
    image: Pic1,
    label: "Popular Choice",
  },
  {
    id: "2",
    houseName: "Anggana",
    location: "Bogor, Indonesia",
    image: Pic2,
  },
  {
    id: "3",
    houseName: "Seattle Rain",
    location: "Jakarta, Indonesia",
    image: Pic3,
  },
  {
    id: "4",
    houseName: "Wodden Pit",
    location: "Wonosobo, Indonesia",
    image: Pic4,
  },
];

const Houses = () => {
  return (
    <Box sx={{ padding: "20px", paddingTop: "75px", color: "#152c5b" }}>
      <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
        Houses with beauty backyard
      </Typography>

      {/* Stack for horizontal row of cards */}
      <Stack direction="row" spacing={3}>
        {dummyHouses.map((house) => (
          <Card
            key={house.id}
            sx={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              width: "350px",
              height: "300px",
              boxShadow: "none",
              color: "#152c5b",
              cursor: "pointer",
              transition: "0.3s all ease-in-out",
              ":hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* If there's a label, display it at the top-left */}
            {house.label && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  backgroundColor: "#ff498b",
                  color: "#fff",
                  padding: "5px 10px",
                  border: "none",
                  zIndex: 1,
                  borderBottomLeftRadius: "10px",
                }}
              >
                {house.label}
              </Box>
            )}

            {/* House Image */}
            <CardMedia
              component="img"
              height="220"
              image={house.image}
              alt={house.houseName}
              sx={{ objectFit: "cover", borderRadius: "8px" }}
            />

            {/* House Info */}
            <Box sx={{ padding: "10px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {house.houseName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {house.location}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Houses;
