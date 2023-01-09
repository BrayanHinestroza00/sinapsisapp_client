import { useState, useContext } from "react";
import ReactFlexyTable from "react-flexy-table";
import Axios from "axios";
import swal from "sweetalert2";

import FlexyTable from "src/components/FlexyTable";
import RevisarConsultoria from "./RevisarConsultoria";
import { HOST } from "src/utils/constants";
import { useAPI_GET } from "src/services/hooks/useAPI";
import { MentorEmprendedorContext } from "src/services/context/MentorEmprendedorContext";
import { Card } from "react-bootstrap";
import {
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

// import "../../../styles/ConsultoriasMentor.css";

function Consultoria() {
  const { userData } = useContext(MentorEmprendedorContext);

  return (
    <Card>
      <SubTitulo>Consultorías programadas</SubTitulo>
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        {/* <SubTitulo>CONSULTARÍAS PROGRAMADAS</SubTitulo> */}
        {data.length > 0 ? (
          <FlexyTable datos={data} titulo={"consultorías programadas"} />
        ) : (
          <>No hay consultorías programadas</>
        )}
      </Ruta>
    </Card>
  );
}

const data = [
  {
    ID: "1",
    Nombre: "Brayan Hinestroza",
    Correo: "123@gmail.com",
    Mentor: "Andres Solano",
    "Correo Mentor": "1234@gmail.com",
  },
];

export default Consultoria;
