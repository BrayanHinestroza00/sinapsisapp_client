import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FlexyTable from "src/app/Administrador/components/GestionUsuarios/FlexyTable";
import RegistrarMentor from "src/app/Administrador/components/SignUpMentor";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import VerPerfil from "src/app/Administrador/components/GestionUsuarios/VerPerfilMentor";

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
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_MENTORES,
  URL_RESTABLECER_CONTRASEÑA,
  URL_DESACTIVAR_CUENTA,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoMentores } from "src/app/Shared/services/validation/validateListadoMentores";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";

import deleteUserIcon from "src/app/Shared/assets/images/icons/delete_user.png";
import detalleIcon from "src/app/Shared/assets/images/icons/detalle_perfil.png";
import resetPasswordIcon from "src/app/Shared/assets/images/icons/reset_password.png";

function GestionMentoresPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({ estadoCuenta: "1" });
  const [show, setShow] = useState({
    showForm: false,
  });

  const [showDetalle, setShowDetalle] = useState({ show: false });

  // Custom Hooks
  const {
    data: mentoresData,
    message: mentoresMessage,
    error: mentoresError,
    loading: mentoresLoading,
    fetchAPI: fetchApiMentores,
  } = useFetch();

  const {
    data: etapasRutaData,
    message: etapasRutaMessage,
    error: etapasRutaError,
    loading: etapasRutaLoading,
    fetchAPI: fetchApiEtapasRuta,
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

  useEffect(() => {
    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    let newMentores = [];

    if (mentoresData) {
      if (mentoresData.length > 0) {
        newMentores = mentoresData.map((mentorData, index) => {
          return {
            n: index + 1,
            "Número Documento": `${mentorData.acronimoTipoDocumento} - ${mentorData.numeroDocumento}`,
            "Nombre Mentor": mentorData.nombreCompleto,
            Cargo: mentorData.cargoMentor,
            "Dependencia/Facultad":
              mentorData.dependenciaMentor || mentorData.facultadMentor,
            "Correo Contacto":
              mentorData.correoInstitucional || mentorData.correoPersonal,
          };
        });
      }
    }

    setDatos(newMentores);
  }, [mentoresData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarListadoMentores(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      fetchApiMentores({
        URL: URL_OBTENER_MENTORES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            ...datosFiltro,
          },
        },
      });
    }
  };

  const onHandleDetalleMentor = (mentor) => {
    // Show Modal with the info
    const data = mentoresData[mentor.n - 1];
    setShowDetalle({
      datos: {
        ...data,
        dependencia: data.dependenciaMentor,
        cargo: data.cargoMentor,
        facultad: data.facultadMentor,
      },
      show: true,
    });
  };

  const onResetPasswordMentor = (mentor) => {
    // Show Modal with the info
    const data = mentoresData[mentor.n - 1];

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

  const onDeleteMentor = (mentor) => {
    // Show Modal with the info
    const data = mentoresData[mentor.n - 1];

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

  const onClickRegistrarMentor = () => {
    setShow({ ...show, showForm: !show.showForm });
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
          fetchApiMentores({
            URL: URL_OBTENER_MENTORES,
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
      <Titulo>Mentores Registrados</Titulo>

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
                <Label htmlFor="numeroDocumentoFGMP" className="form-label">
                  Número de documento
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="numeroDocumento"
                  id="numeroDocumentoFGMP"
                  value={datosFiltro.numeroDocumento || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.numeroDocumento && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.numeroDocumento}
                  </small>
                )}
              </div>

              {/* Nombre(s) mentor */}
              <div className="col-md-6">
                <Label htmlFor="nombreMentor" className="form-label">
                  Nombre(s) Apellido(s):
                </Label>
                <Input
                  type="text"
                  className="form-control inputDiag"
                  name="nombreMentor"
                  id="nombreMentor"
                  value={datosFiltro.nombreMentor || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.nombreMentor && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreMentor}
                  </small>
                )}
              </div>

              {/* Etapa del Mentor */}
              <div className="col-md-6">
                <Label htmlFor="etapasRuta" className="form-label">
                  Etapa de la Ruta de Innovación & Emprendimiento
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

              {/* Estado Cuenta */}
              <div className="col-md-6">
                <Label htmlFor="estadoCuenta" className="form-label">
                  Estado de la Cuenta
                </Label>
                <select
                  id="estadoCuenta"
                  className="form-select"
                  name="estadoCuenta"
                  value={datosFiltro.estadoCuenta || "1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"1"}>ACTIVO</option>
                  <option value={"0"}>INACTIVO</option>
                </select>
                {error.estadoCuenta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.estadoCuenta}
                  </small>
                )}
              </div>

              <div>
                <button className="btn btn-primary mx-2">Consultar</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClickRegistrarMentor}
                >
                  Registrar Mentor
                </button>
              </div>
            </form>
          </Card>
        )}
      </>

      <>
        {mentoresLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <LoadingSpinner width="5rem" height="5rem" />
          </Ruta>
        ) : mentoresError || mentoresMessage ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {mentoresError && <Subtitulo>{mentoresError}</Subtitulo>}

            {mentoresMessage && <Subtitulo>{mentoresMessage}</Subtitulo>}
          </Ruta>
        ) : (
          mentoresData && (
            <Ruta
              style={{
                padding: "0.5rem 2rem 1rem 2rem",
                marginTop: "1rem",
                marginLeft: "0rem",
              }}
            >
              {datos && datos.length > 0 ? (
                <FlexyTable
                  datos={datos}
                  titulo={"Mentores"}
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
                  fun1={(mentorData) => {
                    onHandleDetalleMentor(mentorData);
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
                  fun2={(mentorData) => {
                    onResetPasswordMentor(mentorData);
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
                  fun3={(mentorData) => {
                    onDeleteMentor(mentorData);
                  }}
                />
              ) : (
                <Subtitulo>No hay mentores registrados</Subtitulo>
              )}
            </Ruta>
          )
        )}
      </>

      {show.showForm && (
        <RegistrarMentor
          show={show.showForm}
          onHide={() => setShow({ ...show, showForm: !show.showForm })}
        />
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

export default GestionMentoresPage;
