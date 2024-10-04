import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Link,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import RoomImg2 from "../../../../assets/images/room img.png";
import RoomImg3 from "../../../../assets/images/room img2.png";
import ic_bedroom from "../../../../assets/images/ic_bedroom.png";
import ic_livingroom from "../../../../assets/images/ic_livingroom.png";
import ic_bathroom from "../../../../assets/images/ic_bathroom.png";
import ic_diningroom from "../../../../assets/images/ic_diningroom 1.png";
import ic_wifi from "../../../../assets/images/ic_wifi.png";
import ic_ac from "../../../../assets/images/ic_ac.png";
import ic_kulkas from "../../../../assets/images/ic_kulkas.png";
import ic_tv from "../../../../assets/images/ic_tv.png";
import { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";
import { RoomsUrl, UserBookingsUrl } from "../../../../constants/End_Points";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "./ReviewsSection";
import { toast } from "react-toastify";

type Facility = {
  _id: string;
  name: string;
};

type RoomDetails = {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
};

function RoomDetail() {
  const { roomId } = useParams();
  const location = useLocation();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { startDate, endDate, capacity } = location.state || {
    startDate: new Date(),
    endDate: new Date(),
    capacity: 2,
  };
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);

  const calculateTotalDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpenLoginModal(true);
    } else {
      try {
        const totalDays = calculateTotalDays(
          state[0].startDate,
          state[0].endDate
        );
        const totalCost = totalDays * (roomDetails?.price ?? 0) * capacity;
        const discountAmount = (totalCost * (roomDetails?.discount ?? 0)) / 100;
        const finalCost = totalCost - discountAmount;

        // Prepare the booking data
        const bookingData = {
          startDate: state[0].startDate.toISOString().split("T")[0], // format as YYYY-MM-DD
          endDate: state[0].endDate.toISOString().split("T")[0],
          room: roomId,
          totalPrice: finalCost,
        };

        // Make the POST request to create a booking
        const response = await axios.post(
          UserBookingsUrl.createBooking,
          bookingData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        // Handle success response
        if(response.data.success == true){
          toast.success(response.data.message);
          navigate(`/dashboard/payment/${response.data.data.booking._id}`) // Redirect user after booking
        }
      } catch (error) {
        // Handle error during booking
        console.error("Error creating booking:", error);
        toast.error("Failed to create booking. Please try again.");
      }
    }
  };

  useEffect(() => {
    // Fetch room details using roomId
    const fetchRoomDetails = async () => {
      try {
        console.log("Fetching room details for ID:", roomId);
        const response = await axios.get(RoomsUrl.getRoomDetails(roomId!));

        if (response.data && response.data.data && response.data.data.room) {
          setRoomDetails(response.data.data.room);
          setLoading(false);
        } else {
          throw new Error("Room data is missing from the response");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Error fetching room details. Please try again later.");
        setLoading(false); // Turn off loading state
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  // Show loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Ensure room details exist
  if (!roomDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          No room details found. Please try again later.
        </Typography>
      </Box>
    );
  }

  // Calculate the total cost
  const totalDays = calculateTotalDays(state[0].startDate, state[0].endDate);
  const totalCost = totalDays * roomDetails.price * capacity;
  const discountAmount = (totalCost * roomDetails.discount) / 100;
  const finalCost = totalCost - discountAmount;

  return (
    <>
      {/* Breadcrumbs */}
      <Stack direction="row" sx={{ padding: 5, alignItems: "center" }}>
        <Box role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "#152C5B" }}>Room Details</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginX: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#152C5B", fontWeight: 600 }}>
            {roomDetails?.roomNumber}
          </Typography>
          <Typography sx={{ color: "#B0B0B0" }}>
            Created by: {roomDetails?.createdBy.userName}
          </Typography>
        </Box>
      </Stack>
      {/* Room Images */}
      <Box sx={{ padding: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={roomDetails.images[0]} // Dynamically load first image
              alt="First Image"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img
                src={roomDetails?.images[1] ? roomDetails.images[1] : RoomImg2}
                alt="Second Image"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <img
                src={roomDetails?.images[2] || RoomImg3}
                alt="Third Image"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
      {/* Details */}
      <Box sx={{ paddingY: 5, paddingX: 2 }}>
        <Grid container spacing={2}>
          {/* Aboute room */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              <Typography
                sx={{ lineHeight: 1.7 }}
                variant="body1"
                color="#B0B0B0"
              >
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
                <br />
                <br />
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
                <br />
                <br />
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
            </Box>
            <Grid container spacing={20} rowSpacing={4} paddingY={3}>
              <Grid size={3}>
                <img src={ic_bedroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    {Math.ceil(Math.random() * 6)}
                  </span>{" "}
                  beds
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_livingroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    2
                  </span>{" "}
                  living
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_bathroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    1
                  </span>{" "}
                  bathroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_diningroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    1
                  </span>{" "}
                  dining
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_wifi} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    10
                  </span>
                  mbp/s
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_ac} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  Ac units
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_kulkas} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    2
                  </span>{" "}
                  fridges
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_tv} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    4
                  </span>{" "}
                  Televisions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Start booking */}
          <Grid
            size={{ xs: 12, md: 5 }}
            padding={9}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h4" color="#152C5B">
                Start Booking
              </Typography>
              <Typography variant="h3">
                <span style={{ color: "#1ABC9C" }}>{roomDetails.price}$</span>{" "}
                per night
              </Typography>
              <Typography variant="h5" color="red">
                {roomDetails.discount}% discount applied
              </Typography>
            </Stack>
            {/* Pick Data */}
            <Stack sx={{ mt: 4 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#152c5b",
                  fontSize: "18px",
                }}
              >
                Pick a Date
              </Typography>

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

              <Typography color="#B0B0B0" marginY={2}>
                You will pay{" "}
                <span style={{ color: "#152C5B" }}>
                  ${finalCost} USD instead of ${totalCost}
                </span>{" "}
                <br />
                for{" "}
                <span style={{ color: "#152C5B", marginRight: 1 }}>
                  {capacity} Person(s)
                </span>
                for <span style={{ color: "#152C5B" }}>{totalDays}</span>{" "}
                night(s)
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#3252DF",
                  padding: { xs: "10px 20px", md: "10px 30px" },
                  textTransform: "none",
                  fontWeight: "bold",
                  width: { xs: "200px", md: "300px" },
                }}
                onClick={handleBooking}
              >
                Continue Book
              </Button>
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
                          key: item.selection.key || "selection",
                        },
                      ])
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                  <Button
                    onClick={() => setOpenDatePicker(false)}
                    sx={{ mt: 2 }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Modal>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* Review and Comments */}
      <ReviewsSection />
      {/* Popup Modal */}

      <Modal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6" color="#152C5B" sx={{ mb: 2 }}>
            To book a room, you need to log in first.
          </Typography>
          <Button
            variant="contained"
        
            sx={{ backgroundColor: "green", marginX: 3 }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </Button>
          <Button variant="outlined" onClick={() => setOpenLoginModal(false)}>
            Continue Browsing
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default RoomDetail;
