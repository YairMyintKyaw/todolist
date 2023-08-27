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
          labels: ["Not Started", "In Progress", "Done"],
          datasets: [
            {
              label: "# task(s)",
              data: taskCountArray,
              backgroundColor: [
                "rgb(248 113 113)",
                "rgb(250 204 21)",
                " rgb(74 222 128)",
              ],
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
