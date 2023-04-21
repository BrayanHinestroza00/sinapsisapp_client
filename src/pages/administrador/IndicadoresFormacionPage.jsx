import { Card } from "react-bootstrap";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import LineChart from "src/components/administrador/chartjs/LineChart";

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
