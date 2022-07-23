import React, { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Représentation des heures d'affluence",
    },
  },
};

const labels = ["8h", "12h", "15h", "18h", "21h"];

export const data = {
  labels,
  datasets: [
    {
      label: "Lundi",
      data: [100, 50, 3, 40, 2],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Mardi",
      data: [55],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },

    {
      label: "Mercredi",
      data: [12, 19, 3, 5, 2, 3, 55],
      backgroundColor: "rgba(53, 16, 235, 0.5)",
    },
    {
      label: "Jeudi",
      data: [12, 19, 3, 5, 2, 3, 55],
      backgroundColor: "rgba(53, 222, 235, 0.5)",
    },
    {
      label: "Vendredi",
      data: [12, 19, 3, 5, 2, 3, 55],
      backgroundColor: "rgba(53, 222, 15, 0.5)",
    },
  ],
};

const Graph = () => {
  return <Bar options={options} data={data} />;
};

export default memo(Graph);
