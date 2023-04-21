import { useState } from "react";
import { Modal, Form } from "react-bootstrap";

import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import DropZone from "./DropZone";
import {
  HOST,
  HTTP_METHOD_POST,
  URL_PUBLICAR_ANUNCIO,
} from "src/utils/apiConstants";
import { confirmAlertWithText } from "src/utils/alerts/ConfirmAlert";
import { validarCrearAnuncio } from "src/utils/validaciones";
import { useFetch } from "src/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/utils/alerts/MessageAlert";
import {
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_FORMATO_FECHA_INPUT,
} from "src/utils/constants";
import moment from "moment";

function AnuncioModal(props) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const getFiles = (fileAnuncio) => {
    setDatos({
      ...datos,
      fileAnuncio,
    });
  };

  const onHandleChangle = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let erroresFormulario = validarCrearAnuncio(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas publicar el anuncio?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Publicar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    const form = new FormData();

    for (let index = 0; index < Object.values(datos).length; index++) {
      if (
        Object.values(datos)[index] != null ||
        Object.values(datos)[index] != undefined
      ) {
        if (Object.keys(datos)[index] == "fileAnuncio") {
          console.log("AQUI", Object.values(datos)[index][0]);
          form.append("flyerAnuncio", Object.values(datos)[index][0]);
        } else if (Object.keys(datos)[index] == "fechaHasta") {
          const fechaHasta = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("fechaHasta", fechaHasta);
        } else {
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
        }
      }
    }

    setLoading(true);
    fetchAPI({
      URL: URL_PUBLICAR_ANUNCIO,
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
        title: "Anuncio Publicado Exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          props.onHide();
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
          <h1 style={{ color: "#FFF" }}>Publicación de Nuevo Anuncio</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div className="container">
          <form encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Titulo de Anuncio </Form.Label>
              <Form.Control
                name="tituloAnuncio"
                className="form-control"
                onChange={(e) => onHandleChangle(e)}
              />

              {error.tituloAnuncio && (
                <small className="form-text font-weight-bold text-danger">
                  {error.tituloAnuncio}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción de Anuncio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcionAnuncio"
                className="form-control"
                onChange={(e) => onHandleChangle(e)}
              />

              {error.descripcionAnuncio && (
                <small className="form-text font-weight-bold text-danger">
                  {error.descripcionAnuncio}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                El anuncio sera visible de manera permanente
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  label="PERMANENTE"
                  value={1}
                  name="permanente"
                  type={"radio"}
                  id={`inline-radio-permanente`}
                  checked={datos.permanente == 1}
                  onChange={(e) => onHandleChangle(e)}
                />

                <Form.Check
                  inline
                  label="NO PERMANENTE"
                  value={0}
                  name="permanente"
                  type={"radio"}
                  id={`inline-radio-no-permanente`}
                  checked={datos.permanente == 0}
                  onChange={(e) => onHandleChangle(e)}
                />
              </div>
              {error.permanente && (
                <small className="form-text font-weight-bold text-danger">
                  {error.permanente}
                </small>
              )}
            </Form.Group>

            {datos.permanente == 0 && (
              <Form.Group className="mb-3">
                <Form.Label>
                  Fecha Hasta de Visualización del Anuncio{" "}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fechaHasta"
                  className="form-control"
                  onChange={(e) => onHandleChangle(e)}
                />

                {error.fechaHasta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.fechaHasta}
                  </small>
                )}
              </Form.Group>
            )}

            <div className="mt-4">
              <h6>Flayer del Anuncio</h6>
              <DropZone upFiles={getFiles} files={datos?.fileAnuncio} />

              {(datos.fileAnuncio || datos.urlAnuncio) && (
                <aside style={thumbsContainer}>
                  <div style={thumb}>
                    <div style={thumbInner}>
                      <img
                        src={
                          datos.fileAnuncio
                            ? URL.createObjectURL(datos?.fileAnuncio[0])
                            : datos.urlAnuncio
                            ? `${HOST}/${datos.urlAnuncio}`
                            : ""
                        }
                        style={img}
                        alt={
                          datos.fileAnuncio
                            ? datos.fileAnuncio[0].name
                            : datos.urlAnuncio
                        }
                      />
                    </div>
                  </div>
                </aside>
              )}
              {error.fileAnuncio && (
                <small className="form-text font-weight-bold text-danger">
                  {error.fileAnuncio}
                </small>
              )}
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-primary" onClick={onHandleSubmit}>
          Entregar Tarea
        </button>

        <button className="btn btn-outline-primary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AnuncioModal;
