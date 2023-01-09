import Axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import MentorLayout from "src/layouts/MentorLayout";
import { HOST } from "src/utils/constants";

function ReportesConsultoriaPage() {
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [tiposDocumento, setTiposDocumento] = useState([]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    Axios.get(`${HOST}/app/tipoDocumento`)
      .then(({ data }) => {
        if (data.code == 1) {
          setTiposDocumento(data.response);
        }

        if (data.code == -1) {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MentorLayout sidebar={true}>
      <>
        <Titulo>Reportes Consultorias</Titulo>

        <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
          <SubTitulo>Filtros</SubTitulo>

          <form onSubmit={onHandleSubmit} className="row g-3">
            {/* Tipo de documento */}
            <div className="col-md-6">
              <Label htmlFor="tiposDocumento" className="form-label">
                Tipo de documento
              </Label>
              <select
                id="tiposDocumento"
                className="form-select"
                name="tiposDocumento"
                value={datos.tiposDocumento || "-1"}
                onChange={(e) => onHandleChange(e)}
              >
                <option value={"-1"} disabled>
                  Selecciona...
                </option>
                {tiposDocumento.map((tipoDocumento, index) => {
                  return (
                    <option key={index} value={tipoDocumento.id}>
                      {tipoDocumento.nombre}
                    </option>
                  );
                })}
              </select>
              {error.tiposDocumento && (
                <small className="form-text font-weight-bold text-danger">
                  {error.tiposDocumento}
                </small>
              )}
            </div>

            {/* Numero de documento */}
            <div className="col-md-6">
              <Label htmlFor="numeroDocumento" className="form-label">
                Número de documento
              </Label>
              <Input
                type="text"
                className="form-control inputDiag"
                name="numeroDocumento"
                id="numeroDocumento"
                value={
                  datos.numeroDocumento != null ? datos.numeroDocumento : ""
                }
                onChange={(e) => onHandleChange(e)}
              />
              {error.numeroDocumento && (
                <small className="form-text font-weight-bold text-danger">
                  {error.numeroDocumento}
                </small>
              )}
            </div>

            {/* Nombre emprendedor */}
            <div className="col-md-6">
              <Label htmlFor="nombreEmprendedor" className="form-label">
                Nombre(s) del Emprendedor
              </Label>
              <Input
                type="text"
                className="form-control inputDiag"
                name="nombreEmprendedor"
                id="nombreEmprendedor"
                value={
                  datos.nombreEmprendedor != null ? datos.nombreEmprendedor : ""
                }
                onChange={(e) => onHandleChange(e)}
              />
              {error.nombreEmprendedor && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nombreEmprendedor}
                </small>
              )}
            </div>

            {/* Nombre iniciativa */}
            <div className="col-md-6">
              <Label htmlFor="nombreIniciativa" className="form-label">
                Nombre de la Iniciativa
              </Label>
              <Input
                type="text"
                className="form-control inputDiag"
                name="nombreIniciativa"
                id="nombreIniciativa"
                value={
                  datos.nombreIniciativa != null ? datos.nombreIniciativa : ""
                }
                onChange={(e) => onHandleChange(e)}
              />
              {error.nombreIniciativa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nombreIniciativa}
                </small>
              )}
            </div>

            <div>
              <button className="btn btn-primary">Generar Reporte</button>
            </div>
          </form>
        </Card>
      </>
    </MentorLayout>
  );
}

export default ReportesConsultoriaPage;
