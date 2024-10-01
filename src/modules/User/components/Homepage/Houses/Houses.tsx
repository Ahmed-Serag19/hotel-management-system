import { Box, Card, CardMedia, Typography, Grid2 } from "@mui/material";
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

      {/* Grid for responsive layout of cards */}
      <Grid2
        container
        spacing={3}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // Single column on extra small screens
            sm: "repeat(2, 1fr)", // Two columns on small screens
            md: "repeat(3, 1fr)", // Three columns on medium screens
            lg: "repeat(4, 1fr)", // Four columns on large screens
            paddingTop: "50px",
          },
          gap: "20px",
        }}
      >
        {dummyHouses.map((house) => (
          <Card
            key={house.id}
            sx={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              boxShadow: "none",
              color: "#152c5b",
              cursor: "pointer",
              transition: "0.3s all ease-in-out",
              display: "flex",

              flexDirection: "column",
              ":hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* If there's a label, display it at the top-right */}
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
              height="200px"
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
      </Grid2>
    </Box>
  );
};

export default Houses;
