import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UsersChart: React.FC = ({ users }) => {
  const data = {
    labels: ["Admin", "User"], // Admin and User labels
    datasets: [
      {
        label: "Users",
        data: [users.admin, users.user],
        backgroundColor: ["#35C2FD", "#54D14D"], // Colors for Admin and User
        borderColor: ["#35C2FD", "#54D14D"], // Border colors for Admin and User
        borderWidth: 5,
        cutout: "70%", // This will create space in the middle for the text
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Description below the chart */}
      <Box sx={{ display: "flex", mb: "5px" }}>
        <Typography sx={{ marginInline: "10px" }}>Admins: 131</Typography>
        <Typography>Users: 300</Typography>
      </Box>

      <Box sx={{ position: "relative", width: "200px", height: "200px" }}>
        {/* The Doughnut Chart */}
        <Doughnut data={data} options={options} />

        {/* The word 'Users' in the middle */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Users
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersChart;
