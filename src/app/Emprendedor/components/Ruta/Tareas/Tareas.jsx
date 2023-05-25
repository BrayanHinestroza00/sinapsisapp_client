import { useContext, useEffect, useState } from "react";
import moment from "moment";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import DetalleTarea from "./DetalleTarea";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common.js";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";

function Tareas() {
  const { userData, selectedProjectIndex, loading } =
    useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [pendientes, setPendientes] = useState([]);
  const [entregadas, setEntregadas] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showPendientes, setShowPendientes] = useState({ show: false });
  const [showEntregadas, setShowEntregadas] = useState({ show: false });
  const [showTodos, setShowTodos] = useState({ show: false });

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

  const {
    data: todasData,
    message: todasMessage,
    error: todasError,
    loading: todasLoading,
    fetchAPI: fetchApiTodas,
  } = useFetch();

  useEffect(() => {
    if (userData && selectedProjectIndex != null) {
      fetchApiPendientes({
        URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "pendientes",
          },
        },
      });

      fetchApiEntregadas({
        URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "entregadas",
          },
        },
      });

      fetchApiTodas({
        URL: URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "historial",
          },
        },
      });

      setLoadingComponent(false);
    }
  }, [userData, selectedProjectIndex]);

  useEffect(() => {
    if (pendientesData || entregadasData || todasData) {
      let newEntregadas = [];
      let newPendientes = [];
      let newTodos = [];

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

      if (todasData && todasData.length > 0) {
        newTodos = todasData.map((todaData, index) => {
          return {
            n: index + 1,
            título: todaData.titulo,
            "Fecha Entregada": moment(
              todaData.fechaEntrega,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA_HORA),
            "Creado Por": todaData.nombresCrea + " " + todaData.apellidosCrea,
            Calificación: todaData.calificacion,
          };
        });
      }

      setEntregadas(newEntregadas);
      setPendientes(newPendientes);
      setTodos(newTodos);
    }
  }, [pendientesData, entregadasData, todasData]);

  const onClicDetalleTarea = (tarea, tipo) => {
    switch (tipo) {
      case "ENTREGADAS":
        setShowEntregadas({
          show: true,
          data: entregadasData[tarea.n - 1],
          tipo: "ENTREGADAS",
        });
        break;
      case "PENDIENTES":
        setShowPendientes({
          show: true,
          data: pendientesData[tarea.n - 1],
          tipo: "PENDIENTES",
        });
        break;
      case "HISTORIAL":
        setShowTodos({
          show: true,
          data: todasData[tarea.n - 1],
          tipo: "HISTORIAL",
        });
        break;

      default:
        break;
    }
  };

  if (
    pendientesLoading ||
    todasLoading ||
    loading ||
    loadingComponent ||
    entregadasLoading
  ) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (
    (pendientesMessage && pendientesMessage != "Sin datos") ||
    (entregadasMessage && entregadasMessage != "Sin datos") ||
    (todasMessage && todasMessage != "Sin datos")
  ) {
    return (
      <>
        <Titulo>Mis Tareas</Titulo>

        <CardRuta>
          <Ruta>
            <p>{pendientesMessage || entregadasMessage || todasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (pendientesError || entregadasError || todasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{pendientesError || entregadasError || todasError}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Mis Tareas</Titulo>

      {entregadas && entregadas.length > 0 && (
        <CardRuta className="mb-3">
          <Ruta>
            <FlexyTable
              datos={entregadas}
              titulo={"Tareas Entregadas"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "ENTREGADAS");
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

      {pendientes && pendientes.length > 0 && (
        <CardRuta className="mb-3">
          <Ruta>
            <FlexyTable
              datos={pendientes}
              titulo={"Tareas Pendientes"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "PENDIENTES");
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

      {todos && todos.length > 0 && (
        <CardRuta>
          <Ruta>
            <FlexyTable
              datos={todos}
              titulo={"Historial de Tareas"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "HISTORIAL");
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

      {showEntregadas.show && (
        <DetalleTarea
          show={showEntregadas.show}
          data={showEntregadas.data}
          tipo={showEntregadas.tipo}
          onHide={() => setShowEntregadas({ show: !showEntregadas.show })}
        />
      )}

      {showPendientes.show && (
        <DetalleTarea
          show={showPendientes.show}
          data={showPendientes.data}
          tipo={showPendientes.tipo}
          onHide={() => setShowPendientes({ show: !showPendientes.show })}
        />
      )}

      {showTodos.show && (
        <DetalleTarea
          show={showTodos.show}
          data={showTodos.data}
          tipo={showTodos.tipo}
          onHide={() => setShowTodos({ show: !showTodos.show })}
        />
      )}
    </>
  );
}

export default Tareas;
