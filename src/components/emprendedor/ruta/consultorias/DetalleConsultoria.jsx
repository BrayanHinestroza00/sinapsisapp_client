import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

function DetalleConsultoria(props) {
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});

  const handleChangle = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
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
        <div className="container row">
          <div className="col-md-12">
            <h5>Asunto Consultoria</h5>
            <p>{props.data.asuntoConsultoria}</p>
          </div>

          <div className="col-md-6">
            <h5>Tipo Consultoria</h5>
            <p>
              {props.data.tipoConsultoria == "E" ? "Especializada" : "Normal"}
            </p>
          </div>

          {props.data.tipoConsultoria == "E" && (
            <div className="col-md-6">
              <h5>Tematica Consultoria</h5>
              <p>{props.data.nombreSubActRuta}</p>
            </div>
          )}

          <div className="col-md-12">
            <h5>Fecha de Consultoria</h5>
            <p>{props.data.fechaConsultoria}</p>
          </div>

          <div className="col-md-6">
            <h5>Hora Inicio</h5>
            <p>{props.data.horaInicioConsultoria}</p>
          </div>
          <div className="col-md-6">
            <h5>Hora Finalizacion</h5>
            <p>{props.data.horaFinConsultoria}</p>
          </div>

          <div className="col-md-12">
            <h5>Mentor</h5>
            <p>{`${props.data.nombreMentor} ${props.data.apellidoMentor}`}</p>
          </div>

          <div className="col-md-12">
            <h5>Correo Mentor</h5>
            <p>
              {props.data.correoInstitucionalMentor || "Sin correo registrado"}
            </p>
          </div>

          <div className="col-md-12">
            <h5>Comentarios Consultoria</h5>
            <p>{props.data.comentariosConsultoria || "Sin comentarios"}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="buttonTable btn btn-primary"
          onClick={(e) => {
            Swal.fire({
              title: "¿Estás seguro que deseas enviar la tarea?",
              icon: "question",
              iconColor: "#9a66a8",
              confirmButtonText: "Enviar",
              confirmButtonColor: "#9a66a8",
              showConfirmButton: true,
              showCancelButton: true,
              cancelButtonText: "Cancelar",
            }).then((res) => {
              if (res.isConfirmed) {
                //handleSubmit(e);
                window.alert("SUBMITTED");
              }
            });
          }}
        >
          Entregar
        </button>
        <button
          className="buttonTableO btn btn-outline-primary"
          onClick={props.onHide}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleConsultoria;
