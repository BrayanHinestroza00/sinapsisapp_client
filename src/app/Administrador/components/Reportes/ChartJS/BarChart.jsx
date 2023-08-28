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

function BarChart({
  titulo,
  labels,
  data: datos,
  data2: datos2,
  data3: datos3,
  data4: datos4,
  dataLabel,
  dataLabel2,
  dataLabel3,
  dataLabel4,
}) {
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { precision: 0 },
      },
    },
    plugins: {
      legend: {
        display:
          dataLabel || dataLabel2 || dataLabel3 || dataLabel4 ? true : false,
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
    datasets: datos4
      ? [
          {
            label: dataLabel || "SinapsisAPP",
            data: datos,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel2 || "SinapsisAPP2",
            data: datos2,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel3 || "SinapsisAPP3",
            data: datos3,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel4 || "SinapsisAPP4",
            data: datos4,
            //backgroundColor: getRandomRGBColor(),
          },
        ]
      : datos3
      ? [
          {
            label: dataLabel || "SinapsisAPP",
            data: datos,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel2 || "SinapsisAPP2",
            data: datos2,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel3 || "SinapsisAPP3",
            data: datos3,
            //backgroundColor: getRandomRGBColor(),
          },
        ]
      : datos2
      ? [
          {
            label: dataLabel || "SinapsisAPP",
            data: datos,
            //backgroundColor: getRandomRGBColor(),
          },
          {
            label: dataLabel2 || "SinapsisAPP2",
            data: datos2,
            //backgroundColor: getRandomRGBColor(),
          },
        ]
      : [
          {
            label: dataLabel || "SinapsisAPP",
            data: datos,
            //backgroundColor: getRandomRGBColor(),
          },
        ],
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
