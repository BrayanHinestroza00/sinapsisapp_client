import { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Form } from "react-bootstrap";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import { HOST } from "src/utils/apiConstants";
import DropZone from "./DropZone";

function AnuncioModal(props) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});

  const getFiles = (files) => {
    setDatos({
      ...datos,
      files,
    });
  };

  const handleChangle = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    Swal.fire({
      title: "¿Estás seguro que deseas publicar el anuncio?",
      icon: "question",
      iconColor: "#9a66a8",
      confirmButtonText: "Publicar",
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
          <h1 style={{ color: "#FFF" }}>Publicacion de Nuevo Anuncio</h1>
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
                onChange={(e) => handleChangle(e)}
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
                onChange={(e) => handleChangle(e)}
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
                  checked={datos.permanente == 0}
                />

                <Form.Check
                  inline
                  label="NO PERMANENTE"
                  value={0}
                  name="permanente"
                  type={"radio"}
                  id={`inline-radio-no-permanente`}
                  checked={datos.permanente == 1}
                />
              </div>
              {error.permanente && (
                <small className="form-text font-weight-bold text-danger">
                  {error.permanente}
                </small>
              )}
            </Form.Group>

            {1 == 1 && (
              <Form.Group className="mb-3">
                <Form.Label>
                  Fecha Hasta de Visualizacion del Anuncio{" "}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fechaHasta"
                  className="form-control"
                  onChange={(e) => handleChangle(e)}
                />

                {error.fechaHasta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.fechaHasta}
                  </small>
                )}
              </Form.Group>
            )}

            <div>
              <br></br>
              <h6>Flayer del Anuncio</h6>
              <DropZone upFiles={getFiles} files={datos?.files} />

              {(datos.files || datos.urlAnuncio) && (
                <aside style={thumbsContainer}>
                  <div style={thumb}>
                    <div style={thumbInner}>
                      <img
                        src={
                          datos.files
                            ? URL.createObjectURL(datos?.files[0])
                            : datos.urlAnuncio
                            ? `${HOST}/${datos.urlAnuncio}`
                            : ""
                        }
                        style={img}
                        alt={
                          datos.files ? datos.files[0].name : datos.urlAnuncio
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
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
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
