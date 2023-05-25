import Swal from "sweetalert2";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/app/Shared/components/DropZone/styled";
import {
  HOST,
  HTTP_METHOD_POST,
  URL_ENTREGAR_TAREA_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { validarEntregaTarea } from "src/app/Shared/services/validation/validateTareas";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";

import downloadIcon from "src/app/Shared/assets/images/icons/download_icon.png";

function DetalleTarea(props) {
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const getFiles = (files) => {
    setDatosTarea({
      ...datosTarea,
      files,
    });
  };

  const onHandleChange = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarEntregaTarea(datosTarea);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas entregar la tarea?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Entregar Tarea",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    const { files, comentarioEmprendedor } = datosTarea;

    const form = new FormData();
    form.append("idTarea", props.data.idTarea);
    form.append("comentariosEntrega", comentarioEmprendedor);
    form.append("fileEntrega", files[0]);

    setLoading(true);
    fetchAPI({
      URL: URL_ENTREGAR_TAREA_EMPRENDEDOR,
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
        title: "Tarea Entregada Exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          props.onHide();
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
          <h1 style={{ color: "#FFF" }}>{props.data.titulo}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div className="container">
          <div className="row">
            <h5>Descripción</h5>
            <p>{props.data.descripcionTarea}</p>
          </div>

          {props.data.urlMaterialApoyo && (
            <div className="row">
              <h5>Recursos del docente</h5>
              <br />
              <div className="text-center">
                <a
                  className="text-center"
                  href={`${HOST}/${props.data.urlMaterialApoyo}`}
                  target="_blank"
                >
                  <img src={downloadIcon} width="25%" alt="downloadIcon" />
                </a>
                <br />
              </div>
            </div>
          )}

          <div className="row">
            <h5>Estado de Entrega</h5>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Estado de la Entrega</td>
                    <td>{props.data.estadoEntrega}</td>
                  </tr>
                  <tr>
                    <td>Estado de la Calificación</td>
                    <td>{props.data.calificacion || "SIN ENTREGAR"}</td>
                  </tr>
                  <tr>
                    <td>Fecha de Entrega</td>
                    <td>{props.data.fechaEntrega || "SIN ENTREGAR"}</td>
                  </tr>
                  <tr>
                    <td>Archivos Enviados</td>
                    <td>
                      {props.data.urlArchivosEntrega ? (
                        <aside style={thumbsContainer}>
                          <div style={thumb}>
                            <div style={thumbInner}>
                              <img
                                src={`${HOST}/${props.data.urlArchivosEntrega}`}
                                style={img}
                                alt={"Documentos entregados"}
                              />
                            </div>
                          </div>
                        </aside>
                      ) : (
                        "SIN ARCHIVOS ENVIADOS"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Comentarios de la Entrega</td>
                    <td>
                      {props.data.comentariosEntregaEmprendedor ||
                        "SIN COMENTARIOS"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {props.tipo == "PENDIENTES" && (
            <Form encType="multipart/form-data">
              <div className="row">
                <Form.Group className="mb-3">
                  <h6>Sube tú tarea</h6>
                  <DropZoneComponent
                    upFiles={getFiles}
                    files={datosTarea?.files}
                    filesUrl={props.data.urlArchivosEntrega}
                  />
                  {error.files && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.files}
                    </small>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <h5>Comentarios de tú entrega</h5>
                  <Form.Label>Comentario </Form.Label>
                  <br />
                  <Form.Control
                    as="textarea"
                    cols={3}
                    name="comentarioEmprendedor"
                    className="form-control"
                    onChange={(e) => onHandleChange(e)}
                  />
                </Form.Group>
              </div>
            </Form>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        {props.tipo == "PENDIENTES" && (
          <button className="btn btn-primary" onClick={onHandleSubmit}>
            Entregar Tarea
          </button>
        )}

        <button className="btn btn-secondary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleTarea;
