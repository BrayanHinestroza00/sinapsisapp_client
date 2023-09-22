import moment from "moment";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import DropZoneComponent from "../../DropZone/DropZoneComponent";

import {
  HTTP_METHOD_POST,
  URL_CREAR_TAREA_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { validarCreacionTarea } from "src/app/Shared/services/validation/validateTareas";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";

import {
  SINAPSIS_APP_FORMATO_FECHA_HORA,
  SINAPSIS_APP_FORMATO_FECHA_HORA_INPUT,
} from "src/app/Shared/utils/constants";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";

function CrearTarea({
  show,
  onHide,
  idProyectoEmprendimiento,
  idUsuario,
  tipoUsuario,
}) {
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

  const getFiles = (fileTarea) => {
    delete error.fileTarea;
    setDatos({
      ...datos,
      fileTarea,
    });
  };

  const getFilesRejected = (mensajeError) => {
    setError({ ...error, fileTarea: mensajeError });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarCreacionTarea(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas crear el reto?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Crear Reto",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    const { fileTarea, descripcionTarea, fechaEntrega, nombreTarea } = datos;

    const form = new FormData();
    form.append("nombreTarea", nombreTarea);
    form.append("descripcionTarea", descripcionTarea);
    form.append(
      "fechaEntrega",
      moment(fechaEntrega, SINAPSIS_APP_FORMATO_FECHA_HORA_INPUT).format(
        SINAPSIS_APP_FORMATO_FECHA_HORA
      )
    );
    form.append("idProyectoEmprendimiento", idProyectoEmprendimiento);
    form.append("fileTarea", fileTarea[0]);
    form.append("usuarioCrea", idUsuario);

    setLoading(true);
    fetchAPI({
      URL: URL_CREAR_TAREA_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: form,
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
        title: "Reto creado exitosamente",
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
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
      >
        <Modal.Title>
          <h1 style={{ color: "#FFF" }}>Crear Reto</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div className="container">
          <form encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>
                Nombre<span className="text-danger"> (*)</span>
              </Form.Label>
              <Form.Control
                name="nombreTarea"
                className="form-control"
                placeholder="Nombre del reto"
                type="text"
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.nombreTarea}
                autoComplete="off"
                autoFocus
              />

              {error.nombreTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nombreTarea}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Descripción <span className="text-danger"> (*)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcionTarea"
                className="form-control"
                placeholder="Descripción del reto"
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.descripcionTarea}
                autoComplete="off"
              />
              {error.descripcionTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.descripcionTarea}
                </small>
              )}
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>
                Fecha Límite de Entrega{" "}
                <span className="text-danger"> (*)</span>
              </Form.Label>
              <Form.Control
                name="fechaEntrega"
                className="form-control"
                placeholder="Fecha Límite de Entrega"
                type="datetime-local"
                min={getCurrentDateTime({ space: false })}
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.fechaEntrega}
              />
              {error.fechaEntrega && (
                <small className="form-text font-weight-bold text-danger">
                  {error.fechaEntrega}
                </small>
              )}
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>
                Adjunta tus archivos <span className="text-danger"> (*)</span>
              </Form.Label>
              <DropZoneComponent
                upFiles={getFiles}
                upFilesRejected={getFilesRejected}
                files={datos?.fileTarea}
                accept={{
                  "application/msword": [],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [],
                  "application/zip": [],
                  "application/vnd.rar": [],
                  "image/jpeg": [],
                  "image/png": [],
                  "application/pdf": [],
                  "text/plain": [],
                  "application/vnd.ms-excel": [],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [],
                }}
              />

              {error.fileTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.fileTarea}
                </small>
              )}
            </Form.Group>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button
          variant="primary"
          onClick={(e) => {
            onHandleSubmit(e);
          }}
        >
          Crear Reto
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearTarea;
