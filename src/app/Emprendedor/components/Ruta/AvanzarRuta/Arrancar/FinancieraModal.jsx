import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { messageAlert } from "src/app/Shared/utils/messageAlerts";

function FinancieraModal(props) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});

  const onHandleSubmit = () => {
    messageAlert({
      title: "Correcto!",
      confirmButtonText: "Continuar",
      icon: "success",
      onConfirm: () => onContinue(),
    });
  };

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onContinue = () => {
    props.onContinue();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
        closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{ color: "#FFF" }}>
            Preguntas sobre estructuración financiera - ARRANCAR
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Pregunta 1</Form.Label>
            <Form.Select
              name="preguntaUno"
              type="text"
              onChange={(e) => onHandleChange(e)}
            >
              <option disabled selected>
                Seleccione...
              </option>
              <option value="N">Normal</option>
              <option value="E">Especializada</option>
            </Form.Select>
            {error.preguntaUno && (
              <small className="form-text font-weight-bold text-danger">
                {error.preguntaUno}
              </small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-primary" onClick={onHandleSubmit}>
          Validar
        </button>

        <button className="btn btn-secondary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default FinancieraModal;
