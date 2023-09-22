import moment from "moment";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import { Label, Table } from "./styled";
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
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";
import { getArchivo } from "src/app/Shared/utils/utilityFunctions";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import downloadIcon from "src/app/Shared/assets/images/icons/download_icon.png";
import { Titulo } from "src/app/Shared/assets/styles/Common";

function DetalleTarea(props) {
  const [datosImagen, setDatosImagen] = useState({});
  const [datosImagenEnviados, setDatosImagenEnviados] = useState({});
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    obtenerImagen();
  }, []);

  useEffect(() => {
    obtenerImagenEnviados();
  }, []);

  const obtenerImagen = async () => {
    if (props.data.urlMaterialApoyo) {
      const imagen = await getArchivo(props.data.urlMaterialApoyo);
      setDatosImagen({
        url: `data:${imagen.contentType};base64,${imagen.file}`,
        filename: imagen.filename,
      });
    }
  };

  const obtenerImagenEnviados = async () => {
    if (props.data.urlArchivosEntrega) {
      const imagen = await getArchivo(props.data.urlArchivosEntrega);
      setDatosImagenEnviados({
        url: `data:${imagen.contentType};base64,${imagen.file}`,
        filename: imagen.filename,
      });
    }
  };

  const getFiles = (files) => {
    delete error.files;
    setDatosTarea({
      ...datosTarea,
      files,
    });
  };

  const getFilesRejected = (mensajeError) => {
    setError({ ...error, files: mensajeError });
  };

  const onHandleChange = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarEntregaTarea(datosTarea, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas entregar el reto?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Entregar Reto",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    const { files, comentarioEmprendedor } = datosTarea;

    const form = new FormData();
    form.append("idTarea", props.data.idTarea);
    if (comentarioEmprendedor) {
      form.append("comentariosEntrega", comentarioEmprendedor);
    }
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
        title: "Reto entregado exitosamente",
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
        <Form className="container" encType="multipart/form-data">
          <Titulo className="text-bold">Información del Reto</Titulo>
          <Form.Group className="row mb-3">
            <Label style={{ fontWeight: "600" }}>Descripción</Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={props.data.descripcionTarea}
              disabled
            />
          </Form.Group>

          {datosImagen == null ? (
            <LoadingSpinner width="30%" height="30%" />
          ) : (
            <Form.Group className="row mb-3">
              <Label style={{ fontWeight: "600" }}>
                Recursos compartidos por el facilitador
              </Label>
              <br />
              <div className="text-center">
                <a
                  className="text-center"
                  href={datosImagen.url}
                  download={datosImagen.filename}
                  target="_blank"
                >
                  <img src={downloadIcon} width="25%" alt="downloadIcon" />
                </a>
                <br />
              </div>
            </Form.Group>
          )}

          <Form.Group className="row mb-3">
            <Label style={{ fontWeight: "600" }}>Estado de Entrega</Label>
            <div>
              <Table className="table table-bordered table_tarea">
                <tbody>
                  <tr>
                    <td>Estado de la Entrega</td>
                    <td>{props.data.estadoEntrega}</td>
                  </tr>
                  {/* {props.data.estadoEntrega == "PENDIENTE" && (
                    <tr>
                      <td>Fecha Límite de Entrega</td>
                      <td>
                        {moment(
                          props.data.fechaLimiteEntrega,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)}
                      </td>
                    </tr>
                  )} */}
                  <tr>
                    <td>Estado de la Calificación</td>
                    <td>
                      {props.data.estadoEntrega == "CALIFICADA"
                        ? `${props.data.calificacion} - calificación: (${props.data.calificacionCuantitativa})`
                        : "SIN ENTREGAR"}
                    </td>
                  </tr>
                  <tr>
                    <td>Fecha de Entrega</td>
                    <td>
                      {props.data.fechaEntrega
                        ? moment(
                            props.data.fechaEntrega,
                            "YYYY-MM-DD hh:mm:ss"
                          ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                        : "SIN ENTREGAR"}
                    </td>
                  </tr>
                  <tr>
                    <td>Archivos Enviados</td>
                    <td>
                      {props.data.urlArchivosEntrega
                        ? datosImagenEnviados != null && (
                            <div className="text-center">
                              <a
                                className="text-center"
                                href={datosImagenEnviados.url}
                                download={datosImagenEnviados.filename}
                                target="_blank"
                              >
                                <img
                                  src={downloadIcon}
                                  width="25%"
                                  alt="downloadIcon"
                                />
                              </a>
                              <br />
                            </div>
                          )
                        : "SIN ARCHIVOS ENVIADOS"}
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
              </Table>
            </div>
          </Form.Group>

          <div className="row mb-3">
            <Titulo className="text-bold">Información de Facilitador</Titulo>
            <br />
            <Form.Group className="mb-3">
              <Label style={{ fontWeight: "600" }}>Facilitador </Label>
              <Form.Control
                value={`${props.data.nombresCrea} ${props.data.apellidosCrea}`}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Label style={{ fontWeight: "600" }}>Correo Facilitador </Label>
              <Form.Control
                value={
                  props.data.correoInstitucionalCrea ||
                  props.data.correoPersonalCrea
                }
                disabled
              />
            </Form.Group>
          </div>

          {props.tipo == "PENDIENTES" && (
            <>
              <hr />
              <Titulo className="text-bold">Realiza tu Entrega</Titulo>
              <div className="row mb-3">
                <Form.Group className="mb-3">
                  <Label style={{ fontWeight: "600" }}>
                    Sube tu reto <span className="text-danger"> (*)</span>
                  </Label>
                  <DropZoneComponent
                    upFiles={getFiles}
                    upFilesRejected={getFilesRejected}
                    files={datosTarea?.files}
                    filesUrl={props.data.urlArchivosEntrega}
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
                  {error.files && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.files}
                    </small>
                  )}
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group className="mb-3">
                  <Label style={{ fontWeight: "600" }}>
                    Comentario de tu entrega
                  </Label>
                  <Form.Control
                    as="textarea"
                    cols={3}
                    name="comentarioEmprendedor"
                    className="form-control"
                    onChange={(e) => onHandleChange(e)}
                  />
                  {error.comentarioEmprendedor && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.comentarioEmprendedor}
                    </small>
                  )}
                </Form.Group>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        {props.tipo == "PENDIENTES" && (
          <button className="btn btn-primary" onClick={onHandleSubmit}>
            Entregar Reto
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
