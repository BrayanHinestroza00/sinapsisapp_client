import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { MentorContext } from "src/services/context/MentorContext";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_POST,
  URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR,
} from "src/utils/apiConstants";
import { getCurrentDate } from "src/utils/functions";

function ReportesConsultoriaPage() {
  const { userData } = useContext(MentorContext);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});

  // Custom Hooks
  const { data, message, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    if (data) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(data);
      console.log(url);
      link.href = url;
      link.download = message;
      link.click();
    }
  }, [data]);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    fetchAPI({
      URL: URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        responseType: "blob",
        data: {
          idMentor: userData.id,
          fechaInicio: datos.fechaInicio,
          fechaFin: datos.fechaFin,
        },
      },
    });

    // let erroresFormulario = validacionesEditarPerfil(datos);
    // if (Object.keys(erroresFormulario).length) {
    //   setError(erroresFormulario);
    // } else {
    //   setError({});
    //   const form = new FormData();

    //   for (let index = 0; index < Object.values(datos).length; index++) {
    //     if (
    //       Object.values(datos)[index] != null ||
    //       Object.values(datos)[index] != undefined
    //     ) {
    //       if (Object.keys(datos)[index] == "fotoPerfil") {
    //         form.append("fotoPerfil", Object.values(datos)[index][0]);
    //       } else {
    //         form.append(Object.keys(datos)[index], Object.values(datos)[index]);
    //       }
    //     }
    //   }

    //   Axios.post(`${HOST}/emprendedor`, form)
    //     .then((res) => {
    //       Swal.fire({
    //         title: "Correcto!",
    //         text: "Perfil actualizado correctamente",
    //         icon: "success",
    //         iconColor: "#9a66a8",
    //         confirmButtonText: "Aceptar",
    //         confirmButtonColor: "#9a66a8",
    //         showConfirmButton: true,
    //       }).then(() => setAllowEdit(!allowEdit));
    //     })
    //     .catch((err) => {
    //       Swal.fire({
    //         title: "Algo ha fallado",
    //         text: err.response.data.message,
    //         icon: "error",
    //         iconColor: "#9a66a8",
    //         confirmButtonText: "Aceptar",
    //         confirmButtonColor: "#9a66a8",
    //         showConfirmButton: true,
    //       });
    //     });
    // }
  };

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  if (errorAPI) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{errorAPI}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Reportes Consultorias</Titulo>

      <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
        <SubTitulo>Filtros</SubTitulo>

        <form onSubmit={onHandleSubmit} className="row g-3">
          {/* Fecha de inicio */}
          <div className="col-md-6">
            <Label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio
            </Label>
            <Input
              type="date"
              className="form-control inputDiag"
              name="fechaInicio"
              id="fechaInicio"
              max={getCurrentDate()}
              value={datos.fechaInicio != null ? datos.fechaInicio : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaInicio && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaInicio}
              </small>
            )}
          </div>

          {/* Fecha de finalización */}
          <div className="col-md-6">
            <Label htmlFor="fechaFin" className="form-label">
              Fecha de Finalización
            </Label>
            <Input
              type="date"
              className="form-control inputDiag"
              name="fechaFin"
              id="fechaFin"
              max={getCurrentDate()}
              value={datos.fechaFin != null ? datos.fechaFin : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaFin && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaFin}
              </small>
            )}
          </div>

          <div>
            <button className="btn btn-primary">Generar Historial</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ReportesConsultoriaPage;
