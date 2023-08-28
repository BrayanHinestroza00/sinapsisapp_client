import moment from "moment";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import {
  getCurrentDate,
  getCurrentTime,
} from "src/app/Shared/utils/utilityFunctions";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_MENTORES,
  URL_OBTENER_TEMATICAS_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
  URL_PROGRAMAR_CONSULTORIA_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { validarCreacionConsultoria } from "src/app/Shared/services/validation/validateConsultoria.js";
import {
  SINAPSIS_APP_FORMATO_FECHA_HORA,
  SINAPSIS_APP_FORMATO_FECHA_INPUT,
} from "src/app/Shared/utils/constants";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function CrearConsultoria({
  show,
  onHide,
  idProyectoEmprendimiento,
  idEtapaRuta,
  tipoUsuario,
  idUsuario,
}) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const {
    data: mentoresData,
    message: mentoresMessage,
    error: mentoresError,
    loading: mentoresLoading,
    fetchAPI: fetchApiMentores,
  } = useFetch();

  const {
    data: tematicasEtapaData,
    message: tematicasEtapaMessage,
    error: tematicasEtapaError,
    loading: tematicasEtapaLoading,
    fetchAPI: fetchApiTematicasEtapa,
  } = useFetch();

  useEffect(() => {
    if (tipoUsuario == 3 && datos && datos.tipoConsultoria == "E") {
      fetchApiTematicasEtapa({
        URL: URL_OBTENER_TEMATICAS_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapa: idEtapaRuta,
          },
        },
      });
    }
  }, [datos.tipoConsultoria]);

  useEffect(() => {
    fetchApiMentores({
      URL: URL_OBTENER_MENTORES,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idEtapaRutaInnovacion: idEtapaRuta,
        },
      },
    });
  }, []);

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarCreacionConsultoria(datos, tipoUsuario);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas programar la consultoría?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Programar Consultoría",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    setLoading(true);

    const tipoConsultoria = tipoUsuario == 3 ? datos.tipoConsultoria : "N";

    const mentor = tipoUsuario == 3 ? datos.mentor : idUsuario;

    fetchAPI({
      URL: URL_PROGRAMAR_CONSULTORIA_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          ...datos,
          mentor: mentor,
          titulo: datos.tituloConsultoria,
          tipoConsultoria: tipoConsultoria,
          fechaConsultoria: moment(
            datos.fechaConsultoria,
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA_HORA),
          proyectoEmprendimiento: idProyectoEmprendimiento,
          usuarioCrea: idUsuario,
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
        title: "Consultoría Creada Exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onHide();
          window.location.reload();
        },
      });
      setDatos({});
    } else {
      messageAlertWithoutText({
        title: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
      >
        <Modal.Title>
          <h1 style={{ color: "#FFF" }}>Programar Consultoría</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Form encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              Título de Consultoría
            </Form.Label>
            <Form.Control
              name="tituloConsultoria"
              className="form-control"
              placeholder="Título de Consultoría"
              type="text"
              onChange={(e) => {
                onHandleChange(e);
              }}
              value={datos.tituloConsultoria}
              autoComplete="off"
              autoFocus
            />
            {error.tituloConsultoria && (
              <small class="form-text font-weight-bold text-danger">
                {error.tituloConsultoria}
              </small>
            )}
          </Form.Group>

          {tipoUsuario == 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Consultoría</Form.Label>
                <Form.Select
                  name="tipoConsultoria"
                  type="text"
                  onChange={(e) => onHandleChange(e)}
                >
                  <option disabled selected>
                    Seleccione el tipo de consultoría...
                  </option>
                  <option value="N">Normal</option>
                  <option value="E">Especializada</option>
                </Form.Select>
                {error.tipoConsultoria && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.tipoConsultoria}
                  </small>
                )}
              </Form.Group>

              {datos?.tipoConsultoria == "E" && (
                <>
                  {tematicasEtapaLoading ? (
                    <LoadingSpinner width="5rem" height="5rem" />
                  ) : tematicasEtapaMessage || tematicasEtapaError ? (
                    <p>{tematicasEtapaMessage || tematicasEtapaError}</p>
                  ) : (
                    <Form.Group className="mb-3">
                      <Form.Label>Temática de Consultoría</Form.Label>
                      <Form.Select
                        name="subActividadRuta"
                        type="text"
                        onChange={(e) => onHandleChange(e)}
                      >
                        <option disabled selected>
                          Seleccione la Temática...
                        </option>
                        {tematicasEtapaData &&
                          tematicasEtapaData.length > 0 &&
                          tematicasEtapaData.map((tematicaEtapa, index) => (
                            <option
                              key={index}
                              value={tematicaEtapa.idSubActividadRuta}
                            >
                              {tematicaEtapa.nombreSubActividadRuta}
                            </option>
                          ))}
                      </Form.Select>
                      {error.subActividadRuta && (
                        <small className="form-text font-weight-bold text-danger">
                          {error.subActividadRuta}
                        </small>
                      )}
                    </Form.Group>
                  )}
                </>
              )}

              {mentoresLoading ? (
                <LoadingSpinner width="5rem" height="5rem" />
              ) : mentoresMessage || mentoresError ? (
                <p>{mentoresMessage || mentoresError}</p>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Mentor de Consultoría</Form.Label>
                  <Form.Select
                    name="mentor"
                    type="text"
                    onChange={(e) => onHandleChange(e)}
                  >
                    <option disabled selected>
                      Seleccione el mentor...
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
                  </Form.Select>
                  {error.mentor && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.mentor}
                    </small>
                  )}
                </Form.Group>
              )}
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              Asunto de Consultoría
            </Form.Label>
            <Form.Control
              as="textarea"
              cols={3}
              name="asuntoConsultoria"
              className="form-control"
              placeholder="Asunto de Consultoría"
              type="text"
              onChange={(e) => {
                onHandleChange(e);
              }}
              value={datos.asuntoConsultoria || ""}
              autoComplete="off"
            />
            {error.asuntoConsultoria && (
              <small class="form-text font-weight-bold text-danger">
                {error.asuntoConsultoria}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">Fecha de consultoría</Form.Label>
            <Form.Control
              name="fechaConsultoria"
              className="form-control"
              type="date"
              min={getCurrentDate()}
              onChange={(e) => {
                onHandleChange(e);
              }}
              value={datos.fechaConsultoria}
            />
            {error.fechaConsultoria && (
              <small class="form-text font-weight-bold text-danger">
                {error.fechaConsultoria}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              Hora de inicio consultoría
            </Form.Label>
            <Form.Control
              name="horaInicio"
              className="form-control"
              placeholder="Fecha de entrega"
              type="time"
              min={getCurrentTime()}
              onChange={(e) => {
                onHandleChange(e);
              }}
              value={datos.horaInicio}
            />
            {error.horaInicio && (
              <small class="form-text font-weight-bold text-danger">
                {error.horaInicio}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              Hora de fin consultoría
            </Form.Label>
            <Form.Control
              name="horaFinalizacion"
              className="form-control"
              placeholder="Fecha de entrega"
              type="time"
              min={getCurrentTime()}
              onChange={(e) => {
                onHandleChange(e);
              }}
              value={datos.horaFinalizacion}
            />
            {error.horaFinalizacion && (
              <small class="form-text font-weight-bold text-danger">
                {error.horaFinalizacion}
              </small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button
          variant="primary"
          onClick={(e) => {
            onHandleSubmit(e);
          }}
        >
          Programar Consultoría
        </Button>

        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearConsultoria;
