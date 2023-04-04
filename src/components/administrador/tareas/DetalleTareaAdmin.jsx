import Swal from "sweetalert2";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import DropZone from "src/components/DropZone";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import { HOST } from "src/utils/apiConstants";

function DetalleTareaAdmin(props) {
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
          <div>
            <h5>Descripción</h5>
            <p>{props.data.descripcionTarea}</p>
          </div>

          {props.data.urlMaterialApoyo && (
            <div>
              <h5>Recursos del docente</h5>
              <br />
              <div>
                <a
                  className="text-center"
                  href={`${HOST}/${props.data.urlMaterialApoyo}`}
                  target="_blank"
                >
                  <img src={`${HOST}/upload.png`} height="150" alt="" />
                </a>
                <br />
              </div>
            </div>
          )}

          <div>
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
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-outline-primary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleTareaAdmin;
