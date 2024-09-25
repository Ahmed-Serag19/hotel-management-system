import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import axios from "axios";
import { getDashboard } from "../../../../constants/End_Points";
import CircleChart from "../Chart/Chart";
import UsersChart from "../Chart/UsersChart";
import Layout from "../../../Shared/components/Layout/Layout";
import Footer from "../../../Shared/Footer/Footer";
import { toast } from "react-toastify";


interface BookingData {
  completed: number;
  pending: number;
}

interface UsersData {
  admin: number;
  user: number;
}

export default function Home() {
  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [ads, setAds] = useState(0);
  const [booking, setBooking] = useState<BookingData>({
    completed: 0,
    pending: 0,
  });
  const [users, setUsers] = useState<UsersData>({ admin: 0, user: 0 });

  const getDashboardData = async () => {
    try {
      const response = await axios.get(getDashboard, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setRooms(response?.data?.data.rooms);
      setFacilities(response?.data?.data.facilities);
      setAds(response?.data?.data.ads);
      setBooking({
        completed: response?.data?.data.bookings.completed,
        pending: response?.data?.data.bookings.pending,
      });
      setUsers({
        admin: response?.data?.data.users.admin,
        user: response?.data?.data.users.user,
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      {/* <Layout /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          marginTop: "35px",
        }}
      >
        {["Rooms", "Facilities", "Ads"].map((ele) => (
          <Box
            key={ele}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#1A1B1E",
              color: "white",
              padding: "3rem 2rem",
              width: "30%",
              borderRadius: "15px",
            }}
          >
            <Box>
              <Typography component="p">
                {ele === "Rooms"
                  ? rooms
                  : ele === "Facilities"
                  ? facilities
                  : ads}
              </Typography>
              <Typography component="span">{ele}</Typography>
            </Box>

            <WorkTwoToneIcon
              sx={{
                backgroundColor: "#203FC733",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                padding: "10px",
              }}
              color="primary"
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            width: "350px",
            margin: "0 2rem",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: "15px",
            paddingBlock: "5px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBlock: "8px 15px",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            Booking
          </Typography>
          <CircleChart booking={booking} />
        </Box>

        <Box
          sx={{
            width: "350px",
            margin: "0 2rem",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: "15px",
            paddingBlock: "5px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBlock: "8px 15px",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            Users
          </Typography>
          <UsersChart users={users} />
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
