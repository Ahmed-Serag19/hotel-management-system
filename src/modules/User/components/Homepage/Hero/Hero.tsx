import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Card,
  CardMedia,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DateRange } from "react-date-range"; // React Date Range
import { format } from "date-fns"; // Date formatting
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // Main CSS file for react-date-range
import "react-date-range/dist/theme/default.css"; // Theme CSS file for react-date-range
import Banner from "../../../../../assets/images/banner.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default function HeroSection() {
  const [capacity, setCapacity] = useState(2);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const navigate = useNavigate();

  const handleCapacityIncrease = () => setCapacity((prev) => prev + 1);
  const handleCapacityDecrease = () =>
    capacity > 1 && setCapacity((prev) => prev - 1);

  const handleExplore = () => {
    const startDate = state[0].startDate
      ? format(state[0].startDate, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    const endDate = state[0].endDate
      ? format(state[0].endDate, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");

    // Pass the selected date range and capacity to the explore page (AllRooms)
    navigate("/dashboard/all-rooms", {
      state: {
        capacity,
        startDate,
        endDate,
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: { xs: 2, md: 6 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {/* Left side: Text and Inputs */}
      <Stack direction="column" maxWidth={"500px"}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#152c5b",
            fontSize: { xs: "2rem", md: "2.8rem" },
            lineHeight: 1.2,
          }}
        >
          Forget Busy Work, <br /> Start Next Vacation
        </Typography>
        <Typography sx={{ color: "#888", mt: 2 }}>
          We provide what you need to enjoy your holiday with family. Time to
          make another memorable moment.
        </Typography>

        {/* Start Booking */}
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "#152c5b",
              fontSize: "18px",
            }}
          >
            Start Booking
          </Typography>

          {/* Date Range Display */}
          <Typography sx={{ color: "#152c5b" }}>Pick a Date</Typography>

          <Stack
            sx={{ cursor: "pointer" }}
            direction={"row"}
            onClick={() => setOpenDatePicker(true)}
          >
            <CalendarMonthIcon
              sx={{
                height: "40px",
                width: "40px",
                justifyItems: "flex-start",
                background: "#152c5b",
                padding: "5px",
                color: "white",
                borderRadius: "5px",
              }}
            />
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
                width: "68%",
                background: "#f5f6f8",
                border: "none",
                color: "#152c5b",
                height: "40px",
                alignItems: "center",
              }}
            >
              <span>
                {format(state[0].startDate, "dd MMM")} -{" "}
                {format(state[0].endDate, "dd MMM")}
              </span>
            </Box>
          </Stack>
          {/* Date Range Picker Modal */}
          <Modal
            open={openDatePicker}
            onClose={() => setOpenDatePicker(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ backgroundColor: "white", padding: 4 }}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) =>
                  setState([
                    {
                      startDate: item.selection.startDate || new Date(),
                      endDate: item.selection.endDate || new Date(),
                      key: item.selection.key || "selection", // Ensures the key is not undefined
                    },
                  ])
                }
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
              <Button onClick={() => setOpenDatePicker(false)} sx={{ mt: 2 }}>
                Confirm
              </Button>
            </Box>
          </Modal>

          {/* Capacity Selector */}
          <Typography sx={{ color: "#152c5b", mb: 1 }}>Capacity</Typography>
          <Stack direction="row" alignItems="center" spacing={0}>
            <IconButton
              onClick={handleCapacityDecrease}
              sx={{
                bgcolor: "#FF5C63",
                color: "#fff",
                borderRadius: 2,
                width: "40px",
                height: "40px",
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              sx={{
                minWidth: "60%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                background: "#f5f6f8",
                height: "40px",
                color: "#152c5b",
              }}
            >
              {capacity} {capacity === 1 ? "person" : "persons"}
            </Typography>
            <IconButton
              onClick={handleCapacityIncrease}
              sx={{
                bgcolor: "#37D17C",
                color: "#fff",
                borderRadius: 2,
                width: "40px",
                height: "40px",
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Explore Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            backgroundColor: "#3252DF",
            padding: "10px 30px",
            textTransform: "none",
            fontWeight: "bold",
            width: "300px",
          }}
          onClick={handleExplore}
        >
          Explore
        </Button>
      </Stack>

      {/* Right side: Image */}
      <Stack direction="column" width={"600px"}>
        <Card
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            backgroundColor: "white",
          }}
        >
          <CardMedia
            component="img"
            alt="Vacation Home"
            height="100%"
            image={Banner} // Ensure the path to the image is correct
            sx={{ objectFit: "cover" }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
