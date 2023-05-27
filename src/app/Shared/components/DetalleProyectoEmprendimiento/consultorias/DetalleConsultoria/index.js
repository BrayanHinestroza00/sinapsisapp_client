import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";

import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

function DetalleConsultoria(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header
        closeButton
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{ color: "#FFF" }}>{props.data.tituloConsultoria}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="container row">
          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Asunto Consultoría</Form.Label>
            <Form.Control value={props.data.asuntoConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tipo Consultoría</Form.Label>
            <Form.Control
              value={
                props.data.tipoConsultoria == "E" ? "Especializada" : "Normal"
              }
              disabled
            />
          </Form.Group>

          {props.data.tipoConsultoria == "E" && (
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Temática Consultoría</Form.Label>
              <Form.Control value={props.data.nombreSubActRuta} disabled />
            </Form.Group>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Fecha de Consultoría</Form.Label>
            <Form.Control
              value={moment(
                props.data.fechaConsultoria,
                "YYYY-MM-DD hh:mm:ss"
              ).format(SINAPSIS_APP_FORMATO_FECHA)}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Inicio Programada</Form.Label>
            <Form.Control value={props.data.horaInicioConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalización Programada</Form.Label>
            <Form.Control value={props.data.horaFinConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Mentor</Form.Label>
            <Form.Control
              value={`${props.data.nombreMentor} ${props.data.apellidoMentor}`}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Correo Mentor</Form.Label>
            <Form.Control
              value={
                props.data.correoInstitucionalMentor || "Sin correo registrado"
              }
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Comentarios Consultoría</Form.Label>
            <Form.Control
              value={props.data.comentariosConsultoria || "Sin comentarios"}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleConsultoria;
