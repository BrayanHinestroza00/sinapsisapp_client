import React, { useEffect, useState } from "react";
import moment from "moment";

import FlexyTable from "src/components/FlexyTable";

import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/utils/constants";
import { Card } from "react-bootstrap";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import {
  CardRuta,
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import DetalleTareaAdmin from "./DetalleTareaAdmin";

function HistorialTareas({ idProyectoEmprendimiento }) {
  const [historial, setHistorial] = useState([]);
  const [showHistorial, setShowHistorial] = useState({ show: false });

  // Custom Hooks
  const {
    data: historialData,
    message: historialMessage,
    error: historialError,
    loading: historialLoading,
    fetchAPI: fetchApiHistorial,
  } = useFetch();

  useEffect(() => {
    fetchApiHistorial({
      URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
          tipoBusqueda: "historial",
        },
      },
    });
  }, []);

  useEffect(() => {
    if (historialData) {
      let newHistorial = [];

      if (historialData && historialData.length > 0) {
        newHistorial = historialData.map((entregadaData, index) => {
          return {
            n: index + 1,
            titulo: entregadaData.titulo,
            "Fecha Limite": moment(
              entregadaData.fechaLimiteEntrega,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA_HORA),
            "Creado Por":
              entregadaData.nombresCrea + " " + entregadaData.apellidosCrea,
            "Correo Contacto": entregadaData.correoInstitucionalCrea,
          };
        });
      }

      setHistorial(newHistorial);
    }
  }, [historialData]);

  const onClicDetalleTarea = (tarea) => {
    setShowHistorial({
      show: true,
      data: historialData[tarea.n - 1],
      tipo: "HISTORIAL",
    });
  };

  if (historialLoading) {
    return <h1>LOADING HistorialTareas</h1>;
  }

  if (historialMessage && historialMessage != "Sin datos") {
    return (
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        <p>{historialMessage}</p>
      </Ruta>
    );
  }

  if (historialError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{historialError}</p>
      </>
    );
  }

  return (
    <Card>
      <SubTitulo>Historial de Tareas del Emprendedor</SubTitulo>

      <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        <Ruta>
          {historial.length > 0 ? (
            <FlexyTable
              datos={historial}
              titulo={"Historial Tareas"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData);
              }}
              adicional={true}
            />
          ) : (
            <h6>El emprendedor no cuenta con tareas registradas</h6>
          )}
        </Ruta>
      </CardRuta>

      {showHistorial.show && (
        <DetalleTareaAdmin
          tipo={"historial"}
          show={showHistorial.show}
          data={showHistorial.data}
          onHide={() => setShowHistorial({ show: !showHistorial.show })}
        />
      )}
    </Card>
  );
}

export default HistorialTareas;
