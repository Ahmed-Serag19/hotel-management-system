import { Box, Card, CardMedia, Typography, Stack } from "@mui/material";
import Pic4 from "../../../../../assets/images/pic.png";
import Pic5 from "../../../../../assets/images/pic (1).png";
import Pic6 from "../../../../../assets/images/pic (2).png";
import Pic7 from "../../../../../assets/images/pic (3).png";

// Static dummy data
const dummyLivingRooms = [
  {
    id: "1",
    roomName: "Green Park",
    location: "Tangerang, Indonesia",
    image: Pic4,
  },
  {
    id: "2",
    roomName: "Podo Wae",
    location: "Madiun, Indonesia",
    image: Pic5,
  },
  {
    id: "3",
    roomName: "Silver Rain",
    location: "Bandung, Indonesia",
    image: Pic6,
  },
  {
    id: "4",
    roomName: "Cashville",
    location: "Kemang, Indonesia",
    image: Pic7,
    label: "Popular Choice",
  },
];

const LivingRooms = () => {
  return (
    <Box sx={{ padding: "20px", paddingTop: "100px", color: "#152c5b" }}>
      <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
        Hotels with large living room
      </Typography>

      {/* Stack for horizontal row of cards */}
      <Stack direction="row" spacing={3}>
        {dummyLivingRooms.map((room) => (
          <Card
            key={room.id}
            sx={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              width: "350px",
              height: "300px",
              boxShadow: "none",
              color: "#152c5b",
              cursor: "pointer",
              transition: "0.5s all ease-in-out",
              ":hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* Label for Popular Choice */}
            {room.label && (
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
                {room.label}
              </Box>
            )}

            {/* Room Image */}
            <CardMedia
              component="img"
              height="220"
              image={room.image}
              alt={room.roomName}
              sx={{ objectFit: "cover", borderRadius: "8px" }}
            />

            {/* Room Info */}
            <Box sx={{ padding: "10px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {room.roomName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {room.location}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default LivingRooms;
