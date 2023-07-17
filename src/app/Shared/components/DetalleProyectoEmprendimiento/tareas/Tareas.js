import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import Axios from "axios";
import swal from "sweetalert2";

import CrearTarea from "./CrearTarea";
import RevisarTarea from "./RevisarTarea";
import DetalleTareaAdmin from "./DetalleTareaAdmin";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";
import { HOST } from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import {
  Card,
  CardRuta,
  Ruta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common";

function Tareas({ idProyectoEmprendimiento, idUsuario, tipoUsuario }) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [pendientes, setPendientes] = useState([]);
  const [entregadas, setEntregadas] = useState([]);
  const [showPendientes, setShowPendientes] = useState({ show: false });
  const [showEntregadas, setShowEntregadas] = useState({ show: false });
  const [showCrearTarea, setShowCrearTarea] = useState(false);

  // Custom Hooks
  const {
    data: pendientesData,
    message: pendientesMessage,
    error: pendientesError,
    loading: pendientesLoading,
    fetchAPI: fetchApiPendientes,
  } = useFetch();

  const {
    data: entregadasData,
    message: entregadasMessage,
    error: entregadasError,
    loading: entregadasLoading,
    fetchAPI: fetchApiEntregadas,
  } = useFetch();

  useEffect(() => {
    fetchApiPendientes({
      URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
          tipoBusqueda: "pendientes",
        },
      },
    });

    fetchApiEntregadas({
      URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
          tipoBusqueda: "entregadas",
        },
      },
    });

    setLoadingComponent(false);
  }, []);

  useEffect(() => {
    if (pendientesData || entregadasData) {
      let newEntregadas = [];
      let newPendientes = [];

      if (entregadasData && entregadasData.length > 0) {
        newEntregadas = entregadasData.map((entregadaData, index) => {
          return {
            n: index + 1,
            título: entregadaData.titulo,
            "Fecha Límite": moment(
              entregadaData.fechaLimiteEntrega,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA_HORA),
            "Creado Por":
              entregadaData.nombresCrea + " " + entregadaData.apellidosCrea,
            "Correo Contacto": entregadaData.correoInstitucionalCrea,
          };
        });
      }

      if (pendientesData && pendientesData.length > 0) {
        newPendientes = pendientesData.map((pendienteData, index) => {
          return {
            n: index + 1,
            título: pendienteData.titulo,
            "Fecha Límite": moment(
              pendienteData.fechaLimiteEntrega,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA_HORA),
            "Creado Por":
              pendienteData.nombresCrea + " " + pendienteData.apellidosCrea,
            "Correo Contacto": pendienteData.correoInstitucionalCrea,
          };
        });
      }

      setEntregadas(newEntregadas);
      setPendientes(newPendientes);
    }
  }, [pendientesData, entregadasData]);

  const onClicDetalleTarea = (tarea) => {
    setShowPendientes({
      show: true,
      data: pendientesData[tarea.n - 1],
      tipo: "PENDIENTES",
    });
  };

  const onClicRevisarTarea = (tarea) => {
    setShowEntregadas({
      show: true,
      data: entregadasData[tarea.n - 1],
      tipo: "ENTREGADAS",
    });
  };

  function EliminarT({ idTarea }) {
    swal
      .fire({
        title: "¿Estás seguro que deseas eliminar la tarea?",
        icon: "warning",
        iconColor: "#9a66a8",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#9a66a8",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      })
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios.delete(`${HOST}/Mentor/Tarea`, {
            headers: {
              Authorization:
                localStorage.getItem("token") ||
                sessionStorage.getItem("token"),
            },
            data: {
              idTarea,
            },
          })
            .then(() => {
              swal
                .fire({
                  title: "Eliminación exitosa",
                  icon: "success",
                  iconColor: "#9a66a8",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#9a66a8",
                  showConfirmButton: true,
                })
                .then(() => (window.location.href = window.location.pathname));
            })
            .catch((err) => console.error(err.response));
        }
      });
  }

  /*---------------------------------------------------------------*/

  if (
    pendientesLoading ||
    loadingComponent ||
    entregadasLoading
    // || !pendientesData
  ) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (
    (pendientesMessage && pendientesMessage != "Sin datos") ||
    (entregadasMessage && entregadasMessage != "Sin datos")
  ) {
    return (
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        <p>{pendientesMessage || entregadasMessage}</p>
      </Ruta>
    );
  }

  if (pendientesError || entregadasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{pendientesError || entregadasError}</p>
      </>
    );
  }

  return (
    <Card>
      <Subtitulo>Tareas del Emprendedor</Subtitulo>

      <Button
        className="btn btn-primary mx-4 my-3 w-25"
        onClick={() => setShowCrearTarea(!showCrearTarea)}
      >
        Crear tarea
      </Button>

      <CardRuta style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Ruta>
          {entregadas.length > 0 ? (
            <FlexyTable
              datos={entregadas}
              titulo={"Tareas Entregadas"}
              btn1={"Revisar Entrega"}
              fun1={(tareaData) => {
                onClicRevisarTarea(tareaData);
              }}
              adicional={true}
            />
          ) : (
            <h6>No hay tareas Entregadas por el Emprendedor</h6>
          )}
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          {pendientes.length > 0 ? (
            <FlexyTable
              datos={pendientes}
              titulo={"Tareas Pendientes"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData);
              }}
              adicional={true}
            />
          ) : (
            <h6>No hay tareas Pendientes del Emprendedor</h6>
          )}
        </Ruta>
      </CardRuta>

      {showEntregadas.show && (
        <RevisarTarea
          show={showEntregadas.show}
          data={showEntregadas.data}
          onHide={() => setShowEntregadas({ show: !showEntregadas.show })}
        />
      )}

      {showPendientes.show && (
        <DetalleTareaAdmin
          show={showPendientes.show}
          data={showPendientes.data}
          tipo={showPendientes.tipo}
          onHide={() => setShowPendientes({ show: !showPendientes.show })}
        />
      )}

      {showCrearTarea && (
        <CrearTarea
          show={showCrearTarea}
          idProyectoEmprendimiento={idProyectoEmprendimiento}
          onHide={() => setShowCrearTarea(!showCrearTarea)}
          idUsuario={idUsuario}
          tipoUsuario={tipoUsuario}
        />
      )}
    </Card>
  );
}

export default Tareas;
