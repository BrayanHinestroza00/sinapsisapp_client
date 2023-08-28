import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  Card,
  Ruta,
  Subtitulo,
  Titulo,
  Input,
  Label,
} from "src/app/Shared/assets/styles/Common.js";

import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDORES,
  URL_OBTENER_TIPOS_CONTACTO,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoEmprendedoresAdmin } from "src/app/Shared/services/validation/validateListadoEmprendedores.js";

import showIcon from "src/app/Shared/assets/images/icons/detalleIcon.svg";

function EmprendedoresPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});

  // Custom Hooks
  const {
    data: emprendedoresData,
    message: emprendedoresMessage,
    error: emprendedoresError,
    fetchAPI: fetchApiEmprendedores,
  } = useFetch();

  const {
    data: tiposContactoData,
    message: tiposContactoMessage,
    error: tiposContactoError,
    loading: tiposContactoLoading,
    fetchAPI: fetchApiTiposContacto,
  } = useFetch();

  useEffect(() => {
    fetchApiTiposContacto({
      URL: URL_OBTENER_TIPOS_CONTACTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });

    consultarEmprendedores();
  }, []);

  useEffect(() => {
    let newEmprendedores = [];

    if (emprendedoresData) {
      if (emprendedoresData.length > 0) {
        newEmprendedores = emprendedoresData.map((emprendedorData, index) => {
          return {
            n: index + 1,
            "Número Documento": emprendedorData.numeroDocumento,
            "Nombre Emprendedor": emprendedorData.nombreCompleto,
            "Tipo Contacto": emprendedorData.tipoContacto,
            "Correo Contacto":
              emprendedorData.correoInstitucional ||
              emprendedorData.correoPersonal,
            "Estado Ruta I&E": emprendedorData.estado,
          };
        });
      }
    }
    setDatos(newEmprendedores);
  }, [emprendedoresData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarListadoEmprendedoresAdmin(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      consultarEmprendedores();
    }
  };

  const onHandleDetalleEmprendedor = (emprendedor) => {
    const data = {
      ...emprendedoresData[emprendedor.n - 1],
      type: "EMPRENDEDORES",
    };
    navigate(`/Administrador/Emprendedores/${data.id}`, {
      replace: true,
      state: data,
    });
  };

  const consultarEmprendedores = () => {
    setError({});
    fetchApiEmprendedores({
      URL: URL_OBTENER_EMPRENDEDORES,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          ...datosFiltro,
        },
      },
    });
  };

  return (
    <>
      <Titulo>Emprendedores en Ruta de Innovación y Emprendimiento</Titulo>

      <>
        {tiposContactoLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <LoadingSpinner width="5rem" height="5rem" />
          </Ruta>
        ) : tiposContactoMessage || tiposContactoError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {tiposContactoError && <Subtitulo>{tiposContactoError}</Subtitulo>}

            {tiposContactoMessage && (
              <Subtitulo>{tiposContactoMessage}</Subtitulo>
            )}
          </Ruta>
        ) : (
          <Card>
            <Subtitulo>Filtros de búsqueda</Subtitulo>

            <form onSubmit={onHandleSubmit} className="row g-3">
              {/* Numero de documento */}
              <div className="col-md-6">
                <Label htmlFor="numeroDocumento" className="form-label">
                  Número de documento
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="numeroDocumento"
                  id="numeroDocumento"
                  value={datosFiltro.numeroDocumento || ""}
                  onChange={(e) => onHandleChange(e)}
                  autoComplete="off"
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
                  Nombre(s) Apellido(s):
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="nombreEmprendedor"
                  id="nombreEmprendedor"
                  value={datosFiltro.nombreEmprendedor || ""}
                  onChange={(e) => onHandleChange(e)}
                  autoComplete="off"
                />
                {error.nombreEmprendedor && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreEmprendedor}
                  </small>
                )}
              </div>
              {/* Estado en la Ruta de Innovación & Emprendimiento */}
              <div className="col-md-6">
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
                  <option value={"ACTIVO"}>ACTIVO</option>
                  <option value={"INACTIVO"}>INACTIVO</option>
                </select>
                {error.estadosRuta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.estadosRuta}
                  </small>
                )}
              </div>

              {/* Tipo contacto */}
              <div className="col-md-6">
                <Label htmlFor="tiposContacto" className="form-label">
                  Tipo de Contacto del Emprendedor:
                </Label>
                <select
                  id="tiposContacto"
                  className="form-select"
                  name="tiposContacto"
                  value={datosFiltro.tiposContacto || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  {tiposContactoData &&
                    tiposContactoData.length > 0 &&
                    tiposContactoData.map((tipoContacto, index) => {
                      return (
                        <option key={index} value={tipoContacto.id}>
                          {tipoContacto.nombre}
                        </option>
                      );
                    })}
                </select>
                {error.tiposContacto && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.tiposContacto}
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

      <Ruta
        style={{
          padding: "0.5rem 2rem 1rem 2rem",
          marginTop: "1rem",
          marginLeft: "0rem",
        }}
      >
        {emprendedoresData && emprendedoresData.length > 0 ? (
          <FlexyTable
            datos={datos}
            titulo={"emprendedores"}
            btn1={
              <img
                src={showIcon}
                width="100%"
                height="25"
                data-toggle="tooltip"
                data-placement="top"
                title="Ver Detalle"
              />
            }
            fun1={(emprendedorData) => {
              onHandleDetalleEmprendedor(emprendedorData);
            }}
            adicional={true}
          />
        ) : (
          <Subtitulo>
            No hay emprendedores en Ruta de Innovación y Emprendimiento
          </Subtitulo>
        )}
      </Ruta>
    </>
  );
}

export default EmprendedoresPage;
