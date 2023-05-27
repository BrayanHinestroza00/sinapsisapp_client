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
import { getCurrentDateTime } from "src/app/Shared/utils/utilityFunctions";

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
    setDatos({
      ...datos,
      fileTarea,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarCreacionTarea(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas crear la tarea?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Crear Tarea",
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

    console.log(
      "hora",
      moment(fechaEntrega, SINAPSIS_APP_FORMATO_FECHA_HORA_INPUT).format(
        SINAPSIS_APP_FORMATO_FECHA_HORA
      )
    );

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
        title: "Tarea creada exitosamente",
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
          <h1 style={{ color: "#FFF" }}>Crear tarea</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div className="container">
          <form encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Tarea</Form.Label>
              <Form.Control
                name="nombreTarea"
                className="form-control"
                placeholder="Nombre tarea"
                type="text"
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.nombreTarea}
              />

              {error.nombreTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nombreTarea}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción de la Tarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcionTarea"
                className="form-control"
                placeholder="Descripción"
                onChange={(e) => {
                  onHandleChange(e);
                }}
                value={datos.descripcionTarea}
              />
              {error.descripcionTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.descripcionTarea}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Límite de Entrega</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adjunta tus archivos</Form.Label>
              <DropZoneComponent
                upFiles={getFiles}
                files={datos?.fileTarea}
                filesUrl={datos?.fileTarea}
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
        <Button className="btn btn-secondary" onClick={onHide}>
          Cancelar
        </Button>

        <Button
          className="btn btn-primary"
          onClick={(e) => {
            onHandleSubmit(e);
          }}
        >
          Crear Tarea
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearTarea;
