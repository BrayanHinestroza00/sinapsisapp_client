import { useEffect, useState } from "react";

import FlexyTable from "src/app/Administrador/components/GestionUsuarios/FlexyTable";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import VerPerfil from "src/app/Administrador/components/GestionUsuarios/VerPerfilEmprendedor";

import {
  Card,
  Input,
  Label,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common.js";

import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_EMPRENDEDORES,
  URL_OBTENER_TIPOS_CONTACTO,
  URL_RESTABLECER_CONTRASEÑA,
  URL_DESACTIVAR_CUENTA,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoEmprendedoresAdmin } from "src/app/Shared/services/validation/validateListadoEmprendedores.js";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";

import deleteUserIcon from "src/app/Shared/assets/images/icons/delete_user.png";
import detalleIcon from "src/app/Shared/assets/images/icons/detalle_perfil.png";
import resetPasswordIcon from "src/app/Shared/assets/images/icons/reset_password.png";

function GestionEmprendedoresPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [showDetalle, setShowDetalle] = useState({ show: false });

  // Custom Hooks
  const {
    data: emprendedoresData,
    message: emprendedoresMessage,
    error: emprendedoresError,
    fetchAPI: fetchApiEmprendedores,
  } = useFetch();

  const {
    data: restablecerData,
    message: restablecerMessage,
    error: restablecerError,
    fetchAPI: fetchApiRestablecer,
  } = useFetch();

  const {
    data: desactivarData,
    message: desactivarMessage,
    error: desactivarError,
    fetchAPI: fetchApiDesactivar,
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
    setShowDetalle({ datos: data, show: true });
  };
  const onResetPasswordEmprendedor = (emprendedor) => {
    // Show Modal with the info
    const data = emprendedoresData[emprendedor.n - 1];

    confirmAlertWithText({
      title: "¿Estás seguro que deseas reiniciar la contraseña del usuario?",
      text: "Esta acción no se puede deshacer",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      onConfirm: () => {
        setLoading(true);
        fetchApiRestablecer({
          URL: URL_RESTABLECER_CONTRASEÑA,
          requestOptions: {
            method: HTTP_METHOD_POST,
            data: {
              idUsuario: data.id,
            },
          },
        });
      },
    });
  };
  const onDeleteEmprendedor = (emprendedor) => {
    // Show Modal with the info
    const data = emprendedoresData[emprendedor.n - 1];

    confirmAlertWithText({
      title: "¿Estás seguro que deseas desactivar la cuenta del usuario?",
      text: "Esta acción no se puede deshacer",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      onConfirm: () => {
        setLoading(true);
        fetchApiRestablecer({
          URL: URL_DESACTIVAR_CUENTA,
          requestOptions: {
            method: HTTP_METHOD_POST,
            data: {
              idUsuario: data.id,
            },
          },
        });
      },
    });
  };

  if (loading && (restablecerError || desactivarError)) {
    messageAlert({
      title: "Algo ha fallado",
      text: restablecerError || desactivarError,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && (restablecerMessage || desactivarMessage)) {
    if (restablecerMessage == "OK" || desactivarMessage == "OK") {
      messageAlertWithoutText({
        title: "Realizado Correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          fetchApiEmprendedores({
            URL: URL_OBTENER_EMPRENDEDORES,
            requestOptions: {
              method: HTTP_METHOD_GET,
              params: {
                ...datosFiltro,
              },
            },
          });
        },
      });
    } else {
      messageAlertWithoutText({
        title: restablecerMessage || desactivarMessage,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

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
              btn1={
                <img
                  src={detalleIcon}
                  width="auto"
                  height="25"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Ver Detalle"
                />
              }
              fun1={(emprendedorData) => {
                onHandleDetalleEmprendedor(emprendedorData);
              }}
              btn2={
                <img
                  src={resetPasswordIcon}
                  width="auto"
                  height="25"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Restablecer contraseña"
                />
              }
              fun2={(emprendedorData) => {
                onResetPasswordEmprendedor(emprendedorData);
              }}
              btn3={
                <img
                  src={deleteUserIcon}
                  width="auto"
                  height="25"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Desactivar usuario"
                />
              }
              fun3={(emprendedorData) => {
                onDeleteEmprendedor(emprendedorData);
              }}
            />
          ) : (
            <Subtitulo>No hay emprendedores disponibles</Subtitulo>
          )}
        </Ruta>
      )}
      {showDetalle.show && (
        <VerPerfil
          show={showDetalle.show}
          datos={showDetalle.datos}
          onHide={() =>
            setShowDetalle({
              ...showDetalle,
              show: !showDetalle.show,
            })
          }
        />
      )}
    </>
  );
}

export default GestionEmprendedoresPage;
