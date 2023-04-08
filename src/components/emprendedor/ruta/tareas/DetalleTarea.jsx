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

function DetalleTarea(props) {
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});

  const getFiles = (files) => {
    setDatosTarea({
      ...datosTarea,
      files,
    });
  };

  const handleChangle = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
  };

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

          {props.tipo == "PENDIENTES" && (
            <form encType="multipart/form-data">
              <div>
                <br></br>
                <h6>Sube tu tarea</h6>
                <DropZone upFiles={getFiles} files={props.data?.files} />

                {(props.data.files || props.data.urlMaterialApoyo) && (
                  <aside style={thumbsContainer}>
                    <div style={thumb}>
                      <div style={thumbInner}>
                        <img
                          src={
                            props.data.files
                              ? URL.createObjectURL(props.data?.files[0])
                              : props.data.urlMaterialApoyo
                              ? `${HOST}/${props.data.urlMaterialApoyo}`
                              : ""
                          }
                          style={img}
                          alt={
                            props.data.files
                              ? props.data.files[0].name
                              : props.data.urlMaterialApoyo
                          }
                        />
                      </div>
                    </div>
                  </aside>
                )}
                {error.files && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.files}
                  </small>
                )}
              </div>

              <div>
                <br></br>
                <h5>Comentarios de tu entrega</h5>
                <label>Comentario </label>
                <br />
                <textarea
                  name="comentarioEmprendedor"
                  className="form-control"
                  onChange={(e) => handleChangle(e)}
                />
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        {props.tipo == "PENDIENTES" && (
          <button
            className="btn btn-primary"
            onClick={(e) => {
              Swal.fire({
                title: "¿Estás seguro que deseas enviar la tarea?",
                icon: "question",
                iconColor: "#9a66a8",
                confirmButtonText: "Enviar",
                confirmButtonColor: "#9a66a8",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
              }).then((res) => {
                if (res.isConfirmed) {
                  //handleSubmit(e);
                  window.alert("SUBMITTED");
                }
              });
            }}
          >
            Entregar Tarea
          </button>
        )}

        <button className="btn btn-outline-primary" onClick={props.onHide}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleTarea;
