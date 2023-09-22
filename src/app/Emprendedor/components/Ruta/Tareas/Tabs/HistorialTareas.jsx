import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import DetalleTarea from "src/app/Emprendedor/components/Ruta/Tareas/DetalleTarea.jsx";
import { useEffect, useState } from "react";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import moment from "moment";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";

function HistorialTareas({ idProyectoEmprendimiento }) {
  const [showTodos, setShowTodos] = useState({ show: false });
  const [todos, setTodos] = useState([]);
  // Custom Hooks
  const {
    data: todasData,
    message: todasMessage,
    error: todasError,
    loading: todasLoading,
    fetchAPI: fetchApiTodas,
  } = useFetch();

  useEffect(() => {
    fetchApiTodas({
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
    if (todasData) {
      let newTodos = [];

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

      setTodos(newTodos);
    }
  }, [todasData]);

  const onClicDetalleTarea = (tarea) => {
    setShowTodos({
      show: true,
      data: todasData[tarea.n - 1],
      tipo: "HISTORIAL",
    });
  };

  if (todasLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (todasMessage && todasMessage != "Sin datos") {
    return (
      <>
        <Titulo>Mis Retos</Titulo>

        <CardRuta>
          <Ruta>
            <p>{todasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (todasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{todasError}</p>
      </>
    );
  }

  return (
    <>
      <CardRuta>
        <Ruta>
          {todos && todos.length > 0 ? (
            <FlexyTable
              datos={todos}
              titulo={"historial de retos"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "HISTORIAL");
              }}
              adicional={true}
            />
          ) : (
            <p>No hay retos entregados y calificados</p>
          )}
        </Ruta>
      </CardRuta>

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

export default HistorialTareas;
