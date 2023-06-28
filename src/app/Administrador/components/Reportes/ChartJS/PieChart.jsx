import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-labels/build/chartjs-plugin-labels.min.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ titulo, labels, data: datos }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: titulo,
      },
    },
    pieceLabel: {
      render: "value",
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "SinapsisAPP",
        data: datos,
        //backgroundColor: getRandomRGBColor(),
      },
    ],
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;
