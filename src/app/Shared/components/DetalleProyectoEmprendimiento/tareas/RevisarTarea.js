import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import {
  HOST,
  HTTP_METHOD_POST,
  URL_CALIFICAR_TAREA_EMPRENDEDOR,
  URL_STATIC_UPLOAD_IMAGES,
} from "src/app/Shared/utils/apiConstants";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts.js";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { validarCalificacionTarea } from "src/app/Shared/services/validation/validateTareas";

function RevisarTarea({ show, data, onHide }) {
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const onHandleChange = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    let erroresFormulario = validarCalificacionTarea(datosTarea);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas calificar la tarea?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Calificar Tarea",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    setLoading(true);
    fetchAPI({
      URL: URL_CALIFICAR_TAREA_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          ...datosTarea,
          idTarea: data.idTarea,
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
        title: "Tarea Calificada Exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onHide();
          window.location.reload();
        },
      });
      setDatosTarea({});
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
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{ color: "#FFF" }}>{data.titulo}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div>
          <h4 className="text-center">Descripción de la tarea</h4>
          <p>{data.descripcionTarea}</p>
        </div>
        {data.urlArchivosEntrega && (
          <>
            <hr />
            <div className="text-center">
              <h4>Tarea entregada por el emprendedor</h4>
              <p>
                Descarga el archivo y realiza la retroalimentación al
                emprendedor
              </p>
              <a
                rel="noreferrer"
                className="text-center"
                href={`${HOST}/${data.urlArchivosEntrega}`}
                target="_blank"
              >
                <img
                  src={URL_STATIC_UPLOAD_IMAGES}
                  height="150"
                  alt="Click aqui"
                />
              </a>
              <br />
              <label className="form-label mt-3">
                Da click
                <a
                  rel="noreferrer"
                  className="text-center"
                  href={`${HOST}/${data.urlArchivosEntrega}`}
                  target="_blank"
                >
                  Aquí
                </a>
                o en la imagen para descargar
              </label>
              <br />
            </div>
          </>
        )}

        <hr />
        <div>
          <h5>Estado de Entrega</h5>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Estado de la Entrega</td>
                  <td>{data.estadoEntrega}</td>
                </tr>
                <tr>
                  <td>Estado de la Calificación</td>
                  <td>{data.calificacion || "SIN CALIFICAR"}</td>
                </tr>
                <tr>
                  <td>Fecha de Entrega</td>
                  <td>{data.fechaEntrega || "SIN ENTREGAR"}</td>
                </tr>
                {!data.urlArchivosEntrega && (
                  <tr>
                    <td>Archivos Enviados</td>
                    <td>SIN ARCHIVOS ENVIADOS</td>
                  </tr>
                )}

                <tr>
                  <td>Comentarios del Emprendedor</td>
                  <td>
                    {data.comentariosEntregaEmprendedor || "SIN COMENTARIOS"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div>
          <h4 className="text-center">Retroalimentación</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Calificación de la Entrega</Form.Label>
              <Form.Select
                name="calificacionEntrega"
                type="text"
                onChange={(e) => onHandleChange(e)}
              >
                <option disabled selected>
                  Calificación de tarea
                </option>
                <option value="A">Aprobada</option>
                <option value="R">Reprobada</option>
              </Form.Select>
              {error.calificacionEntrega && (
                <small className="form-text font-weight-bold text-danger">
                  {error.calificacionEntrega}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comentarios de la Entrega</Form.Label>
              <br />
              <Form.Control
                as="textarea"
                cols={3}
                name="comentariosEntrega"
                onChange={(e) => onHandleChange(e)}
              />
              {error.comentariosEntrega && (
                <small className="form-text font-weight-bold text-danger">
                  {error.comentariosEntrega}
                </small>
              )}
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button className="btn btn-primary" onClick={(e) => onHandleSubmit(e)}>
          Calificar
        </Button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarTarea;
