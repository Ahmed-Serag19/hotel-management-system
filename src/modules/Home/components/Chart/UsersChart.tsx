import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the types for the users prop
interface UsersChartProps {
  users: {
    admin: number;
    user: number;
  };
}

const UsersChart: React.FC<UsersChartProps> = ({ users }) => {
  const data = {
    labels: ["Admin", "User"],
    datasets: [
      {
        label: "Users",
        data: [users.admin, users.user],
        backgroundColor: ["#35C2FD", "#54D14D"],
        borderColor: ["#35C2FD", "#54D14D"],
        borderWidth: 5,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        <Typography sx={{ marginInline: "10px" }}>
          Admins: {users.admin}
        </Typography>
        <Typography>Users: {users.user}</Typography>
      </Box>

      <Box sx={{ position: "relative", width: "200px", height: "200px" }}>
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
