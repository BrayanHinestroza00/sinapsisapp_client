import FlexyTable from "src/components/FlexyTable";
// import { MentorEmprendedorContext } from "src/services/context/MentorEmprendedorContext";
import { Card } from "react-bootstrap";
import {
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

// import "../../../styles/ConsultoriasMentor.css";

function Consultoria({ userData }) {
  // const { userData } = useContext(MentorEmprendedorContext);

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
