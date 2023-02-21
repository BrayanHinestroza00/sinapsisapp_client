import ReactFlexyTable from "react-flexy-table";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import AdministradorLayout from "src/layouts/AdministradorLayout";
import { HOST } from "src/utils/constants";
import showIcon from "src/assets/images/showIcon.png";

function MentoresPage() {
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
              onClick={() => onHandleDetalleMentor(data.ID)}
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

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const onHandleDetalleMentor = (idMentor) => {
    navigate(`/Administrador/Mentores/${idMentor}`);
  };

  return (
    // <AdministradorLayout sidebar={true}>
    <>
      <Titulo>Mentores </Titulo>

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
              value={datos.numeroDocumento != null ? datos.numeroDocumento : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.numeroDocumento && (
              <small className="form-text font-weight-bold text-danger">
                {error.numeroDocumento}
              </small>
            )}
          </div>

          {/* Nombre(s) emprendedor */}
          <div className="col-md-6">
            <Label htmlFor="nombreEmprendedor" className="form-label">
              Nombre(s):
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

          {/* Apellido(s) emprendedor */}
          <div className="col-md-6">
            <Label htmlFor="apellidoEmprendedor" className="form-label">
              Apellido(s):
            </Label>
            <Input
              type="text"
              className="form-control inputDiag"
              name="apellidoEmprendedor"
              id="apellidoEmprendedor"
              value={
                datos.apellidoEmprendedor != null
                  ? datos.apellidoEmprendedor
                  : ""
              }
              onChange={(e) => onHandleChange(e)}
            />
            {error.apellidoEmprendedor && (
              <small className="form-text font-weight-bold text-danger">
                {error.apellidoEmprendedor}
              </small>
            )}
          </div>

          <div>
            <button className="btn btn-primary">Consultar</button>
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
        <SubTitulo>Listado de Mentores</SubTitulo>
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
    // {/* </AdministradorLayout> */}
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

export default MentoresPage;
