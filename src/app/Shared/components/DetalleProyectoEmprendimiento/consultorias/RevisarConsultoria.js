import { useState } from "react";
import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";

import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import { validarRevisionConsultoria } from "src/app/Shared/services/validation/validateConsultoria.js";
import {
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_FORMATO_FECHA_HORA,
} from "src/app/Shared/utils/constants";
import { compareWithCurrentDate } from "src/app/Shared/utils/utilityFunctions";
import {
  HTTP_METHOD_POST,
  URL_INICIAR_CONSULTORIA,
  URL_MARCAR_INASISTENCIA_CONSULTORIA,
  URL_TERMINAR_CONSULTORIA,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function RevisarConsultoria({ data, idUsuario, show, onHide }) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    let erroresFormulario = validarRevisionConsultoria(datos, "A");
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas iniciar la consultoría?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Iniciar Consultoría",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm("I"),
      });
    }
  };

  const onHandleSubmitInasistencia = (e) => {
    let erroresFormulario = validarRevisionConsultoria(datos, "I");
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas marcar la inasistencia?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Marcar Inasistencia de Emprendedor",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitFormInasistencia(),
      });
    }
  };

  const onHandleSubmitTerminar = (e) => {
    let erroresFormulario = validarRevisionConsultoria(datos, "A");
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas terminar la consultoría?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Terminar Consultoría",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm("T"),
      });
    }
  };

  const submitForm = (tipo) => {
    setLoading(true);
    const idConsultoria = data.idConsultoria;

    fetchAPI({
      URL: tipo == "I" ? URL_INICIAR_CONSULTORIA : URL_TERMINAR_CONSULTORIA,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data:
          tipo == "I"
            ? {
                idConsultoria,
              }
            : {
                idConsultoria,
                comentariosConsultoria: datos.comentariosConsultoria,
              },
      },
    });
  };
  const submitFormInasistencia = () => {
    setLoading(true);
    const idConsultoria = data.idConsultoria;

    fetchAPI({
      URL: URL_MARCAR_INASISTENCIA_CONSULTORIA,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          idConsultoria,
          comentariosConsultoria: datos.comentariosConsultoria,
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
        title: "Realizado correctamente!",
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      onHide={onHide}
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
        closeButton
      >
        <Modal.Title>
          <h1 style={{ color: "#FFF" }}>{data.tituloConsultoria}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Form className="container row">
          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Asunto Consultoría</Form.Label>
            <Form.Control value={data.asuntoConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tipo Consultoría</Form.Label>
            <Form.Control
              value={data.tipoConsultoria == "E" ? "Especializada" : "Normal"}
              disabled
            />
          </Form.Group>

          {data.tipoConsultoria == "E" && (
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Temática Consultoría</Form.Label>
              <Form.Control value={data.nombreSubActRuta} disabled />
            </Form.Group>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Fecha de Consultoría</Form.Label>
            <Form.Control
              value={moment(
                data.fechaConsultoria,
                "YYYY-MM-DD hh:mm:ss"
              ).format(SINAPSIS_APP_FORMATO_FECHA)}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Inicio Programada</Form.Label>
            <Form.Control
              value={moment(data.horaInicioConsultoria, "hh:mm").format(
                "hh:mm A"
              )}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalización Programada</Form.Label>
            <Form.Control
              value={moment(data.horaFinConsultoria, "hh:mm").format("hh:mm A")}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Estado de Consultoría</Form.Label>
            <Form.Control value={data.estadoConsultoria} disabled />
          </Form.Group>

          {data.estadoConsultoria != "PROGRAMADA" && (
            <>
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Fecha de Inicio Real</Form.Label>
                <Form.Control
                  value={
                    data.fechaInicioReal
                      ? moment(
                          data.fechaInicioReal,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                      : ""
                  }
                  disabled
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Fecha de Finalización Real</Form.Label>
                <Form.Control
                  value={
                    data.fechaFinalizacionReal
                      ? moment(
                          data.fechaFinalizacionReal,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                      : ""
                  }
                  disabled
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Mentor</Form.Label>
            <Form.Control
              value={`${data.nombreMentor} ${data.apellidoMentor}`}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Correo Mentor</Form.Label>
            <Form.Control
              value={data.correoInstitucionalMentor || "Sin correo registrado"}
              disabled
            />
          </Form.Group>

          {data.estadoConsultoria == "EN CURSO" && (
            <Form.Group className="col-md-12 mb-3">
              <Form.Label>Comentarios Consultoría</Form.Label>
              <Form.Control
                as="textarea"
                cols={3}
                name="comentariosConsultoria"
                onChange={(e) => onHandleChange(e)}
                value={
                  datos.comentariosConsultoria ||
                  data.comentariosConsultoria ||
                  ""
                }
                disabled={data.idMentor != idUsuario}
              />
              {error.comentariosConsultoria && (
                <small className="form-text font-weight-bold text-danger">
                  {error.comentariosConsultoria}
                </small>
              )}
            </Form.Group>
          )}

          {data.estadoConsultoria == "PROGRAMADA" && (
            <Form.Group className="col-md-12 mb-3">
              <Form.Label>Comentarios Consultoría</Form.Label>
              <Form.Control
                as="textarea"
                cols={3}
                name="comentariosConsultoria"
                onChange={(e) => onHandleChange(e)}
                value={
                  datos.comentariosConsultoria ||
                  data.comentariosConsultoria ||
                  ""
                }
                disabled={
                  !compareWithCurrentDate(
                    moment(data.fechaConsultoria, "YYYY-MM-DD hh:mm:ss").format(
                      SINAPSIS_APP_FORMATO_FECHA
                    )
                  )
                }
              />
              {error.comentariosConsultoria && (
                <small className="form-text font-weight-bold text-danger">
                  {error.comentariosConsultoria}
                </small>
              )}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        {data.estadoConsultoria === "PROGRAMADA" &&
          compareWithCurrentDate(
            moment(data.fechaConsultoria, "YYYY-MM-DD hh:mm:ss").format(
              SINAPSIS_APP_FORMATO_FECHA
            )
          ) && (
            <>
              <Button
                variant="primary"
                onClick={(e) => {
                  onHandleSubmit(e);
                }}
              >
                Iniciar Consultoría
              </Button>

              <Button
                variant="danger"
                onClick={(e) => {
                  onHandleSubmitInasistencia(e);
                }}
              >
                Marcar Inasistencia
              </Button>
            </>
          )}

        {data.estadoConsultoria === "EN CURSO" && (
          <Button
            variant="primary"
            onClick={(e) => {
              onHandleSubmitTerminar(e);
            }}
          >
            Terminar Consultoría
          </Button>
        )}

        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarConsultoria;
