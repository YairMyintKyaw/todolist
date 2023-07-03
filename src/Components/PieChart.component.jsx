import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ taskCountArray }) => {
  return (
    <>
      <Pie
        className="w-full"
        options={{}}
        data={{
          labels: ["Not Started", "On Progress", "Done"],
          datasets: [
            {
              label: "# of Votes",
              data: taskCountArray,
              backgroundColor: ["#fecaca", "#fef08a", "#bbf7d0"],
              borderColor: ["#fecaca", "#fef08a", "#bbf7d0"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </>
  );
};

export default PieChart;
