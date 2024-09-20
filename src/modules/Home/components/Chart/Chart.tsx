import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the types for the booking prop
interface CircleChartProps {
  booking: {
    completed: number;
    pending: number;
  };
}

const CircleChart: React.FC<CircleChartProps> = ({ booking }) => {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Bookings",
        data: [booking.completed, booking.pending],
        backgroundColor: ["rgba(33, 150, 243, 0.8)", "#9D57D5"],
        borderColor: ["rgba(33, 150, 243, 1)", "#9D57D5"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: "5px", justifyContent: "center" }}>
        <Typography sx={{ marginInline: "10px" }}>
          Completed: {data?.datasets[0].data[0]}
        </Typography>
        <Typography>Pending: {data?.datasets[0].data[1]}</Typography>
      </Box>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default CircleChart;
