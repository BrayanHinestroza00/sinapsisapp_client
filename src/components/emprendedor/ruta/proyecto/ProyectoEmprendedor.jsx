import { useState } from "react";
import {
  CardRuta,
  Ruta,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import ProyectoEmprendimiento from "src/components/ProyectoEmprendimiento";

function ProyectoEmprendedor() {
  const [datos, setDatos] = useState({});
  return (
    <>
      <Titulo>Información del Proyecto de Emprendimiento</Titulo>

      <CardRuta>
        <Ruta>
          <ProyectoEmprendimiento datos={datos} />
        </Ruta>
      </CardRuta>
    </>
  );
}

export default ProyectoEmprendedor;
