/**
 * Para mayores Charts ingrese en:
 * https://react-chartjs-2.js.org/examples
 */

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

function LineChart({
  titulo,
  labels,
  data: datos,
  data2: datos2,
  dataLabel,
  dataLabel2,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: dataLabel || dataLabel2 ? true : false,
        position: "top",
      },
      title: {
        display: true,
        text: titulo,
      },
    },
  };

  const labelsConst = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: labels || labelsConst,
    datasets: datos2
      ? [
          {
            label: dataLabel || "Consultoría Normal",
            data: datos || [5, 6, 7],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: dataLabel2 || "Consultoría Especializada",
            data: datos2 || [3, 2, 1],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ]
      : [
          {
            label: dataLabel || "Dataset 1",
            data: datos || [5, 6, 7],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
  };
  return <Line data={data} options={options} />;
}

export default LineChart;
