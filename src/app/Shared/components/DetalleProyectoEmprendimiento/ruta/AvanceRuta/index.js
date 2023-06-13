import { useEffect, useState } from "react";
import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ACTIVIDADES_EMPRENDEDOR,
  URL_OBTENER_ACTIVIDADES_ETAPA_RUTA,
  URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA,
  URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

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
            idProyectoEmprendimiento: preloadData.idProyectoEmprendimiento,
            idRutaEmprendimiento: preloadData.idRutaProyEmprendimiento,
          },
        },
      });

      fetchApiSubActEmpRuta({
        URL: URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento: preloadData.idProyectoEmprendimiento,
            idRutaEmprendimiento: preloadData.idRutaProyEmprendimiento,
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
        if (subActEmpRuta.tipoSubActividad == 2) {
          herramientaObjects = {
            ...herramientaObjects,
            [subActEmpRuta.idSubActividad]: { ...subActEmpRuta },
          };
        }
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
    subActEmpRutaLoading
  ) {
    // console.log("test", {
    //   actRutaLoading,
    //   herrRutaLoading,
    //   actEmpRutaLoading,
    //   subActEmpRutaLoading,
    //   inverso: {
    //     actRutaData,
    //     herrRutaData,
    //     actEmpRutaData,
    //     subActEmpRutaData,
    //     actidadesEmprendedor,
    //   },
    // });
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

  console.log("preloadData", {
    actRutaData,
    herrRutaData,
    actEmpRutaData,
    subActEmpRutaData,
    actidadesEmprendedor,
  });

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
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type={"checkbox"}
                        checked={
                          actidadesEmprendedor?.actividades[actividadRuta.id]
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
                  <div key={index} className="form-check">
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
                        ]?.estadoActividad == "COMPLETADA"
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
