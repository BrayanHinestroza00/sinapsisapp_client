import { Card, Subtitulo } from "src/app/Shared/assets/styles/Common";

import PrimeraAtencionComponent from "src/app/Administrador/components/DetalleSolicitudPrimeraAtencion/PrimeraAtencion";

function PrimeraAtencion({ idProyectoEmprendimiento }) {
  return (
    <Card>
      <Subtitulo>Información de Primera Atención</Subtitulo>

      <PrimeraAtencionComponent
        idProyectoEmprendimiento={idProyectoEmprendimiento}
      />
    </Card>
  );
}

export default PrimeraAtencion;
