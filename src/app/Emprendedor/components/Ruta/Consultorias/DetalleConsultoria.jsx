import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function DetalleConsultoria(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
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
            <Form.Label>Asunto Consultoria</Form.Label>
            <Form.Control value={props.data.asuntoConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tipo Consultoria</Form.Label>
            <Form.Control
              value={
                props.data.tipoConsultoria == "E" ? "Especializada" : "Normal"
              }
            />
          </Form.Group>

          {props.data.tipoConsultoria == "E" && (
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Tematica Consultoria</Form.Label>
              <Form.Control value={props.data.nombreSubActRuta} />
            </Form.Group>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Fecha de Consultoria</Form.Label>
            <Form.Control value={props.data.fechaConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Inicio</Form.Label>
            <Form.Control value={props.data.horaInicioConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalizacion</Form.Label>
            <Form.Control value={props.data.horaFinConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Mentor</Form.Label>
            <Form.Control
              value={`${props.data.nombreMentor} ${props.data.apellidoMentor}`}
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Correo Mentor</Form.Label>
            <Form.Control
              value={
                props.data.correoInstitucionalMentor || "Sin correo registrado"
              }
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Comentarios Consultoria</Form.Label>
            <Form.Control
              value={props.data.comentariosConsultoria || "Sin comentarios"}
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
