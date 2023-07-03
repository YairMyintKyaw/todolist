import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Number of Finished Task Over time",
    },
  },
};

const LineChart = ({ countData }) => {
  console.log(countData);
  return (
    <>
      <Line
        className="w-full"
        options={options}
        data={{
          labels: [7, 6, 5, 4, 3, 2, 1],
          datasets: [
            {
              label: "Dataset 2",
              data: countData,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
      />
    </>
  );
};

export default LineChart;
