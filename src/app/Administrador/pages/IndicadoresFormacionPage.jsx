import { Card } from "src/app/Shared/assets/styles/Common.js";
import { Titulo } from "src/app/Shared/assets/styles/Common";
import LineChart from "src/app/Shared/components/ChartJS/LineChart";

function IndicadoresFormacionPage() {
  return (
    <Card>
      <Titulo>Reporte con Indicadores de Formacion</Titulo>

      <div className="container-fluid">
        <LineChart />
      </div>
    </Card>
  );
}

export default IndicadoresFormacionPage;
