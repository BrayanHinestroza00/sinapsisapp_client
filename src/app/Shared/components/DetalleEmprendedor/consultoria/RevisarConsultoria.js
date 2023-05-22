import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import { validarRevisionConsultoria } from "src/app/Shared/services/validation/validateConsultoria.js";

function RevisarConsultoria({ data, show, onHide }) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // const [loading, data, error] = useAPI_GET(`${HOST}/Mentor/Consultoria`, {
  //   headers: {
  //     Authorization:
  //       localStorage.getItem("token") || sessionStorage.getItem("token"),
  //   },
  //   params: {
  //     idConsultoria,
  //   },
  // });

  // useEffect(() => {
  //   if (data) {
  //     const resultado = data[0];
  //     if (resultado.estadoConsultoria != "Programada") {
  //       setEstadoConsultoria(true);
  //     }
  //     setDatos(resultado);
  //   }
  // }, [data]);

  // const onHandleSubmit = (e) => {
  //   //Volverla a Pendiente
  //   if (!estadoConsultoria) {
  //     swal
  //       .fire({
  //         title: "¿Estás seguro que deseas iniciar la consultoria?",
  //         icon: "question",
  //         iconColor: "#9a66a8",
  //         confirmButtonText: "Iniciar",
  //         confirmButtonColor: "#9a66a8",
  //         showConfirmButton: true,
  //         showCancelButton: true,
  //         cancelButtonText: "Cancelar",
  //       })
  //       .then((res) => {
  //         if (res.isConfirmed) {
  //           let today = new Date();
  //           var horaInicio = today.getHours() + ":" + today.getMinutes();
  //           const { idConsultoria } = datos;
  //           Axios.put(
  //             `${HOST}/Mentor/Consultoria`,
  //             {
  //               idConsultoria,
  //               estadoConsultoria: "En curso",
  //               horaInicio,
  //             },
  //             {
  //               headers: {
  //                 Authorization:
  //                   localStorage.getItem("token") ||
  //                   sessionStorage.getItem("token"),
  //               },
  //             }
  //           ).then((respuesta) => {
  //             if (respuesta.data.affectedRows > 0) {
  //               swal
  //                 .fire({
  //                   title: "Consultoria iniciada",
  //                   text: "Se ha iniciado correctamente la consultoria",
  //                   icon: "success",
  //                   iconColor: "#9a66a8",
  //                   confirmButtonText: "Aceptar",
  //                   confirmButtonColor: "#9a66a8",
  //                   showConfirmButton: true,
  //                 })
  //                 .then(() => {
  //                   setEstadoConsultoria(true);
  //                   window.location.href = window.location.pathname;
  //                 });
  //             }
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         console.log(err.response);
  //       });
  //   } else {
  //     //Volver a Terminado
  //     swal
  //       .fire({
  //         title: "¿Estás seguro que deseas dar por terminada la consultoria?",
  //         icon: "question",
  //         iconColor: "#9a66a8",
  //         confirmButtonText: "Terminar",
  //         confirmButtonColor: "#9a66a8",
  //         showConfirmButton: true,
  //         showCancelButton: true,
  //         cancelButtonText: "Cancelar",
  //       })
  //       .then((res) => {
  //         if (res.isConfirmed) {
  //           const { idConsultoria } = datos;
  //           let today = new Date();
  //           var horaFin = today.getHours() + ":" + today.getMinutes();
  //           Axios.put(
  //             `${HOST}/Mentor/Consultoria`,
  //             {
  //               idConsultoria,
  //               estadoConsultoria: "Terminada",
  //               comentariosConsultoria,
  //               horaFin,
  //             },
  //             {
  //               headers: {
  //                 Authorization:
  //                   localStorage.getItem("token") ||
  //                   sessionStorage.getItem("token"),
  //               },
  //             }
  //           ).then((respuesta) => {
  //             if (respuesta.data.affectedRows > 0) {
  //               swal
  //                 .fire({
  //                   title: "Consultoria Finalizada",
  //                   text: "Se ha registrado correctamente la consultoria",
  //                   icon: "success",
  //                   iconColor: "#9a66a8",
  //                   confirmButtonText: "Aceptar",
  //                   confirmButtonColor: "#9a66a8",
  //                   showConfirmButton: true,
  //                 })
  //                 .then(() => {
  //                   window.location.href = window.location.pathname;
  //                 });
  //             }
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         console.log(err.response);
  //       });
  //   }
  // };

  // if (loading) {
  //   return <div>Cargando</div>;
  // }

  // if (error) {
  //   swal.fire({
  //     title: error.response.data.message,
  //     icon: "warning",
  //     confirmButtonText: "Aceptar",
  //     confirmButtonColor: "#9a66a8",
  //     showConfirmButton: true,
  //     showCloseButton: true,
  //   });
  // }

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    let erroresFormulario = validarRevisionConsultoria(datos, "A");
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas iniciar/terminar la consultoria?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Iniciar/Terminar Consultoria",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const onHandleSubmitInasistencia = (e) => {
    let erroresFormulario = validarRevisionConsultoria(datos, "I");
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas marcar la inasistencia?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Marcar Inasistencia de Emprendedor",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitFormInasistencia(),
      });
    }
  };

  const submitForm = () => {};
  const submitFormInasistencia = () => {};

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
        closeButton
      >
        <Modal.Title>
          <h1 style={{ color: "#FFF" }}>{data.tituloConsultoria}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Form className="container row">
          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Asunto Consultoria</Form.Label>
            <Form.Control value={data.asuntoConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Tipo Consultoria</Form.Label>
            <Form.Control
              value={data.tipoConsultoria == "E" ? "Especializada" : "Normal"}
              disabled
            />
          </Form.Group>

          {data.tipoConsultoria == "E" && (
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Tematica Consultoria</Form.Label>
              <Form.Control value={data.nombreSubActRuta} disabled />
            </Form.Group>
          )}

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Fecha de Consultoria</Form.Label>
            <Form.Control value={data.fechaConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Inicio</Form.Label>
            <Form.Control value={data.horaInicioConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Hora Finalizacion</Form.Label>
            <Form.Control value={data.horaFinConsultoria} disabled />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Mentor</Form.Label>
            <Form.Control
              value={`${data.nombreMentor} ${data.apellidoMentor}`}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Correo Mentor</Form.Label>
            <Form.Control
              value={data.correoInstitucionalMentor || "Sin correo registrado"}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Comentarios Consultoria</Form.Label>
            <Form.Control
              as="textarea"
              cols={3}
              name="comentariosConsultoria"
              onChange={(e) => onHandleChange(e)}
              value={
                datos.comentariosConsultoria ||
                data.comentariosConsultoria ||
                ""
              }
            />
            {error.comentariosConsultoria && (
              <small className="form-text font-weight-bold text-danger">
                {error.comentariosConsultoria}
              </small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {data.estadoConsultoria === "PROGRAMADA" && (
          <>
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                onHandleSubmit(e);
              }}
            >
              INICIAR CONSULTORIA
            </Button>

            <Button
              className="btn btn-secondary"
              onClick={(e) => {
                onHandleSubmitInasistencia(e);
              }}
            >
              MARCAR INASISTENCIA
            </Button>
          </>
        )}

        {data.estadoConsultoria === "EN CURSO" && (
          <Button
            className="btn btn-primary"
            onClick={(e) => {
              onHandleSubmit(e);
            }}
          >
            Terminar Consultoria
          </Button>
        )}

        <Button className="btn bg-danger" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarConsultoria;
