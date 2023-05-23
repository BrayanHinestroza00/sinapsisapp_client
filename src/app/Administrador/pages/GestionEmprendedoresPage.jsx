import ReactFlexyTable from "react-flexy-table";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FlexyTable from "src/app/Shared/components/FlexyTable";

import {
  Card,
  Input,
  Label,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common.js";

import {
  HOST,
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDORES,
  URL_OBTENER_TIPOS_CONTACTO,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoEmprendedores } from "src/app/Shared/services/validation/validateListadoEmprendedores.js";

import showIcon from "src/app/Shared/assets/images/icons/showIcon.png";
import editIcon from "src/app/Shared/assets/images/icons/editIcon.png";

function GestionEmprendedoresPage() {
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
  }, []);

  useEffect(() => {
    let newEmprendedores = [];

    if (emprendedoresData) {
      if (emprendedoresData.length > 0) {
        newEmprendedores = emprendedoresData.map((emprendedorData, index) => {
          return {
            n: index + 1,
            "Numero Documento": emprendedorData.numeroDocumento,
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

  // useEffect(() => {
  //   Axios.get(`${HOST}/app/tipoDocumento`)
  //     .then(({ data }) => {
  //       if (data.code == 1) {
  //         setTiposDocumento(data.response);
  //       }

  //       if (data.code == -1) {
  //         console.log(data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarListadoEmprendedores(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
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
    }
  };

  const onHandleDetalleEmprendedor = (emprendedor) => {
    // Show Modal with the info
    const data = emprendedoresData[emprendedor.n - 1];
  };

  // if (loading) {
  //   return <h1>LOADING EmprendedoresPage</h1>;
  // }

  // if (emprendedoresMessage) {
  //   return (
  //     <>
  //       <p>{emprendedoresMessage}</p>
  //     </>
  //   );
  // }

  // if (emprendedoresError) {
  //   return (
  //     <>
  //       <h1>ERROR</h1>
  //       <p>{emprendedoresError}</p>
  //     </>
  //   );
  // }

  return (
    <>
      <Titulo>Emprendedores </Titulo>

      <>
        {tiposContactoLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <p>Cargando...</p>
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
                />
                {error.nombreEmprendedor && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreEmprendedor}
                  </small>
                )}
              </div>
              {/* Estado en la Ruta de Innovacion & Emprendimiento */}
              <div className="col-md-6">
                <Label htmlFor="estadosRuta" className="form-label">
                  Estado en la Ruta de Innovacion & Emprendimiento
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

      {emprendedoresData && (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {emprendedoresData.length > 0 ? (
            <FlexyTable
              datos={datos}
              titulo={"Emprendedores"}
              btn1={<img src={showIcon} width="auto" height="25" />}
              fun1={(emprendedorData) => {
                onHandleDetalleEmprendedor(emprendedorData);
              }}
              btn2={<img src={editIcon} width="auto" height="25" />}
              fun2={(mentorData) => {
                onHandleDetalleEmprendedor(mentorData);
              }}
              adicional={true}
            />
          ) : (
            <Subtitulo>No hay emprendedores disponibles</Subtitulo>
          )}
        </Ruta>
      )}
    </>
  );
}

export default GestionEmprendedoresPage;
