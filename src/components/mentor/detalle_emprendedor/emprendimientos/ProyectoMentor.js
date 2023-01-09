import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import ProyectoEmprendimiento from "src/components/ProyectoEmprendimiento";

const proyectos = [{ nombre: "SEA" }, { nombre: "Andres" }];

function ProyectoMentor() {
  const [datos, setDatos] = useState({});
  const [selected, setSelected] = useState(0);

  const onChangeSelectedProject = (index) => {
    setSelected(index);
  };

  return (
    <Card>
      {proyectos && proyectos.length > 1 && (
        <>
          <SubTitulo>Seleccione el proyecto... </SubTitulo>
          <div className="px-3">
            {proyectos.map((proyecto, index) => {
              return (
                <button
                  id={index}
                  className="btn btn-primary mx-1"
                  key={index}
                  onClick={() => onChangeSelectedProject(index)}
                >
                  {proyecto.nombre}
                </button>
              );
            })}
          </div>
        </>
      )}

      <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        <Ruta>
          <SubTitulo>
            Información del proyecto:{" "}
            <Auxiliar className="text-muted">
              {proyectos[selected].nombre}
            </Auxiliar>
          </SubTitulo>
          <ProyectoEmprendimiento datos={datos} />
        </Ruta>
      </CardRuta>
    </Card>
  );
}

export default ProyectoMentor;
