import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

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
import { Label } from "./styled";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";
import { Titulo } from "src/app/Shared/assets/styles/Common";
import { getArchivo } from "src/app/Shared/utils/utilityFunctions";

function RevisarTarea({ show, data, onHide }) {
  const [datosImagen, setDatosImagen] = useState({});
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    obtenerImagen();
  }, []);

  const obtenerImagen = async () => {
    if (data.urlArchivosEntrega) {
      const imagen = await getArchivo(data.urlArchivosEntrega);
      setDatosImagen({
        url: `data:${imagen.contentType};base64,${imagen.file}`,
        filename: imagen.filename,
      });
    }
  };

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
        title: "Tarea calificada exitosamente",
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
        <Form className="container">
          <Titulo className="text-bold">INFORMACIÓN DE TAREA</Titulo>
          <Form.Group className="row mb-3">
            <Label style={{ fontWeight: "600" }}>Descripción</Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.descripcionTarea}
              disabled
            />
          </Form.Group>

          <hr />
          {data.urlArchivosEntrega && datosImagen && (
            <Form.Group className="text-center">
              <Label style={{ fontWeight: "600" }}>
                Tarea entregada por el emprendedor
              </Label>
              <p className="m-2">
                Descarga el archivo y realiza la retroalimentación al
                emprendedor
              </p>
              <a
                rel="noreferrer"
                className="text-center"
                href={datosImagen.url}
                download={datosImagen.filename}
                target="_blank"
              >
                <img
                  src={URL_STATIC_UPLOAD_IMAGES}
                  height="150"
                  alt="Click aquí"
                />
              </a>
              <br />
              <label className="form-label mt-3">
                Da clic
                <a
                  rel="noreferrer"
                  className="text-center m-1"
                  href={datosImagen.url}
                  download={datosImagen.filename}
                  target="_blank"
                >
                  Aquí
                </a>
                o en la imagen para descargar
              </label>
              <br />
            </Form.Group>
          )}

          <hr />
          <Form.Group>
            <Label style={{ fontWeight: "600" }}>Estado de Entrega</Label>
            <div>
              <Table className="table table-bordered table_tarea">
                <tbody>
                  <tr>
                    <td>Estado de la Entrega</td>
                    <td>{data.estadoEntrega}</td>
                  </tr>
                  {/* <tr>
                    <td>Fecha Límite de Entrega</td>
                    <td>
                      {moment(
                        data.fechaLimiteEntrega,
                        "YYYY-MM-DD hh:mm:ss"
                      ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)}
                    </td>
                  </tr> */}
                  <tr>
                    <td>Estado de la Calificación</td>
                    <td>{data.calificacion || "SIN CALIFICAR"}</td>
                  </tr>
                  <tr>
                    <td>Fecha de Entrega</td>
                    <td>
                      {data.fechaEntrega
                        ? moment(
                            data.fechaEntrega,
                            "YYYY-MM-DD hh:mm:ss"
                          ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
                        : "SIN ENTREGAR"}
                    </td>
                  </tr>
                  <tr>
                    <td>Comentarios de la entrega por Emprendedor</td>
                    <td>
                      {data.comentariosEntregaEmprendedor || "SIN COMENTARIOS"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Form.Group>
          <hr />

          <h5 className="text-center">Retroalimentación</h5>
          <Form.Group className="mb-3">
            <Label style={{ fontWeight: "600" }}>
              Calificación de la Entrega{" "}
              <span className="text-danger"> (*)</span>
            </Label>
            <Form.Select
              name="calificacionEntrega"
              type="text"
              value={datosTarea.calificacionEntrega || "-1"}
              onChange={(e) => onHandleChange(e)}
            >
              <option value={"-1"} disabled>
                Seleccione la calificación
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
            <Label style={{ fontWeight: "600" }}>
              Comentarios de la Entrega
            </Label>
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
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button variant="primary" onClick={(e) => onHandleSubmit(e)}>
          Calificar
        </Button>
        <button variant="secondary" onClick={onHide}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarTarea;
