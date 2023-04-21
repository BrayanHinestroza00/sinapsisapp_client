import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import swal from "sweetalert2";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { Card } from "react-bootstrap";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_ASIGNAR_ETAPA_INICIAL,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_MENTORES,
} from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";
import { validarAsignarEtapaInicial } from "src/utils/validaciones";
import { confirmAlertWithText } from "src/utils/alerts/ConfirmAlert";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/utils/alerts/MessageAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { AdministradorContext } from "src/services/context/AdministradorContext";

function AsignarEtapaRuta() {
  const navigate = useNavigate();
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({}); // Eleccion del administrador para dar ruta y mentor al emprendedor

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

  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    if (datos && datos.etapa) {
      fetchApiMentores({
        URL: URL_OBTENER_MENTORES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapaRutaInnovacion: datos.etapa,
          },
        },
      });
    }
  }, [datos]);

  const onHandleChange = (e) => {
    if (e.target.name == "etapa") {
      setDatos({
        [e.target.name]: e.target.value,
      });
    } else {
      setDatos({
        ...datos,
        [e.target.name]: e.target.value,
      });
    }
    setError({});
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarAsignarEtapaInicial(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title:
          "¿Estas seguro? Se asignara una etapa inicial y mentor principal al emprendedor",
        text: "Este proceso no se puede deshacer",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        onConfirm: () => handleSubmit(),
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // console.log("Data", {
    //   idProyectoEmprendimiento: state.proyectoEmprendimientoId,
    //   idEtapaRuta: datos.etapa,
    //   creado_por: userData.id,
    //   idMentorPrincipal: datos.mentorPrincipal,
    // });
    fetchAPI({
      URL: URL_ASIGNAR_ETAPA_INICIAL,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          idProyectoEmprendimiento: state.proyectoEmprendimientoId,
          idEtapaRuta: datos.etapa,
          creado_por: userData.id,
          idMentorPrincipal: datos.mentorPrincipal,
        },
      },
    });
  };

  if (loading && errorAPI) {
    messageAlert({
      title: "Algo ha fallado",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Se ha asignado la etapa y mentor correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () =>
          navigate(
            `/Administrador/Emprendimientos/${state.proyectoEmprendimientoId}`,
            {
              replace: true,
              state: state,
            }
          ),
      });
    } else {
      messageAlert({
        title: "Asignación de etapa inicial fallido",
        text: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <Card className="px-1 mx-1">
      <div className="container">
        <Titulo className="text-center">
          Asignar etapa inicial y mentor principal
        </Titulo>
        <form>
          {etapasRutaLoading ? (
            <p>Cargando...</p>
          ) : etapasRutaMessage || etapasRutaError ? (
            <p>{etapasRutaMessage || etapasRutaError}</p>
          ) : (
            <div className="mb-3">
              <label className="form-label">Etapa inicial</label>
              <br></br>
              <select
                name="etapa"
                className="form-select"
                type="text"
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.etapa || "-1"}
              >
                <option value="-1" disabled>
                  Seleccione una...
                </option>
                {etapasRutaData &&
                  etapasRutaData.length > 0 &&
                  etapasRutaData.map((etapaRuta, index) => (
                    <option key={index} value={etapaRuta.id}>
                      {etapaRuta.nombre}
                    </option>
                  ))}
              </select>
              {error.etapa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.etapa}
                </small>
              )}
            </div>
          )}

          {datos?.etapa && (
            <div className="mb-3">
              <label className="form-label">Mentor principal</label>
              <br></br>
              {mentoresLoading ? (
                <p>Cargando...</p>
              ) : mentoresMessage || mentoresError ? (
                <p>{mentoresMessage || mentoresError}</p>
              ) : (
                <select
                  name="mentorPrincipal"
                  className="form-select"
                  type="text"
                  onChange={(e) => {
                    onHandleChange(e);
                  }}
                  value={datos.mentorPrincipal || "-1"}
                >
                  <option value="-1" disabled>
                    Seleccione uno...
                  </option>
                  {mentoresData &&
                    mentoresData.length > 0 &&
                    mentoresData.map((mentor, index) => (
                      <option key={index} value={mentor.id}>
                        {`${mentor.nombreCompleto} / ${
                          mentor.cargoMentor || "Sin especialidad"
                        }`}
                      </option>
                    ))}
                </select>
              )}
              {error.mentorPrincipal && (
                <small className="form-text font-weight-bold text-danger">
                  {error.mentorPrincipal}
                </small>
              )}
            </div>
          )}
          <div className="text-center">
            <button className="btn btn-primary mb-3" onClick={onHandleSubmit}>
              Asignar
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AsignarEtapaRuta;
