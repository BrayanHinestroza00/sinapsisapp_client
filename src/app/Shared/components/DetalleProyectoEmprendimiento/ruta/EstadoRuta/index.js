import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import moment from "moment";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner.jsx";

import { CirculoRuta, NumeroRuta } from "./styled.js";
import {
  T_SINAPSIS_ETAPAS_RUTA_ARRANCAR,
  T_SINAPSIS_ETAPAS_RUTA_PENSAR,
  T_SINAPSIS_ETAPAS_RUTA_SONAR,
  T_SINAPSIS_ETAPAS_RUTA_TESTEAR,
  SINAPSIS_APP_FORMATO_FECHA,
} from "src/app/Shared/utils/constants";

function EstadoRuta({ etapa, avance }) {
  const [loading, setLoading] = useState(true);
  const [ruta, setRuta] = useState({});

  useEffect(() => {
    switch (etapa) {
      case T_SINAPSIS_ETAPAS_RUTA_SONAR:
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

      case T_SINAPSIS_ETAPAS_RUTA_PENSAR:
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

      case T_SINAPSIS_ETAPAS_RUTA_TESTEAR:
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

      case T_SINAPSIS_ETAPAS_RUTA_ARRANCAR:
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

    setLoading(false);
  }, [etapa]);

  if (loading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  return (
    <>
      <div className="d-flex justify-content-around mb-1">
        <div className="text-center">
          <div className="mr-auto ml-auto">Soñar</div>
          <CirculoRuta className={ruta.sonar.color}>
            <NumeroRuta>1</NumeroRuta>
          </CirculoRuta>
          {avance?.[0] && (
            <div className="mr-auto ml-auto my-1">
              {moment(avance[0].fechaInicio, "YYYY-MM-DD hh:mm:ss").format(
                SINAPSIS_APP_FORMATO_FECHA
              )}
              -{" "}
              {avance[0].fechaFin
                ? moment(avance[0].fechaFin, "YYYY-MM-DD hh:mm:ss").format(
                    SINAPSIS_APP_FORMATO_FECHA
                  )
                : "Sin Registro"}
            </div>
          )}
        </div>
        <div className="text-center">
          <div className="mr-auto ml-auto">Pensar</div>
          <CirculoRuta className={ruta.pensar.color}>
            <NumeroRuta>2</NumeroRuta>
          </CirculoRuta>
          {avance?.[1] && (
            <div className="mr-auto ml-auto my-1">
              {moment(avance[1].fechaInicio, "YYYY-MM-DD hh:mm:ss").format(
                SINAPSIS_APP_FORMATO_FECHA
              )}
              -{" "}
              {avance[1].fechaFin
                ? moment(avance[1].fechaFin, "YYYY-MM-DD hh:mm:ss").format(
                    SINAPSIS_APP_FORMATO_FECHA
                  )
                : "Sin Registro"}
            </div>
          )}
        </div>
        <div className="text-center">
          <div className="mr-auto ml-auto">Testear</div>
          <CirculoRuta className={ruta.testear.color}>
            <NumeroRuta>3</NumeroRuta>
          </CirculoRuta>
          {avance?.[2] && (
            <div className="mr-auto ml-auto my-1">
              {moment(avance[2].fechaInicio, "YYYY-MM-DD hh:mm:ss").format(
                SINAPSIS_APP_FORMATO_FECHA
              )}
              -{" "}
              {avance[2].fechaFin
                ? moment(avance[2].fechaFin, "YYYY-MM-DD hh:mm:ss").format(
                    SINAPSIS_APP_FORMATO_FECHA
                  )
                : "Sin Registro"}
            </div>
          )}
        </div>
        <div className="text-center">
          <div className="mr-auto ml-auto">Arrancar</div>
          <CirculoRuta className={ruta.arrancar.color}>
            <NumeroRuta>4</NumeroRuta>
          </CirculoRuta>
          {avance?.[3] && (
            <div className="mr-auto ml-auto my-1">
              {moment(avance[3].fechaInicio, "YYYY-MM-DD hh:mm:ss").format(
                SINAPSIS_APP_FORMATO_FECHA
              )}
              -{" "}
              {avance[3].fechaFin
                ? moment(avance[3].fechaFin, "YYYY-MM-DD hh:mm:ss").format(
                    SINAPSIS_APP_FORMATO_FECHA
                  )
                : "Sin Registro"}
            </div>
          )}
        </div>
      </div>

      <ProgressBar>
        <ProgressBar variant="success" now={ruta.sonar.progress} key={1} />
        <ProgressBar variant="success" now={ruta.pensar.progress} key={2} />
        <ProgressBar variant="success" now={ruta.testear.progress} key={3} />
        <ProgressBar variant="success" now={ruta.arrancar.progress} key={4} />
      </ProgressBar>
    </>
  );
}

export default EstadoRuta;
