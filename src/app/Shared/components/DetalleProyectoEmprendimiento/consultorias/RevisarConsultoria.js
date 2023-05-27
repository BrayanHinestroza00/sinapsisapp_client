import { useState } from "react";
import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";

import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import { validarRevisionConsultoria } from "src/app/Shared/services/validation/validateConsultoria.js";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

function RevisarConsultoria({ data, show, onHide }) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});

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
        title: "¿Estás seguro que deseas iniciar/terminar la consultoría?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Iniciar/Terminar Consultoría",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
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

  const submitForm = () => {};
  const submitFormInasistencia = () => {};

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
      <Modal.Body style={{ backgroundColor: "#faedfc" }}>
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
            <Form.Control value={data.horaInicioConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalización Programada</Form.Label>
            <Form.Control value={data.horaFinConsultoria} disabled />
          </Form.Group>

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
            />
            {error.comentariosConsultoria && (
              <small className="form-text font-weight-bold text-danger">
                {error.comentariosConsultoria}
              </small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {data.estadoConsultoria === "PROGRAMADA" && (
          <>
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                onHandleSubmit(e);
              }}
            >
              INICIAR CONSULTORÍA
            </Button>

            <Button
              className="btn btn-secondary"
              onClick={(e) => {
                onHandleSubmitInasistencia(e);
              }}
            >
              MARCAR INASISTENCIA
            </Button>
          </>
        )}

        {data.estadoConsultoria === "EN CURSO" && (
          <Button
            className="btn btn-primary"
            onClick={(e) => {
              onHandleSubmit(e);
            }}
          >
            Terminar Consultoría
          </Button>
        )}

        <Button className="btn bg-danger" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarConsultoria;
