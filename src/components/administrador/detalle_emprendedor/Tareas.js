import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import swal from "sweetalert2";

import CrearTarea from "./CrearTarea";
import RevisarTarea from "./RevisarTarea";
import FlexyTable from "src/components/FlexyTable";

import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/utils/constants";
import { HOST } from "src/utils/apiConstants";
import { useAPI_GET } from "src/services/hooks/useAPI";
import { Boton } from "src/assets/styles/emprendedor/primeraAtencion.style";
import { Card } from "react-bootstrap";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import {
  CardRuta,
  Ruta,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import DetalleTareaAdmin from "./DetalleTareaAdmin";

// import "../../../styles/TareasMentor.css";

function Tareas({ cedula, nombre, idProyectoEmprendimiento }) {
  const [crearTarea, setCrearTarea] = useState(false);
  const [revisarTarea, setRevisarTarea] = useState(false);
  const [idTarea, setIdTarea] = useState(null);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [pendientes, setPendientes] = useState([]);
  const [entregadas, setEntregadas] = useState([]);
  const [showPendientes, setShowPendientes] = useState({ show: false });
  const [showEntregadas, setShowEntregadas] = useState({ show: false });

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
    if (pendientesData && entregadasData) {
      let newEntregadas = [];
      let newPendientes = [];

      if (entregadasData.length > 0) {
        newEntregadas = entregadasData.map((entregadaData, index) => {
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

      if (pendientesData.length > 0) {
        newPendientes = pendientesData.map((pendienteData, index) => {
          return {
            n: index + 1,
            titulo: pendienteData.titulo,
            "Fecha Limite": moment(
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

  // const [loadingEntregadas, data, errorEntregadas] = useAPI_GET(
  //   `/Mentor/Tareas/Entregadas`,
  //   {
  //     headers: {
  //       Authorization:
  //         localStorage.getItem("token") || sessionStorage.getItem("token"),
  //     },
  //     params: {
  //       cedulaEmprendedor: cedula,
  //     },
  //   }
  // );

  // const [loadingPendientes, dataPendiente, errorPendientes] = useAPI_GET(
  //   `/Mentor/Tareas/Pendientes`,
  //   {
  //     headers: {
  //       Authorization:
  //         localStorage.getItem("token") || sessionStorage.getItem("token"),
  //     },
  //     params: {
  //       cedulaEmprendedor: cedula,
  //     },
  //   }
  // );

  function RevisarT({ idTarea }) {
    setIdTarea(idTarea);
    mostrarRevisarT();
  }
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
            .catch((err) => console.log(err.response));
        }
      });
  }
  /**Funciones que muestras u ocultan los modal */
  function ocultarModal() {
    setCrearTarea(false);
    setRevisarTarea(false);
  }
  function mostrarCrearT() {
    setCrearTarea(true);
  }
  function mostrarRevisarT() {
    setRevisarTarea(true);
  }
  /*---------------------------------------------------------------*/

  // if (loadingEntregadas || loadingPendientes) {
  //   return <div>Cargando</div>;
  // }

  // if (errorEntregadas || errorPendientes) {
  //   swal.fire({
  //     title:
  //       errorEntregadas.response.data.message ||
  //       errorPendientes.response.data.message,
  //     icon: "warning",
  //     confirmButtonText: "Aceptar",
  //     confirmButtonColor: "#9a66a8",
  //     showConfirmButton: true,
  //     showCloseButton: true,
  //   });
  // }

  if (
    pendientesLoading ||
    loadingComponent ||
    entregadasLoading ||
    !pendientesData
  ) {
    return <h1>LOADING EstadoRutaEmprendedor</h1>;
  }

  if (pendientesMessage || entregadasMessage) {
    return (
      <>
        <CardRuta>
          <Ruta>
            <p>{pendientesMessage || entregadasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
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
    <Card className="contenedor_tareas_mentor">
      <Boton className="btn btn-primary" onClick={mostrarCrearT}>
        Crear tarea
      </Boton>

      {entregadas.length > 0 && (
        <CardRuta>
          <Ruta>
            <FlexyTable
              datos={entregadas}
              titulo={"Tareas Entregadas"}
              btn1={"Revisar Entrega"}
              fun1={(tareaData) => {
                onClicRevisarTarea(tareaData);
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

      {pendientes.length > 0 && (
        <CardRuta>
          <Ruta>
            <FlexyTable
              datos={pendientes}
              titulo={"Tareas Pendientes"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData);
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

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

      {crearTarea ? (
        <CrearTarea show={crearTarea} setShow={ocultarModal} />
      ) : (
        revisarTarea && (
          <RevisarTarea
            show={revisarTarea}
            setShow={ocultarModal}
            idTarea={idTarea}
          />
        )
      )}
    </Card>
  );
}

export default Tareas;
