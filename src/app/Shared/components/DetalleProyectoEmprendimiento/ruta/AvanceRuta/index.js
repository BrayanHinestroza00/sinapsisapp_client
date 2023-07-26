import { useEffect, useState } from "react";
import { CardRuta } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ACTIVIDADES_EMPRENDEDOR,
  URL_OBTENER_ACTIVIDADES_ETAPA_RUTA,
  URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA,
  URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { getArchivo } from "src/app/Shared/utils/utilityFunctions";

function AvanceRuta({ preloadData, selectedRuta, avance }) {
  const [actidadesEmprendedor, setActidadesEmprendedor] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Consulta completitud de Actividades
  const {
    data: actEmpRutaData,
    message: actEmpRutaMessage,
    error: actEmpRutaError,
    loading: actEmpRutaLoading,
    fetchAPI: fetchApiActEmpRuta,
  } = useFetch();

  // Consulta completitud de herramientas
  const {
    data: subActEmpRutaData,
    message: subActEmpRutaMessage,
    error: subActEmpRutaError,
    loading: subActEmpRutaLoading,
    fetchAPI: fetchApiSubActEmpRuta,
  } = useFetch();

  useEffect(() => {
    if (preloadData || avance) {
      fetchApiActRuta({
        URL: URL_OBTENER_ACTIVIDADES_ETAPA_RUTA,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapa: avance[selectedRuta].idEtapa,
          },
        },
      });

      fetchApiHerrRuta({
        URL: URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            // idEtapa: preloadData.idEtapa,
            idEtapa: avance[selectedRuta].idEtapa,
          },
        },
      });

      fetchApiActEmpRuta({
        URL: URL_OBTENER_ACTIVIDADES_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              avance[selectedRuta].idProyectoEmprendimiento,
            idRutaEmprendimiento: avance[selectedRuta].id,
            // idProyectoEmprendimiento: preloadData.idProyectoEmprendimiento,
            // idRutaEmprendimiento: preloadData.idRutaProyEmprendimiento,
          },
        },
      });

      fetchApiSubActEmpRuta({
        URL: URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              avance[selectedRuta].idProyectoEmprendimiento,
            idRutaEmprendimiento: avance[selectedRuta].id,
            // idProyectoEmprendimiento: preloadData.idProyectoEmprendimiento,
            // idRutaEmprendimiento: preloadData.idRutaProyEmprendimiento,
          },
        },
      });
    }
  }, [preloadData, selectedRuta]);

  useEffect(() => {
    if (!actEmpRutaLoading && !subActEmpRutaLoading) {
      if (actEmpRutaData && subActEmpRutaData) {
        //if (actidadesEmprendedor == null) {
        transformData();
        //}
      } else {
        if (loading) {
          setLoading(false);
        }
      }
    }
  }, [
    actEmpRutaLoading,
    actEmpRutaData,
    subActEmpRutaLoading,
    subActEmpRutaData,
  ]);

  const transformData = async () => {
    let actividadObjects = {};
    let herramientaObjects = {};

    actEmpRutaData.forEach((actEmpRuta) => {
      actividadObjects = {
        ...actividadObjects,
        [actEmpRuta.idActividad]: { ...actEmpRuta },
      };
    });

    let itemsProcessed = 0;
    subActEmpRutaData.forEach(async (subActEmpRuta) => {
      if (subActEmpRuta.tipoSubActividad == 2) {
        if (subActEmpRuta.urlEstadoActividad != null) {
          const imagen = await getArchivo(subActEmpRuta.urlEstadoActividad);
          if (imagen) {
            subActEmpRuta.urlEstadoActividad = {
              url: `data:${imagen.contentType};base64,${imagen.file}`,
              filename: imagen.filename,
            };
          }
        }

        herramientaObjects = {
          ...herramientaObjects,
          [subActEmpRuta.idSubActividad]: { ...subActEmpRuta },
        };
      }
      itemsProcessed++;

      if (itemsProcessed === subActEmpRutaData.length) {
        setActidadesEmprendedor({
          herramientas: {
            ...herramientaObjects,
          },
          actividades: { ...actividadObjects },
        });

        setLoading(false);
      }
    });
  };

  if (
    actRutaLoading ||
    herrRutaLoading ||
    actEmpRutaLoading ||
    subActEmpRutaLoading ||
    loading
  ) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (
    actRutaMessage ||
    herrRutaMessage ||
    actEmpRutaMessage ||
    subActEmpRutaMessage
  ) {
    return (
      <>
        <CardRuta>
          <p>
            {actRutaMessage ||
              herrRutaMessage ||
              actEmpRutaMessage ||
              subActEmpRutaMessage}
          </p>
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
          <h3>Secciones</h3>
          <div>
            <ul>
              {actRutaData &&
                actRutaData.length > 0 &&
                actRutaData.map((actividadRuta, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center form-check"
                    >
                      <input
                        className="form-check-input"
                        type={"checkbox"}
                        checked={
                          actidadesEmprendedor?.actividades[actividadRuta.id]
                            ?.estadoActividad == "COMPLETADO"
                        }
                        disabled
                      />
                      <label className="form-check-label  mx-3 p-0">
                        {actividadRuta.nombre.toUpperCase()}
                      </label>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <h3>Herramientas</h3>
          <div>
            {herrRutaData &&
              herrRutaData.length > 0 &&
              herrRutaData.map((herramientaRuta, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex align-items-center form-check "
                  >
                    <input
                      style={{ opacity: "1 !important" }}
                      className="form-check-input"
                      type={"checkbox"}
                      checked={
                        actidadesEmprendedor?.herramientas[
                          herramientaRuta.idSubActividadRuta
                        ]?.idSubActividad ==
                          herramientaRuta.idSubActividadRuta &&
                        actidadesEmprendedor?.herramientas[
                          herramientaRuta.idSubActividadRuta
                        ]?.estadoActividad == "COMPLETADO"
                      }
                      disabled
                    />
                    {actidadesEmprendedor?.herramientas[
                      herramientaRuta.idSubActividadRuta
                    ]?.idSubActividad == herramientaRuta.idSubActividadRuta &&
                    actidadesEmprendedor?.herramientas[
                      herramientaRuta?.idSubActividadRuta
                    ]?.estadoActividad == "COMPLETADO" &&
                    actidadesEmprendedor?.herramientas[
                      herramientaRuta?.idSubActividadRuta
                    ]?.urlEstadoActividad != null ? (
                      <a
                        className="mx-3 p-0"
                        href={
                          actidadesEmprendedor?.herramientas[
                            herramientaRuta.idSubActividadRuta
                          ]?.urlEstadoActividad.url
                        }
                        download={
                          actidadesEmprendedor?.herramientas[
                            herramientaRuta.idSubActividadRuta
                          ]?.urlEstadoActividad.filename
                        }
                        target="_blank"
                      >
                        {herramientaRuta.nombre.toUpperCase()}
                      </a>
                    ) : (
                      <label className="form-check-label mx-3">
                        {herramientaRuta.nombre.toUpperCase()}
                      </label>
                    )}
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
