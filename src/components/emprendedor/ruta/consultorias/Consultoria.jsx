import { Link } from "react-router-dom";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

import logoSinapsis from "src/assets/images/Logo_Sinapsis.png";

function Consultoria() {
  return (
    <>
      <Titulo>
        Consultorías{" "}
        <Auxiliar>
          <Link to={"/Emprendedor/Ruta/Consultoria/Historial"}>
            Ver historial
          </Link>
        </Auxiliar>
      </Titulo>
      <CardRuta>
        <Ruta>
          <SubTitulo>Proxima Consultoría:</SubTitulo>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>
                Mentor: <Auxiliar>Andres Fernando Solano</Auxiliar>
              </h5>
              <h5>
                Correo: <Auxiliar>afsolano@uao.edu.co</Auxiliar>
              </h5>
              <h5>
                Fecha de consultoría:{" "}
                <Auxiliar>Viernes, 15 de diciembre del 2022</Auxiliar>
              </h5>
              <h5>
                Hora de inicio: <Auxiliar>3:00 p.m.</Auxiliar>
              </h5>
              <h5>
                Hora de finalización: <Auxiliar>4:00 p.m.</Auxiliar>
              </h5>
            </div>
            <img
              src={logoSinapsis}
              alt="Logo Sinapsis"
              style={{ width: "30%" }}
            />
          </div>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Consultoria;
