import { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";

import {
  Auxiliar,
  CardRuta,
  CirculoRuta,
  NumeroRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

const etapa = "Pensar";

function EstadoRuta() {
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

  useEffect(() => {
    switch (etapa) {
      case "Soñar":
        setRuta({
          sonar: {
            progress: 25,
            color: "bg-success",
            active: true,
          },
          pensar: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
          testear: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
          arrancar: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
        });
        break;

      case "Pensar":
        setRuta({
          sonar: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          pensar: {
            progress: 25,
            color: "bg-success",
            active: true,
          },
          testear: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
          arrancar: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
        });
        break;

      case "Testear":
        setRuta({
          sonar: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          pensar: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          testear: {
            progress: 25,
            color: "bg-success",
            active: true,
          },
          arrancar: {
            progress: 0,
            color: "bg-secondary",
            active: false,
          },
        });
        break;

      case "Arrancar":
        setRuta({
          sonar: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          pensar: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          testear: {
            progress: 25,
            color: "bg-success",
            active: false,
          },
          arrancar: {
            progress: 25,
            color: "bg-success",
            active: true,
          },
        });
        break;

      default:
        setRuta({
          sonar: {
            progress: 0,
            color: "",
          },
          pensar: {
            progress: 0,
            color: "",
          },
          testear: {
            progress: 0,
            color: "",
          },
          arrancar: {
            progress: 0,
            color: "",
          },
        });
        break;
    }
  }, []);

  return (
    <>
      <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>
      <CardRuta>
        <Ruta>
          <SubTitulo>
            Actualmente se encuentra en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>

          <div className="d-flex justify-content-around mb-1">
            <div className="text-center">
              <div className="mr-auto ml-auto">Soñar</div>
              <CirculoRuta className={ruta.sonar.color}>
                <NumeroRuta>1</NumeroRuta>
              </CirculoRuta>
            </div>
            <div className="text-center">
              <div className="mr-auto ml-auto">Pensar</div>
              <CirculoRuta className={ruta.pensar.color}>
                <NumeroRuta>2</NumeroRuta>
              </CirculoRuta>
            </div>
            <div className="text-center">
              <div className="mr-auto ml-auto">Testear</div>
              <CirculoRuta className={ruta.testear.color}>
                <NumeroRuta>3</NumeroRuta>
              </CirculoRuta>
            </div>
            <div className="text-center">
              <div className="mr-auto ml-auto">Arrancar</div>
              <CirculoRuta className={ruta.arrancar.color}>
                <NumeroRuta>4</NumeroRuta>
              </CirculoRuta>
            </div>
          </div>

          <ProgressBar>
            <ProgressBar variant="success" now={ruta.sonar.progress} key={1} />
            <ProgressBar variant="success" now={ruta.pensar.progress} key={2} />
            <ProgressBar
              variant="success"
              now={ruta.testear.progress}
              key={3}
            />
            <ProgressBar
              variant="success"
              now={ruta.arrancar.progress}
              key={4}
            />
          </ProgressBar>
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <SubTitulo>
            Mi Avance en la ruta de I&E en la etapa:{" "}
            <Auxiliar className="text-muted">{etapa}</Auxiliar>
          </SubTitulo>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default EstadoRuta;
