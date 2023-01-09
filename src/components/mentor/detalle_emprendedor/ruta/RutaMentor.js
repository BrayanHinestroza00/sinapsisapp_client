import { Card } from "react-bootstrap";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import AvanceRuta from "src/components/AvanceRuta";
import EstadoRuta from "src/components/EstadoRuta";

function RutaMentor() {
  return (
    <Card>
      <SubTitulo>Estado de la ruta de I&E de SINAPSIS UAO</SubTitulo>
      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <SubTitulo>
            Actualmente el emprendedor se encuentra en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>
          <EstadoRuta etapa={etapa} />
        </Ruta>
      </CardRuta>

      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <SubTitulo>
            Avance en la ruta de I&E del emprendedor en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>
          <AvanceRuta />
        </Ruta>
      </CardRuta>
    </Card>
  );
}

const etapa = "Testear";

export default RutaMentor;
