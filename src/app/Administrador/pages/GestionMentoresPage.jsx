import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import RegistrarMentor from "src/app/Administrador/components/SignUpMentor";

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
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_MENTORES,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarListadoMentores } from "src/app/Shared/services/validation/validateListadoMentores";

import showIcon from "src/app/Shared/assets/images/icons/showIcon.png";
import editIcon from "src/app/Shared/assets/images/icons/editIcon.png";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

function GestionMentoresPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({ estadoCuenta: "1" });
  const [show, setShow] = useState({
    showForm: false,
    showDetalle: false,
  });

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
  };

  const onClickRegistrarMentor = () => {
    setShow({ ...show, showForm: !show.showForm });
  };

  return (
    <>
      <Titulo>Mentores </Titulo>

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
                  btn1={<img src={showIcon} width="auto" height="25" />}
                  fun1={(mentorData) => {
                    onHandleDetalleMentor(mentorData);
                  }}
                  btn2={<img src={editIcon} width="auto" height="25" />}
                  fun2={(mentorData) => {
                    onHandleDetalleMentor(mentorData);
                  }}
                  adicional={true}
                />
              ) : (
                <Subtitulo>No hay mentores disponibles</Subtitulo>
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

      {/* {show.showDetalle && (
        <DetalleTareaAdmin
          show={showPendientes.show}
          data={showPendientes.data}
          tipo={showPendientes.tipo}
          onHide={() => setShowPendientes({ show: !showPendientes.show })}
        />
      )} */}
    </>
  );
}

export default GestionMentoresPage;
