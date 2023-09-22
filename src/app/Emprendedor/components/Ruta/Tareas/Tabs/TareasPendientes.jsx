import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import DetalleTarea from "src/app/Emprendedor/components/Ruta/Tareas/DetalleTarea.jsx";
import { useEffect, useState } from "react";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";

function TareasPendientes({ idProyectoEmprendimiento }) {
  const [pendientes, setPendientes] = useState([]);
  const [showPendientes, setShowPendientes] = useState({ show: false });

  // Custom Hooks
  const {
    data: pendientesData,
    message: pendientesMessage,
    error: pendientesError,
    loading: pendientesLoading,
    fetchAPI: fetchApiPendientes,
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
  }, []);

  useEffect(() => {
    if (pendientesData) {
      let newPendientes = [];

      if (pendientesData && pendientesData.length > 0) {
        newPendientes = pendientesData.map((pendienteData, index) => {
          return {
            n: index + 1,
            título: pendienteData.titulo,
            "Estado entrega": pendienteData.estadoEntrega,
            "Creado Por":
              pendienteData.nombresCrea + " " + pendienteData.apellidosCrea,
            "Correo Contacto": pendienteData.correoInstitucionalCrea,
          };
        });
      }

      setPendientes(newPendientes);
    }
  }, [pendientesData]);

  const onClicDetalleTarea = (tarea) => {
    setShowPendientes({
      show: true,
      data: pendientesData[tarea.n - 1],
      tipo: "PENDIENTES",
    });
  };

  if (pendientesLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (pendientesMessage && pendientesMessage != "Sin datos") {
    return (
      <>
        <Titulo>Mis Retos</Titulo>

        <CardRuta>
          <Ruta>
            <p>{pendientesMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (pendientesError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{pendientesError}</p>
      </>
    );
  }

  return (
    <>
      <CardRuta className="mb-3">
        <Ruta>
          {pendientes && pendientes.length > 0 ? (
            <FlexyTable
              datos={pendientes}
              titulo={"retos pendientes"}
              btn1={"Ver Detalle"}
              fun1={(tareaData) => {
                onClicDetalleTarea(tareaData, "PENDIENTES");
              }}
              adicional={true}
            />
          ) : (
            <p>No hay retos pendientes de entrega</p>
          )}
        </Ruta>
      </CardRuta>

      {showPendientes.show && (
        <DetalleTarea
          show={showPendientes.show}
          data={showPendientes.data}
          tipo={showPendientes.tipo}
          onHide={() => setShowPendientes({ show: !showPendientes.show })}
        />
      )}
    </>
  );
}

export default TareasPendientes;
