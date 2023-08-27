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
      text: "Number of Finished Task Last Week",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const getDay = (day) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

const LineChart = ({ countData }) => {
  const todayDate = new Date();
  const thisYear = todayDate.getFullYear();
  const thisMonth = todayDate.getMonth();
  const today = todayDate.getDate();

  return (
    <>
      <Line
        className="min-w-full  "
        options={options}
        data={{
          labels: [
            getDay(new Date(thisYear, thisMonth, today - 6).getDay()),
            getDay(new Date(thisYear, thisMonth, today - 5).getDay()),
            getDay(new Date(thisYear, thisMonth, today - 4).getDay()),
            getDay(new Date(thisYear, thisMonth, today - 3).getDay()),
            getDay(new Date(thisYear, thisMonth, today - 2).getDay()),
            getDay(new Date(thisYear, thisMonth, today - 1).getDay()),
            getDay(todayDate.getDay()),
          ],
          datasets: [
            {
              label: "Finished Tasks",
              data: countData,
              borderColor: "#1d3557",
              backgroundColor: "#f1faee",
              tension: 0.1,
            },
          ],
        }}
      />
    </>
  );
};

export default LineChart;
