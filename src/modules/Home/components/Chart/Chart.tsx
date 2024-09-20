import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart: React.FC = ({ booking }) => {
  console.log(booking);

  const data = {
    labels: ["Completed", "Pending"], // Labels for each section of the chart
    datasets: [
      {
        label: "Bookings",
        data: [booking.completed, booking.pending], // Completed and Pending bookings
        backgroundColor: [
          "rgba(33, 150, 243, 0.8)", // Primary color for Completed (blueish color)
          "#9D57D5", // Custom color for Pending (purple)
        ],
        borderColor: [
          "rgba(33, 150, 243, 1)", // Border for Completed
          "#9D57D5", // Border for Pending
        ],
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

  return <Doughnut data={data} options={options} />;
};

export default CircleChart;
