import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Axios from "axios";
import swal from "sweetalert2";

import { HOST } from "src/utils/apiConstants";
import DropZone from "src/components/DropZone";
import { Boton } from "src/assets/styles/emprendedor/primeraAtencion.style";

// import "../../../styles/crearTarea.css";

function CrearTarea({ show, setShow }) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});

  const validaciones = (valores) => {
    const errors = {};
    const { files, descripcionTarea, fechaEntrega, nombreTarea } = valores;
    if (!nombreTarea) {
      errors.nombreTarea = "Campo Obligatorio";
    }
    if (!descripcionTarea) {
      errors.descripcionTarea = "Campo Obligatorio";
    }
    if (!fechaEntrega) {
      errors.fechaEntrega = "Campo Obligatorio";
    }
    if (!files) {
      errors.files = "Campo Obligatorio";
    } else {
      if (files.length > 1) {
        errors.files = "Solo se permite subir 1 archivo";
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const getFiles = (files) => {
    setDatos({
      ...datos,
      files,
    });
  };

  const handleSubmmit = (e) => {
    let erroresFormulario = validaciones(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      enviarDatos(datos);
    }
  };

  const enviarDatos = (data) => {
    const { files, descripcionTarea, fechaEntrega, nombreTarea } = data;
    const cedulaEmprendedor = window.location.pathname.split("/")[3];
    const form = new FormData();
    form.append("nombreTarea", nombreTarea);
    form.append("descripcionTarea", descripcionTarea);
    form.append("fechaEntrega", fechaEntrega);
    form.append("cedulaEmprendedor", cedulaEmprendedor);
    form.append("files", files[0]);

    Axios.post(`${HOST}/Mentor/CrearTarea`, form, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.affectedRows > 0) {
          swal
            .fire({
              title: "Tarea enviada correctamente",
              text: "Se ha asignado correctamente la tarea al emprendedor",
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
          title: "Creacion de tarea fallida",
          text: err.response.data.message,
          icon: "error",
          iconColor: "#9a66a8",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
        });
      });
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader className="modalHeader_crearTarea">
        <ModalTitle>Crear tarea</ModalTitle>
      </ModalHeader>
      <ModalBody className="modalBody_crearTarea">
        <form encType="multipart/form-data">
          <div>
            <label className="form-label">Nombre de Tarea</label>
            <br />
            <input
              name="nombreTarea"
              className="form-control"
              placeholder="Nombre tarea"
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
              value={datos.nombreTarea}
            />
            {error.nombreTarea && (
              <small className="form-text font-weight-bold text-danger">
                {error.nombreTarea}
              </small>
            )}
          </div>
          <br></br>
          <div>
            <label className="form-label">Descripcion de la Tarea</label>
            <br />
            <textarea
              name="descripcionTarea"
              className="form-control"
              placeholder="Descripción"
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
              value={datos.descripcionTarea}
            />
            {error.descripcionTarea && (
              <small className="form-text font-weight-bold text-danger">
                {error.descripcionTarea}
              </small>
            )}
          </div>

          <div>
            <br></br>
            <label className="form-label">Fecha de entrega</label>
            <br />
            <input
              name="fechaEntrega"
              className="form-control"
              placeholder="Fecha de entrega"
              type="datetime-local"
              onChange={(e) => {
                handleChange(e);
              }}
              value={datos.fechaEntrega}
            />
            {error.fechaEntrega && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaEntrega}
              </small>
            )}
          </div>
          <div>
            <br></br>
            <label className="form-label">Adjunta tus archivos</label>
            <DropZone upFiles={getFiles} />
            {error.files && (
              <small className="form-text font-weight-bold text-danger">
                {error.files}
              </small>
            )}
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="modalFooter_crearTarea">
        <Boton className=" btn btn-secondary" onClick={setShow}>
          Cancelar
        </Boton>

        <Boton
          className="btn btn-primary"
          onClick={(e) => {
            handleSubmmit(e);
          }}
        >
          Crear
        </Boton>
      </ModalFooter>
    </Modal>
  );
}

export default CrearTarea;
