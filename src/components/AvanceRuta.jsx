import { useEffect, useState } from "react";
import {
  CardRuta,
  Ruta,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ACTIVIDADES_EMPRENDEDOR,
  URL_OBTENER_ACTIVIDADES_ETAPA_RUTA,
  URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA,
  URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
} from "src/utils/apiConstants";

function AvanceRuta({ preloadData }) {
  const [actidadesEmprendedor, setActidadesEmprendedor] = useState(null);
  // Custom Hooks
  const {
    data: actRutaData,
    message: actRutaMessage,
    error: actRutaError,
    loading: actRutaLoading,
    fetchAPI: fetchApiActRuta,
  } = useFetch();

  const {
    data: herrRutaData,
    message: herrRutaMessage,
    error: herrRutaError,
    loading: herrRutaLoading,
    fetchAPI: fetchApiHerrRuta,
  } = useFetch();

  const {
    data: actEmpRutaData,
    message: actEmpRutaMessage,
    error: actEmpRutaError,
    loading: actEmpRutaLoading,
    fetchAPI: fetchApiActEmpRuta,
  } = useFetch();

  const {
    data: subActEmpRutaData,
    message: subActEmpRutaMessage,
    error: subActEmpRutaError,
    loading: subActEmpRutaLoading,
    fetchAPI: fetchApiSubActEmpRuta,
  } = useFetch();

  useEffect(() => {
    if (preloadData) {
      fetchApiActRuta({
        URL: URL_OBTENER_ACTIVIDADES_ETAPA_RUTA,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapa: preloadData.idEtapa,
          },
        },
      });

      fetchApiHerrRuta({
        URL: URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapa: preloadData.idEtapa,
          },
        },
      });

      fetchApiActEmpRuta({
        URL: URL_OBTENER_ACTIVIDADES_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento: 2,
            idRutaEmprendimiento: 1,
          },
        },
      });

      fetchApiSubActEmpRuta({
        URL: URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento: 2,
            idRutaEmprendimiento: 1,
          },
        },
      });
    }
  }, [preloadData]);

  useEffect(() => {
    if (
      !actEmpRutaLoading &&
      !subActEmpRutaLoading &&
      actEmpRutaData &&
      subActEmpRutaData
    ) {
      let actividadObjects = {};
      let herramientaObjects = {};

      actEmpRutaData.forEach((actEmpRuta) => {
        actividadObjects = {
          ...actividadObjects,
          [actEmpRuta.idActividad]: { ...actEmpRuta },
        };
      });

      subActEmpRutaData.forEach((subActEmpRuta) => {
        herramientaObjects = {
          ...herramientaObjects,
          [subActEmpRuta.idActividad]: { ...subActEmpRuta },
        };
      });

      setActidadesEmprendedor({
        herramientas: {
          ...herramientaObjects,
        },
        actividades: { ...actividadObjects },
      });
    }
  }, [
    actEmpRutaLoading,
    actEmpRutaData,
    subActEmpRutaLoading,
    subActEmpRutaData,
  ]);

  if (
    actRutaLoading ||
    herrRutaLoading ||
    actEmpRutaLoading ||
    subActEmpRutaLoading ||
    !actRutaData ||
    !herrRutaData ||
    !actEmpRutaData ||
    !subActEmpRutaData ||
    !actidadesEmprendedor
  ) {
    return <>LOADING AvanceRuta</>;
  }

  if (
    actRutaMessage ||
    herrRutaMessage ||
    actEmpRutaMessage ||
    subActEmpRutaMessage
  ) {
    return (
      <>
        <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

        <CardRuta>
          <Ruta>
            <p>
              {actRutaMessage ||
                herrRutaMessage ||
                actEmpRutaMessage ||
                subActEmpRutaMessage}
            </p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (actRutaError || herrRutaError || actEmpRutaError || subActEmpRutaError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>
          {actRutaError ||
            herrRutaError ||
            actEmpRutaError ||
            subActEmpRutaError}
        </p>
      </>
    );
  }

  return (
    <div id="avanceRutaComponent" className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Actividades</h3>
          <div>
            {actRutaData &&
              actRutaData.length > 0 &&
              actRutaData.map((actividadRuta, index) => {
                return (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type={"checkbox"}
                      checked={
                        actidadesEmprendedor.actividades[actividadRuta.id]
                          ?.estadoActividad == "COMPLETADA"
                      }
                      disabled
                    />
                    <label className="form-check-label">
                      {actividadRuta.nombre.toUpperCase()}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-md-6">
          <h3>Herramientas</h3>
          <div>
            {herrRutaData &&
              herrRutaData.length > 0 &&
              herrRutaData.map((herramientaRuta, index) => {
                return (
                  <div key={index} className="form-check">
                    <input
                      style={{ opacity: "1 !important" }}
                      className="form-check-input"
                      type={"checkbox"}
                      checked={
                        actidadesEmprendedor.herramientas[herramientaRuta.id]
                          ?.idHerramienta == herrRutaData.id &&
                        actidadesEmprendedor.herramientas[herramientaRuta.id]
                          ?.estadoActividad == "COMPLETADA"
                      }
                      disabled
                    />
                    <label className="form-check-label">
                      {herramientaRuta.nombre.toUpperCase()}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvanceRuta;
