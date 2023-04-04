import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert2";

import { HOST, URL_STATIC_UPLOAD_IMAGES } from "src/utils/apiConstants";

function RevisarTarea(props) {
  const [datos, setDatos] = useState({});
  const [datosTarea, setDatosTarea] = useState({});
  const [error, setError] = useState({});

  // const [loading, data, errorAPI] = useAPI_GET(`${HOST}/Tarea`, {
  //   headers: {
  //     Authorization:
  //       localStorage.getItem("token") || sessionStorage.getItem("token"),
  //   },
  //   params: {
  //     idTarea,
  //   },
  // });

  // useEffect(() => {
  //   if (data) {
  //     const { ArchivoEmprendedor, ...datos } = data[0];
  //     const buffer = Buffer.from(ArchivoEmprendedor).toString();
  //     setDatos({ ArchivoEmprendedor: buffer, ...datos });
  //   }
  // }, [data]);

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
    // Axios.put(
    //   `${HOST}/Mentor/Tarea`,
    //   { idTarea, ...data },
    //   {
    //     headers: {
    //       Authorization:
    //         localStorage.getItem("token") || sessionStorage.getItem("token"),
    //     },
    //   }
    // )
    //   .then((res) => {
    //     if (res.data.affectedRows > 0) {
    //       swal
    //         .fire({
    //           title: "Tarea calificada correctamente",
    //           text: "Se ha calificado correctamente la tarea",
    //           icon: "success",
    //           iconColor: "#9a66a8",
    //           confirmButtonText: "Aceptar",
    //           confirmButtonColor: "#9a66a8",
    //           showConfirmButton: true,
    //         })
    //         .then(() => (window.location.href = window.location.pathname));
    //     }
    //   })
    //   .catch((err) => {
    //     swal.fire({
    //       title: "Calificacion de tarea fallida",
    //       text: err.response.data.message,
    //       icon: "error",
    //       iconColor: "#9a66a8",
    //       confirmButtonText: "Aceptar",
    //       confirmButtonColor: "#9a66a8",
    //       showConfirmButton: true,
    //     });
    //   });
  };

  // if (loading) {
  //   return <div>Cargando</div>;
  // }

  // if (errorAPI) {
  //   swal.fire({
  //     title: errorAPI.response.data.message,
  //     icon: "warning",
  //     confirmButtonText: "Aceptar",
  //     confirmButtonColor: "#9a66a8",
  //     showConfirmButton: true,
  //     showCloseButton: true,
  //   });
  // }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
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
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{ color: "#FFF" }}>{props.data.titulo}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <div>
          <h4 className="text-center">Descripcion de la tarea</h4>
          <p>{props.data.descripcionTarea}</p>
        </div>
        {props.data.urlArchivosEntrega && (
          <>
            <hr />
            <div className="text-center">
              <h4>Tarea entregada por el emprendedor</h4>
              <p>
                Descarga el archivo y realiza la retroalimentacion al
                emprendedor
              </p>
              <a
                rel="noreferrer"
                className="text-center"
                href={`${HOST}/${props.data.urlArchivosEntrega}`}
                target="_blank"
              >
                <img
                  src={URL_STATIC_UPLOAD_IMAGES}
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
                  href={`${HOST}/${props.data.urlArchivosEntrega}`}
                  target="_blank"
                >
                  Aqui
                </a>{" "}
                o en la imagen para descargar
              </label>
              <br />
            </div>
          </>
        )}

        <hr />
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
                  <td>{props.data.calificacion || "SIN CALIFICAR"}</td>
                </tr>
                <tr>
                  <td>Fecha de Entrega</td>
                  <td>{props.data.fechaEntrega || "SIN ENTREGAR"}</td>
                </tr>
                {!props.data.urlArchivosEntrega && (
                  <tr>
                    <td>Archivos Enviados</td>
                    <td>SIN ARCHIVOS ENVIADOS</td>
                  </tr>
                )}

                <tr>
                  <td>Comentarios del Emprendedor</td>
                  <td>
                    {props.data.comentariosEntregaEmprendedor ||
                      "SIN COMENTARIOS"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div>
          <h4 className="text-center">Retroalimentación</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Calificación</label>
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
      </Modal.Body>

      <Modal.Footer className="modalFooter_revisarTarea">
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Calificar
        </button>
        <button className="btn btn-outline-primary" onClick={props.onHide}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RevisarTarea;
