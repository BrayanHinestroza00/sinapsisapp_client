import moment from "moment";
import { Modal } from "react-bootstrap";

import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/app/Shared/components/DropZone/styled.js";

import downloadIcon from "src/app/Shared/assets/images/icons/download_icon.png";

import { HOST } from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";

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
        <div className="container">
          <div className="row mb-3">
            <h5>Descripción</h5>
            <p>{props.data.descripcionTarea}</p>
          </div>

          {props.data.urlMaterialApoyo && (
            <div className="row mb-3">
              <h5>Recursos del docente</h5>
              <div className="text-center">
                <a
                  href={`${HOST}/${props.data.urlMaterialApoyo}`}
                  target="_blank"
                >
                  <img src={downloadIcon} width="25%" alt="downloadIcon" />
                </a>
              </div>
            </div>
          )}

          {props?.tipo == "historial" && props.data.urlArchivosEntrega && (
            <div className="row mb-3">
              <h5>Recursos entregados por el Emprendedor</h5>
              <div className="text-center">
                <a
                  href={`${HOST}/${props.data.urlArchivosEntrega}`}
                  target="_blank"
                >
                  <img src={downloadIcon} width="25%" alt="downloadIcon" />
                </a>
              </div>
            </div>
          )}

          <div className="row mb-3">
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
                    <td>Fecha Límite de Entrega</td>
                    <td>
                      {props.data.fechaLimiteEntrega
                        ? moment(
                            props.data.fechaLimiteEntrega,
                            "YYYY-MM-DD hh:mm:ss"
                          ).format(SINAPSIS_APP_FORMATO_FECHA_HORA)
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
                    <td>Comentarios de la Entrega de Emprendedor</td>
                    <td>
                      {props.data.comentariosEntregaEmprendedor ||
                        "SIN COMENTARIOS"}
                    </td>
                  </tr>

                  <tr>
                    <td>Comentarios de la Entrega de Usuario</td>
                    <td>
                      {props.data.comentariosEntrega || "SIN COMENTARIOS"}
                    </td>
                  </tr>

                  <tr>
                    <td>Asignada por</td>
                    <td>
                      {`${props.data.nombresCrea} ${props.data.apellidosCrea}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
