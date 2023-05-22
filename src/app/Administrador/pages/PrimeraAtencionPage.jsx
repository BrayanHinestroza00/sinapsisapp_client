import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

import {
  Ruta,
  Subtitulo,
  Titulo,
  Input,
  Label,
} from "src/app/Shared/assets/styles/Common.js";

import showIcon from "src/app/Shared/assets/images/icons/showIcon.png";

import {
  HTTP_METHOD_GET,
  URL_OBTENER_PRIMERAS_ATENCIONES_PENDIENTES,
  URL_OBTENER_TIPOS_DOCUMENTO,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";
import { validarListadoSolicitudesPA } from "src/app/Shared/services/validation/validateListadoSolicitudesPA";

function PrimeraAtencionPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: primerasAtencionesData,
    message: primerasAtencionesMessage,
    error: primerasAtencionesError,
    fetchAPI: fetchApiPrimerasAtenciones,
  } = useFetch();

  const {
    data: tiposDocumentoData,
    message: tiposDocumentoMessage,
    error: tiposDocumentoError,
    loading: tiposDocumentoLoading,
    fetchAPI: fetchApiTiposDocumento,
  } = useFetch();

  useEffect(() => {
    fetchApiTiposDocumento({
      URL: URL_OBTENER_TIPOS_DOCUMENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    let newPrimeraAtencion = [];

    if (primerasAtencionesData) {
      if (primerasAtencionesData.length > 0) {
        newPrimeraAtencion = primerasAtencionesData.map(
          (primeraAtencion, index) => {
            return {
              n: index + 1,
              "Documento Emprendedor": primeraAtencion.documentoEmprendedor,
              "Nombre Emprendedor": `${primeraAtencion.nombreEmprendedor}`,
              "Nombre Emprendimiento": primeraAtencion.nombreEmprendimiento,
              "Fecha de Registro": moment(
                primeraAtencion.fechaRegistroPA,
                "YYYY-MM-DD hh:mm:ss"
              ).format(SINAPSIS_APP_FORMATO_FECHA),
              "Correo Contacto": primeraAtencion.correoEmprendedor,
              "Telefono Contacto": primeraAtencion.telefonoContacto || "N/R",
            };
          }
        );
      }
    }
    setDatos(newPrimeraAtencion);
  }, [primerasAtencionesData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarListadoSolicitudesPA(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      setLoading(true);
      fetchApiPrimerasAtenciones({
        URL: URL_OBTENER_PRIMERAS_ATENCIONES_PENDIENTES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: datosFiltro,
        },
      }).then(() => setLoading(false));
    }
  };

  const onHandleDetalleSolicitud = (primeraAtencion) => {
    const data = {
      ...primerasAtencionesData[primeraAtencion.n - 1],
      type: "SOLICITUDES",
    };
    navigate(`/Administrador/Solicitudes/${data.proyectoEmprendimientoId}`, {
      replace: true,
      state: data,
    });
  };

  return (
    <>
      <Titulo>Solicitudes de Primera Atención </Titulo>

      <>
        {tiposDocumentoLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <p>Cargando...</p>
          </Ruta>
        ) : tiposDocumentoMessage || tiposDocumentoError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {tiposDocumentoMessage && (
              <Subtitulo>{tiposDocumentoMessage}</Subtitulo>
            )}

            {tiposDocumentoError && (
              <Subtitulo>{tiposDocumentoError}</Subtitulo>
            )}
          </Ruta>
        ) : (
          <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
            <Subtitulo>Filtros</Subtitulo>

            <form onSubmit={onHandleSubmit} className="row g-3">
              {/* Tipo de documento */}
              <div className="col-md-6">
                <Label htmlFor="tiposDocumento" className="form-label">
                  Tipo de documento:
                </Label>
                <select
                  id="tiposDocumento"
                  className="form-select"
                  name="tiposDocumento"
                  value={datosFiltro.tiposDocumento || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  {tiposDocumentoData &&
                    tiposDocumentoData.length > 0 &&
                    tiposDocumentoData.map((tipoDocumento, index) => {
                      return (
                        <option key={index} value={tipoDocumento.id}>
                          {tipoDocumento.nombre}
                        </option>
                      );
                    })}
                </select>
                {error.tiposDocumento && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.tiposDocumento}
                  </small>
                )}
              </div>

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

              {/* Nombre Emprendimiento */}
              <div className="col-md-6">
                <Label htmlFor="nombreEmprendimiento" className="form-label">
                  Nombre del Emprendimiento:
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="nombreEmprendimiento"
                  id="nombreEmprendimiento"
                  value={datosFiltro.nombreEmprendimiento || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.nombreEmprendimiento && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreEmprendimiento}
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
            <p>Cargando...</p>
          </Ruta>
        ) : primerasAtencionesMessage || primerasAtencionesError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {primerasAtencionesError && (
              <Subtitulo>{primerasAtencionesError}</Subtitulo>
            )}

            {primerasAtencionesMessage && (
              <Subtitulo>{primerasAtencionesMessage}</Subtitulo>
            )}
          </Ruta>
        ) : (
          primerasAtencionesData && (
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
                    titulo={"Solicitudes de Primera Atención"}
                    btn1={<img src={showIcon} width="auto" height="25" />}
                    fun1={(primeraAtencionData) => {
                      onHandleDetalleSolicitud(primeraAtencionData);
                    }}
                    adicional={true}
                  />
                </>
              ) : (
                <Subtitulo>
                  No hay solicitudes de primera atencion pendientes
                </Subtitulo>
              )}
            </Ruta>
          )
        )}
      </>
    </>
  );
}

export default PrimeraAtencionPage;
