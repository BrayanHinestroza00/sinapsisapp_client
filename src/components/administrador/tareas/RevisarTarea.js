import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { useAPI_GET } from "src/services/hooks/useAPI";
import Axios from "axios";
import swal from "sweetalert2";
import { HOST } from "src/utils/constants";

// import "../../../styles/revisarTarea.css";

function RevisarTarea({ idTarea, show, setShow }) {
  const [datos, setDatos] = useState({});
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});

  const [loading, data, errorAPI] = useAPI_GET(`${HOST}/Tarea`, {
    headers: {
      Authorization:
        localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
    params: {
      idTarea,
    },
  });

  useEffect(() => {
    if (data) {
      const { ArchivoEmprendedor, ...datos } = data[0];
      const buffer = Buffer.from(ArchivoEmprendedor).toString();
      setDatos({ ArchivoEmprendedor: buffer, ...datos });
    }
  }, [data]);

  const handleChange = (e) => {
    setDatosTarea({
      ...datosTarea,
      [e.target.name]: e.target.value,
    });
  };

  const validaciones = (valores) => {
    const errors = {};
    const { ComentarioMentor, Calificacion } = valores;

    if (!ComentarioMentor) {
      errors.ComentarioMentor = "Campo Obligatorio";
    }
    if (!Calificacion) {
      errors.Calificacion = "Campo Obligatorio";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    let erroresFormulario = validaciones(datosTarea);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      enviarDatos(datosTarea);
    }
  };

  const enviarDatos = (data) => {
    Axios.put(
      `${HOST}/Mentor/Tarea`,
      { idTarea, ...data },
      {
        headers: {
          Authorization:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (res.data.affectedRows > 0) {
          swal
            .fire({
              title: "Tarea calificada correctamente",
              text: "Se ha calificado correctamente la tarea",
              icon: "success",
              iconColor: "#9a66a8",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#9a66a8",
              showConfirmButton: true,
            })
            .then(() => (window.location.href = window.location.pathname));
        }
      })
      .catch((err) => {
        swal.fire({
          title: "Calificacion de tarea fallida",
          text: err.response.data.message,
          icon: "error",
          iconColor: "#9a66a8",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
        });
      });
  };

  if (loading) {
    return <div>Cargando</div>;
  }

  if (errorAPI) {
    swal.fire({
      title: errorAPI.response.data.message,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#9a66a8",
      showConfirmButton: true,
      showCloseButton: true,
    });
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader className="modalHeader_revisarTarea">
        <ModalTitle>{datos.nombreTarea}</ModalTitle>
      </ModalHeader>

      <ModalBody className="modalBody_revisarTarea">
        <div>
          <h4 className="text-center">Descripcion de la tarea</h4>
          <p>{datos.descripcionTarea}</p>
        </div>
        <hr />
        <div className="text-center">
          <h4>Tarea entregada por el emprendedor</h4>
          <p>
            Descarga el archivo y realiza la retroalimentacion al emprendedor
          </p>
          <a
            rel="noreferrer"
            className="text-center"
            href={`${HOST}/${datos.ArchivoEmprendedor}`}
            target="_blank"
          >
            <img
              src="http://localhost:5000/upload.png"
              height="150"
              alt="Click aqui"
            />
          </a>
          <br />
          <label className="form-label mt-3">
            Da click{" "}
            <a
              rel="noreferrer"
              className="text-center"
              href={`${HOST}/${datos.ArchivoEmprendedor}`}
              target="_blank"
            >
              Aqui
            </a>{" "}
            o en la imagen para descargar
          </label>
          <br />
        </div>
        <hr />
        <div>
          <h4 className="text-center">Retroalimentacion</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Calificacion</label>
              <select
                name="Calificacion"
                className="form-select form-control"
                type="text"
                onChange={(e) => handleChange(e)}
              >
                <option disabled selected>
                  Calificacion de tarea
                </option>
                <option value="Aprobada">Aprobada</option>
                <option value="Reprobada">Reprobada</option>
              </select>
              {error.Calificacion && (
                <small className="form-text font-weight-bold text-danger">
                  {error.Calificacion}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Comentario</label>
              <br />
              <textarea
                name="ComentarioMentor"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              {error.ComentarioMentor && (
                <small className="form-text font-weight-bold text-danger">
                  {error.ComentarioMentor}
                </small>
              )}
            </div>
          </form>
        </div>
      </ModalBody>

      <ModalFooter className="modalFooter_revisarTarea">
        <button
          className="btn btn_revisarTarea"
          onClick={(e) => handleSubmit(e)}
        >
          Calificar
        </button>
        <button className="btn btn_revisarTareaOutline" onClick={setShow}>
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default RevisarTarea;
