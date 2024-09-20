import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import axios from "axios";
import { getDashboard } from "../../../../constants/End_Points";
import CircleChart from "../Chart/Chart";
import UsersChart from "../Chart/UsersChart";

export default function Home() {
  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [ads, setAds] = useState(0);
  const [booking, setBooking] = useState([]);
  const [users, setUsers] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axios.get(getDashboard, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(response?.data?.data);
      setRooms(response?.data?.data.rooms);
      setFacilities(response?.data?.data.facilities);
      setAds(response?.data?.data.ads);
      setBooking(response?.data?.data.bookings);
      setUsers(response?.data?.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(function () {
    getDashboardData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space between the divs
          padding: 2,
          marginTop: "35px",
        }}
      >
        {["Rooms", "Facilities", "Ads"].map(function (ele) {
          return (
            <Box
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
          );
        })}
        {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Space between text and icon
          backgroundColor: "#1A1B1E",
          color: "white",
          padding: "3rem 2rem",
          width: "30%",
          borderRadius: "15px",
        }}
      >
        <Box>
          <Typography component="p">100</Typography>
          <Typography component="span">Rooms</Typography>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1A1B1E",
          color: "white",
          padding: 2,
          width: "30%",
          borderRadius: "15px",
        }}
      >
        <Box>
          <Typography component="p">100</Typography>
          <Typography component="span">Facilities</Typography>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1A1B1E",
          color: "white",
          padding: 2,
          width: "30%",
          borderRadius: "15px",
        }}
      >
        <Box>
          <Typography component="p">100</Typography>
          <Typography component="span">Ads</Typography>
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
      </Box> */}
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
            width: "350px", // Adjust the width here
            margin: "0 2rem", // Center the chart
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
            width: "350px", // Adjust the width here
            margin: "0 2rem", // Center the chart
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
    </>
  );
}
