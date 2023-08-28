import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
  Legend,
} from "chart.js";

import { getRandomRGBColor } from "src/app/Shared/utils/utilityFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Colors,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function BarChart2({ titulo, labels, data: datos, dataLabel }) {
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { precision: 0 },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: titulo,
      },
      datalabels: {
        display: true,
        color: "black",
        align: "center",
        font: { size: "14" },
        clamp: true,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: dataLabel,
  };

  return <Bar data={data} options={options} />;
}

export default BarChart2;
