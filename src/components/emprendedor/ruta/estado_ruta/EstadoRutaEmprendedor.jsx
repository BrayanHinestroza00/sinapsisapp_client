import { useState, useEffect } from "react";
import axios from "axios";

import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EstadoRuta from "src/components/EstadoRuta";
import AvanceRuta from "src/components/AvanceRuta";

const etapa = "Pensar";

function EstadoRutaEmprendedor() {
  const [ruta, setRuta] = useState({
    sonar: {
      progress: 0,
      color: "",
      active: false,
    },
    pensar: {
      progress: 0,
      color: "",
      active: false,
    },
    testear: {
      progress: 0,
      color: "",
      active: false,
    },
    arrancar: {
      progress: 0,
      color: "",
      active: false,
    },
  });

  return (
    <>
      <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>
      <CardRuta>
        <Ruta>
          <SubTitulo>
            Actualmente se encuentra en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>
          <EstadoRuta etapa={etapa} />
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <SubTitulo>
            Mi Avance en la ruta de I&E en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>
          <AvanceRuta />
        </Ruta>
      </CardRuta>
    </>
  );
}

export default EstadoRutaEmprendedor;
