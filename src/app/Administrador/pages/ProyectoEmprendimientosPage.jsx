import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  Card,
  Ruta,
  Subtitulo,
  Titulo,
  Input,
  Label,
} from "src/app/Shared/assets/styles/Common";

import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_PROYECTOS_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoProyectoEmprendimiento } from "src/app/Shared/services/validation/validateListadoProyectoEmprendimiento.js";

import showIcon from "src/app/Shared/assets/images/icons/detalleIcon.svg";

function ProyectoEmprendimientosPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: emprendimientoData,
    message: emprendimientosMessage,
    error: emprendimientosError,
    fetchAPI: fetchApiPrimerasAtenciones,
  } = useFetch();

  const {
    data: etapasRutaData,
    message: etapasRutaMessage,
    error: etapasRutaError,
    loading: etapasRutaLoading,
    fetchAPI: fetchApiEtapasRuta,
  } = useFetch();

  useEffect(() => {
    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    let newEmprendimiento = [];

    if (emprendimientoData) {
      if (emprendimientoData.length > 0) {
        newEmprendimiento = emprendimientoData.map((emprendimiento, index) => {
          return {
            n: index + 1,
            "Documento Emprendedor": emprendimiento.documentoEmprendedor,
            "Nombre Emprendedor": `${emprendimiento.nombreEmprendedor}`,
            "Nombre Emprendimiento": emprendimiento.nombreEmprendimiento,
            "Etapa en Ruta": emprendimiento.etapaRuta,
            "Estado en Ruta": emprendimiento.estadoRuta,
            "Correo Contacto": emprendimiento.correoEmprendedor,
          };
        });
      }
    }
    setDatos(newEmprendimiento);
  }, [emprendimientoData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarListadoProyectoEmprendimiento(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      setLoading(true);
      fetchApiPrimerasAtenciones({
        URL: URL_OBTENER_PROYECTOS_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: datosFiltro,
        },
      }).then(() => setLoading(false));
    }
  };

  const onHandleDetalleSolicitud = (emprendimiento) => {
    const data = {
      ...emprendimientoData[emprendimiento.n - 1],
      type: "EMPRENDIMIENTOS",
    };
    navigate(
      `/Administrador/Emprendimientos/${data.proyectoEmprendimientoId}`,
      {
        replace: true,
        state: data,
      }
    );
  };

  return (
    <>
      <Titulo>Proyectos de Emprendimiento </Titulo>

      <>
        {etapasRutaLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <LoadingSpinner width="5rem" height="5rem" />
          </Ruta>
        ) : etapasRutaMessage || etapasRutaError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {etapasRutaMessage && <Subtitulo>{etapasRutaMessage}</Subtitulo>}

            {etapasRutaError && <Subtitulo>{etapasRutaError}</Subtitulo>}
          </Ruta>
        ) : (
          <Card>
            <Subtitulo>Filtros de búsqueda</Subtitulo>

            <form onSubmit={onHandleSubmit} className="row g-3">
              {/* Numero de documento */}
              <div className="col-md-6">
                <Label htmlFor="numeroDocumento" className="form-label">
                  Número de documento:
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="numeroDocumento"
                  id="numeroDocumento"
                  value={datosFiltro.numeroDocumento || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.numeroDocumento && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.numeroDocumento}
                  </small>
                )}
              </div>

              {/* Nombre(s) emprendedor */}
              <div className="col-md-6">
                <Label htmlFor="nombreEmprendedor" className="form-label">
                  Nombre(s) del Emprendedor:
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="nombreEmprendedor"
                  id="nombreEmprendedor"
                  value={datosFiltro.nombreEmprendedor || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.nombreEmprendedor && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreEmprendedor}
                  </small>
                )}
              </div>

              {/* Estado en la Ruta de Innovación & Emprendimiento */}
              <div className="col-md-4">
                <Label htmlFor="estadosRuta" className="form-label">
                  Estado en la Ruta de Innovación & Emprendimiento
                </Label>
                <select
                  id="estadosRuta"
                  className="form-select"
                  name="estadosRuta"
                  value={datosFiltro.estadosRuta || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  <option value={"PENDIENTE"}>PENDIENTE</option>
                  <option value={"COMPLETADO"}>COMPLETADO</option>
                </select>
                {error.estadosRuta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.estadosRuta}
                  </small>
                )}
              </div>

              {/* Etapa en la Ruta de Innovación & Emprendimiento */}
              <div className="col-md-4">
                <Label htmlFor="etapasRuta" className="form-label">
                  Etapa en la Ruta de Innovación & Emprendimiento:
                </Label>
                <select
                  id="etapasRuta"
                  className="form-select"
                  name="etapasRuta"
                  value={datosFiltro.etapasRuta || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  {etapasRutaData &&
                    etapasRutaData.length > 0 &&
                    etapasRutaData.map((etapaRuta, index) => {
                      return (
                        <option key={index} value={etapaRuta.id}>
                          {etapaRuta.nombre}
                        </option>
                      );
                    })}
                </select>
                {error.etapasRuta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.etapasRuta}
                  </small>
                )}
              </div>

              {/* Tiene mentor principal */}
              <div className="col-md-4">
                <Label htmlFor="mentorAsociado" className="form-label">
                  Mentor asociado:
                </Label>
                <select
                  id="mentorAsociado"
                  className="form-select"
                  name="mentorAsociado"
                  value={datosFiltro.mentorAsociado || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  <option value={"1"}>CON MENTOR ASOCIADO</option>
                  <option value={"2"}>SIN MENTOR ASOCIADO</option>
                </select>
                {error.mentorAsociado && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.mentorAsociado}
                  </small>
                )}
              </div>
              <div>
                <button className="btn btn-primary">Consultar</button>
              </div>
            </form>
          </Card>
        )}
      </>

      <>
        {loading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <LoadingSpinner width="5rem" height="5rem" />
          </Ruta>
        ) : emprendimientosMessage || emprendimientosError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {emprendimientosError && (
              <Subtitulo>{emprendimientosError}</Subtitulo>
            )}

            {emprendimientosMessage && (
              <Subtitulo>{emprendimientosMessage}</Subtitulo>
            )}
          </Ruta>
        ) : (
          emprendimientoData && (
            <Ruta
              style={{
                padding: "0.5rem 2rem 1rem 2rem",
                marginTop: "1rem",
                marginLeft: "0rem",
              }}
            >
              {datos.length > 0 ? (
                <>
                  <FlexyTable
                    datos={datos}
                    titulo={"Proyectos de Emprendimiento"}
                    btn1={<img src={showIcon} width="auto" height="25" />}
                    fun1={(emprendimientoData) => {
                      onHandleDetalleSolicitud(emprendimientoData);
                    }}
                    adicional={true}
                  />
                </>
              ) : (
                <Subtitulo>
                  No hay Proyectos de Emprendimiento disponibles
                </Subtitulo>
              )}
            </Ruta>
          )
        )}
      </>
    </>
  );
}

export default ProyectoEmprendimientosPage;
