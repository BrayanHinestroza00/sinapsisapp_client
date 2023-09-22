import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import DetalleTarea from "src/app/Emprendedor/components/Ruta/Tareas/DetalleTarea.jsx";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";

function TareasEntregadas({ idProyectoEmprendimiento }) {
  const [showEntregadas, setShowEntregadas] = useState({ show: false });
  const [entregadas, setEntregadas] = useState([]);
  // Custom Hooks
  const {
    data: entregadasData,
    message: entregadasMessage,
    error: entregadasError,
    loading: entregadasLoading,
    fetchAPI: fetchApiEntregadas,
  } = useFetch();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (entregadasData) {
      let newEntregadas = [];

      if (entregadasData && entregadasData.length > 0) {
        newEntregadas = entregadasData.map((entregadaData, index) => {
          return {
            n: index + 1,
            título: entregadaData.titulo,
            "Estado entrega": entregadaData.estadoEntrega,
            "Creado Por":
              entregadaData.nombresCrea + " " + entregadaData.apellidosCrea,
            "Correo Contacto": entregadaData.correoInstitucionalCrea,
          };
        });
      }

      setEntregadas(newEntregadas);
    }
  }, [entregadasData]);

  const onClicDetalleTarea = (tarea) => {
    setShowEntregadas({
      show: true,
      data: entregadasData[tarea.n - 1],
      tipo: "ENTREGADAS",
    });
  };

  if (entregadasLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (entregadasMessage && entregadasMessage != "Sin datos") {
    return (
      <>
        <Titulo>Mis Retos</Titulo>

        <CardRuta>
          <Ruta>
            <p>{entregadasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (entregadasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{entregadasError}</p>
      </>
    );
  }

  return (
    <>
      <CardRuta className="mb-3">
        <Ruta>
          {entregadas && entregadas.length > 0 ? (
            <FlexyTable
              datos={entregadas}
              titulo={"retos entregados"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "ENTREGADAS");
              }}
              adicional={true}
            />
          ) : (
            <p>No hay retos entregados</p>
          )}
        </Ruta>
      </CardRuta>

      {showEntregadas.show && (
        <DetalleTarea
          show={showEntregadas.show}
          data={showEntregadas.data}
          tipo={showEntregadas.tipo}
          onHide={() => setShowEntregadas({ show: !showEntregadas.show })}
        />
      )}
    </>
  );
}

export default TareasEntregadas;
