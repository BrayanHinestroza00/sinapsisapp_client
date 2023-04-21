import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "src/assets/styles/emprendedor/mentores.style";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import {
  HOST,
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_MENTORES,
} from "src/utils/apiConstants";
import showIcon from "src/assets/images/showIcon.png";
import editIcon from "src/assets/images/editIcon.png";
import { useFetch } from "src/services/hooks/useFetch";
import FlexyTable from "src/components/FlexyTable";
import { validarListadoMentoresAdmin } from "src/utils/validaciones";
import RegistrarMentor from "src/components/administrador/registrar_mentor/RegistrarMentor";

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
            "Numero Documento": `${mentorData.acronimoTipoDocumento} - ${mentorData.numeroDocumento}`,
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
    let erroresFormulario = validarListadoMentoresAdmin(datosFiltro);
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
            <p>Cargando...</p>
          </Ruta>
        ) : etapasRutaMessage || etapasRutaError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {etapasRutaMessage && <SubTitulo>{etapasRutaMessage}</SubTitulo>}

            {etapasRutaError && <SubTitulo>{etapasRutaError}</SubTitulo>}
          </Ruta>
        ) : (
          <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
            <SubTitulo>Filtros</SubTitulo>

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
                  Etapa de la Ruta de Innovacion & Emprendimiento
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
            <p>Cargando...</p>
          </Ruta>
        ) : mentoresError || mentoresMessage ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {mentoresError && <SubTitulo>{mentoresError}</SubTitulo>}

            {mentoresMessage && <SubTitulo>{mentoresMessage}</SubTitulo>}
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
                <SubTitulo>No hay mentores disponibles</SubTitulo>
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
