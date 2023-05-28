import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";

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
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Form className="container row">
          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Asunto Consultoría</Form.Label>
            <Form.Control value={props.data.asuntoConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tipo Consultoría</Form.Label>
            <Form.Control
              value={
                props.data.tipoConsultoria == "E" ? "Especializada" : "Normal"
              }
            />
          </Form.Group>

          {props.data.tipoConsultoria == "E" && (
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Temática Consultoria</Form.Label>
              <Form.Control value={props.data.nombreSubActRuta} />
            </Form.Group>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Fecha de Consultoria</Form.Label>
            <Form.Control value={props.data.fechaConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Inicio Programada</Form.Label>
            <Form.Control value={props.data.horaInicioConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalización Programada</Form.Label>
            <Form.Control value={props.data.horaFinConsultoria} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Estado de Consultoria</Form.Label>
            <Form.Control value={props.data.estadoConsultoria} />
          </Form.Group>

          {props.data.estadoConsultoria != "PROGRAMADA" && (
            <>
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Fecha de Inicio Real</Form.Label>
                <Form.Control
                  value={
                    props.data.fechaInicioReal
                      ? moment(
                          props.data.fechaInicioReal,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                      : ""
                  }
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Fecha de Finalización Real</Form.Label>
                <Form.Control
                  value={
                    props.data.fechaFinalizacionReal
                      ? moment(
                          props.data.fechaFinalizacionReal,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                      : ""
                  }
                />
              </Form.Group>
            </>
          )}

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
            <Form.Label>Comentarios Consultoría</Form.Label>
            <Form.Control
              value={props.data.comentariosConsultoria || "Sin comentarios"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleConsultoria;
