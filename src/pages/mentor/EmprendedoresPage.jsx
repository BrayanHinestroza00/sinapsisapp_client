import { useEffect, useState } from "react";
import Axios from "axios";
import ReactFlexyTable from "react-flexy-table";

import { Card } from "src/assets/styles/emprendedor/mentores.style";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import showIcon from "src/assets/images/showIcon.png";
import MentorLayout from "src/layouts/MentorLayout";
import { HOST } from "src/utils/constants";
import { useNavigate } from "react-router-dom";

function EmprendedoresPage() {
  const additionalCols = [
    {
      header: "Actions",
      td: (data) => {
        return (
          <div>
            <img
              src={showIcon}
              width="auto"
              height="25"
              onClick={() => onHandleSearchEmprendedor(data.ID)}
            />{" "}
            {/* <img
              src={editIcon}
              width="auto"
              height="25"
              onClick={() => alert("this is edit for id " + data.ID)}
            />{" "} */}
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [tiposDocumento, setTiposDocumento] = useState([]);

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSearchEmprendedor = (idEmprendedor) => {
    navigate(`/Mentor/Emprendedor/${idEmprendedor}`);
  };

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
        <Titulo>Emprendedores </Titulo>

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
              <button className="btn btn-primary">Filtrar</button>
            </div>
          </form>
        </Card>

        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          <SubTitulo>Listado de Emprendedores</SubTitulo>
          {data.length > 0 ? (
            <ReactFlexyTable
              data={data}
              filteredDataText="Datos filtrados:"
              nextText="Siguiente"
              previousText="Anterior"
              totalDataText="Total datos:"
              rowsText="Número de filas"
              pageText="Página"
              ofText=" de"
              filterable
              sortable={true}
              additionalCols={additionalCols}
            />
          ) : (
            <>No hay datos</>
          )}
        </Ruta>
      </>
    </MentorLayout>
  );
}

const data = [
  {
    ID: "1",
    "Tipo Doc.": "CC",
    "Num Doc.": "1005943951",
    Nombre: "Brayan Hinestroza",
    Correo: "123@gmail.com",
  },
];

export default EmprendedoresPage;
