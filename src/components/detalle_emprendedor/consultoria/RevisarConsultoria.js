import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Axios from "axios";
import swal from "sweetalert2";

import { useAPI_GET } from "src/services/hooks/useAPI";
import { HOST } from "src/utils/apiConstants";

// import "../../../styles/RevisarConsultoria.css";

function RevisarConsultoria({ idConsultoria, show, setShow }) {
  const [datos, setDatos] = useState({});
  const [comentariosConsultoria, setComentarioConsultoria] = useState("");
  const [estadoConsultoria, setEstadoConsultoria] = useState(false); //False == Programada True == Pendiente

  const [loading, data, error] = useAPI_GET(`${HOST}/Mentor/Consultoria`, {
    headers: {
      Authorization:
        localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
    params: {
      idConsultoria,
    },
  });

  useEffect(() => {
    if (data) {
      const resultado = data[0];
      if (resultado.estadoConsultoria != "Programada") {
        setEstadoConsultoria(true);
      }
      setDatos(resultado);
    }
  }, [data]);

  const handleSubmit = (e) => {
    //Volverla a Pendiente
    if (!estadoConsultoria) {
      swal
        .fire({
          title: "¿Estás seguro que deseas iniciar la consultoria?",
          icon: "question",
          iconColor: "#9a66a8",
          confirmButtonText: "Iniciar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        })
        .then((res) => {
          if (res.isConfirmed) {
            let today = new Date();
            var horaInicio = today.getHours() + ":" + today.getMinutes();
            const { idConsultoria } = datos;
            Axios.put(
              `${HOST}/Mentor/Consultoria`,
              {
                idConsultoria,
                estadoConsultoria: "En curso",
                horaInicio,
              },
              {
                headers: {
                  Authorization:
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token"),
                },
              }
            ).then((respuesta) => {
              console.log(respuesta);
              if (respuesta.data.affectedRows > 0) {
                swal
                  .fire({
                    title: "Consultoria iniciada",
                    text: "Se ha iniciado correctamente la consultoria",
                    icon: "success",
                    iconColor: "#9a66a8",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#9a66a8",
                    showConfirmButton: true,
                  })
                  .then(() => {
                    setEstadoConsultoria(true);
                    window.location.href = window.location.pathname;
                  });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    } else {
      //Volver a Terminado
      swal
        .fire({
          title: "¿Estás seguro que deseas dar por terminada la consultoria?",
          icon: "question",
          iconColor: "#9a66a8",
          confirmButtonText: "Terminar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        })
        .then((res) => {
          if (res.isConfirmed) {
            const { idConsultoria } = datos;
            let today = new Date();
            var horaFin = today.getHours() + ":" + today.getMinutes();
            Axios.put(
              `${HOST}/Mentor/Consultoria`,
              {
                idConsultoria,
                estadoConsultoria: "Terminada",
                comentariosConsultoria,
                horaFin,
              },
              {
                headers: {
                  Authorization:
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token"),
                },
              }
            ).then((respuesta) => {
              if (respuesta.data.affectedRows > 0) {
                swal
                  .fire({
                    title: "Consultoria Finalizada",
                    text: "Se ha registrado correctamente la consultoria",
                    icon: "success",
                    iconColor: "#9a66a8",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#9a66a8",
                    showConfirmButton: true,
                  })
                  .then(() => {
                    window.location.href = window.location.pathname;
                  });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    }
  };

  if (loading) {
    return <div>Cargando</div>;
  }

  if (error) {
    swal.fire({
      title: error.response.data.message,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#9a66a8",
      showConfirmButton: true,
      showCloseButton: true,
    });
  }

  return (
    <Modal show={show}>
      <ModalHeader className="modalHeader_revisarConsultoria">
        <ModalTitle>{datos.tituloConsultoria}</ModalTitle>
      </ModalHeader>
      <ModalBody className="modalBody_revisarConsultoria">
        <form encType="multipart/form-data">
          <div className="row">
            <label className="form-label">Asunto de consultoria</label>
            <br />
            <input
              type="text"
              className="form-control"
              value={datos.asuntoConsultoria}
              disabled
            />
          </div>
          <br></br>

          <div className="row">
            <label className="form-label">Fecha de consultoria</label>
            <br />
            <input
              type="text"
              className="form-control"
              value={datos.fechaConsultoria}
              disabled
            />
          </div>
          <br></br>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Hora de inicio</label>
              <br />
              <input
                type="time"
                className="form-control"
                disabled
                value={datos.horaInicioProgramada}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Hora de fin</label>
              <br />
              <input
                type="time"
                className="form-control"
                disabled
                value={datos.horaFinProgramada}
              />
            </div>
          </div>
          <br></br>

          {estadoConsultoria ? (
            <div className="row">
              <label className="form-label">
                Comentarios de consultoria
                <span> (Opcional)</span>
              </label>
              <br />
              <textarea
                name="comentarioConsultoria"
                className="form-control"
                placeholder="Comentarios"
                type="text"
                onChange={(e) => setComentarioConsultoria(e.target.value)}
              ></textarea>
            </div>
          ) : (
            <></>
          )}
        </form>
      </ModalBody>
      <ModalFooter className="modalFooter_revisarConsultoria">
        <button
          className="btn btn_revisarConsultoria"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {estadoConsultoria ? "Terminar" : "Iniciar"}
        </button>

        <button className="btn btn_revisarConsultoriaOutline" onClick={setShow}>
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default RevisarConsultoria;
