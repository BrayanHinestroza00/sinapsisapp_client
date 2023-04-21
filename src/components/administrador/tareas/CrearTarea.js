import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import {
  HOST,
  HTTP_METHOD_POST,
  URL_CREAR_TAREA_EMPRENDEDOR,
} from "src/utils/apiConstants";
import DropZone from "src/components/DropZone";
import { validarCreacionTarea } from "src/utils/validaciones";
import { confirmAlertWithText } from "src/utils/alerts/ConfirmAlert";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import moment from "moment";
import {
  SINAPSIS_APP_FORMATO_FECHA_HORA,
  SINAPSIS_APP_FORMATO_FECHA_HORA_INPUT,
} from "src/utils/constants";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/utils/alerts/MessageAlert";
import { useFetch } from "src/services/hooks/useFetch";
import { AdministradorContext } from "src/services/context/AdministradorContext";

function CrearTarea({ show, onHide, idProyectoEmprendimiento }) {
  const { userData } = useContext(AdministradorContext);
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
    form.append("usuarioCrea", userData.id);

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
        title: "Tarea Creada Exitosamente",
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
              <Form.Label>Descripcion de la Tarea</Form.Label>
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
              <Form.Label>Fecha Limite de Entrega</Form.Label>
              <Form.Control
                name="fechaEntrega"
                className="form-control"
                placeholder="Fecha Limite de Entrega"
                type="datetime-local"
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
              <DropZone upFiles={getFiles} files={datos?.fileTarea} />
              {(datos.fileTarea || datos.urlFileTarea) && (
                <aside style={thumbsContainer}>
                  <div style={thumb}>
                    <div style={thumbInner}>
                      <img
                        src={
                          datos.fileTarea
                            ? URL.createObjectURL(datos?.fileTarea[0])
                            : datos.urlFileTarea
                            ? `${HOST}/${datos.urlFileTarea}`
                            : ""
                        }
                        style={img}
                        alt={
                          datos.fileTarea
                            ? datos.fileTarea[0].name
                            : datos.urlFileTarea
                        }
                      />
                    </div>
                  </div>
                </aside>
              )}

              {error.fileTarea && (
                <small className="form-text font-weight-bold text-danger">
                  {error.fileTarea}
                </small>
              )}
            </Form.Group>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={onHide}>
          Cancelar
        </Button>

        <Button
          className="btn btn-primary"
          onClick={(e) => {
            onHandleSubmit(e);
          }}
        >
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CrearTarea;
