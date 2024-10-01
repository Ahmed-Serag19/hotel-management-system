import { Box, Card, CardMedia, Typography } from "@mui/material";
import Room1 from "../../../../../assets/images/img_Mg==.jpg";
import Room2 from "../../../../../assets/images/room-2.jpg";
import Room3 from "../../../../../assets/images/room-3.jpg";
import Room4 from "../../../../../assets/images/room-4.jpg";
import Room5 from "../../../../../assets/images/room-5.jpg";

const dummyAds = [
  {
    id: "1",
    roomNumber: "Blue Origin Fams",
    location: "Jakarta, Indonesia",
    price: "$50",
    image: Room1,
  },
  {
    id: "2",
    roomNumber: "Ocean Land",
    location: "Bandung, Indonesia",
    price: "$22",
    image: Room2,
  },
  {
    id: "3",
    roomNumber: "Stark House",
    location: "Malang, Indonesia",
    price: "$856",
    image: Room3,
  },
  {
    id: "4",
    roomNumber: "Vinna Vill",
    location: "Malang, Indonesia",
    price: "$62",
    image: Room4,
  },
  {
    id: "5",
    roomNumber: "Bobox",
    location: "Medan, Indonesia",
    price: "$72",
    image: Room5,
  },
];

const PopularAds = () => {
  return (
    <Box sx={{ padding: "20px", paddingTop: "75px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px", color: "#152c5b" }}>
        Most popular ads
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // Full width on small screens
            sm: "repeat(2, 1fr)", // 2 columns on tablet
            md: "repeat(3, 1fr)", // 3 columns on larger screens
          },
          gap: "20px",
          gridAutoRows: "minmax(100px, auto)", // Automatically determine row heights
        }}
      >
        {dummyAds.map((ad) => (
          <Card
            key={ad.id}
            sx={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              gridColumn: "span 1",
              gridRow: {
                md: ad.id === "1" ? "span 2" : "span 1", // First card spans 2 rows
              },
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            {/* Price - Top right corner */}
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
              {ad.price} per night
            </Box>

            {/* Room Image */}
            <CardMedia
              component="img"
              image={ad.image}
              alt={ad.roomNumber}
              sx={{
                objectFit: "cover",
                height: {
                  xs: "250px", // Smaller height for small screens
                  sm: "300px", // Medium height for tablet
                  md: ad.id === "1" ? "620px" : "300px", // Featured ad gets larger height on larger screens
                },
              }}
            />

            {/* Room Info (Overlayed on Image) */}
            <Box
              sx={{
                position: "absolute",
                bottom: "0",
                left: "0",
                top: "0",
                right: "0",
                width: "100%",
                padding: "10px",
                background: "rgba(0, 0, 0, 0.1)",
                color: "#fff",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                transition: "0.3s all ease-in-out",
                ":hover": {
                  background: "rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {ad.roomNumber}
              </Typography>
              <Typography variant="body2" color="#f0f0f0">
                {ad.location}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PopularAds;
