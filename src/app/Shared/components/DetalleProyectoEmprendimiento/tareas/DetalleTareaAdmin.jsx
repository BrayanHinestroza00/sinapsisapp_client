import moment from "moment";
import { Form, Modal } from "react-bootstrap";

import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/app/Shared/components/DropZone/styled.js";

import downloadIcon from "src/app/Shared/assets/images/icons/download_icon.png";

import { HOST } from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";
import { Label, Table } from "./styled";

function DetalleTareaAdmin(props) {
  console.log(props);
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
          <h5>Información de tarea</h5>
          <Form.Group className="row mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={props.data.descripcionTarea}
              disabled
            />
          </Form.Group>

          {props.data.urlMaterialApoyo && (
            <Form.Group className="row mb-3">
              <Label>Recursos entregados por el docente</Label>
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
            </Form.Group>
          )}

          {props?.tipo == "historial" && props.data.urlArchivosEntrega && (
            <Form.Group className="row mb-3">
              <Label>Recursos entregados por el Emprendedor</Label>
              <br />
              <div className="text-center">
                <a
                  className="text-center"
                  href={`${HOST}/${props.data.urlArchivosEntrega}`}
                  target="_blank"
                >
                  <img src={downloadIcon} width="25%" alt="downloadIcon" />
                </a>
                <br />
              </div>
            </Form.Group>
          )}

          <Form.Group className="row mb-3">
            <Label>Estado de Entrega</Label>
            <div>
              <Table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Estado de la Entrega</td>
                    <td>{props.data.estadoEntrega}</td>
                  </tr>
                  {props.data.estadoEntrega == "PENDIENTE" && (
                    <tr>
                      <td>Fecha Límite de Entrega</td>
                      <td>
                        {moment(
                          props.data.fechaLimiteEntrega,
                          "YYYY-MM-DD hh:mm:ss"
                        ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Estado de la Calificación</td>
                    <td>{props.data.calificacion || "SIN ENTREGAR"}</td>
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
                  {props.tipo != "historial" && (
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
                  )}

                  <tr>
                    <td>Comentarios de la entrega por Emprendedor</td>
                    <td>
                      {props.data.comentariosEntregaEmprendedor ||
                        "SIN COMENTARIOS"}
                    </td>
                  </tr>

                  <tr>
                    <td>Comentarios de la entrega por Docente</td>
                    <td>
                      {props.data.comentariosEntrega || "SIN COMENTARIOS"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Form.Group>
          <div className="row mb-3">
            <h5>Información de docente</h5>
            <br />
            <Form.Group className="mb-3">
              <Label>Docente </Label>
              <Form.Control
                value={`${props.data.nombresCrea} ${props.data.apellidosCrea}`}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Label>Correo Docente </Label>
              <Form.Control
                value={
                  props.data.correoInstitucionalCrea ||
                  props.data.correoPersonalCrea
                }
                disabled
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleTareaAdmin;
