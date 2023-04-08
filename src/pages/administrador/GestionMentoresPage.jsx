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
import {
  HOST,
  HTTP_METHOD_GET,
  URL_OBTENER_MENTORES,
} from "src/utils/apiConstants";
import showIcon from "src/assets/images/showIcon.png";
import editIcon from "src/assets/images/editIcon.png";
import { useFetch } from "src/services/hooks/useFetch";
import FlexyTable from "src/components/FlexyTable";

function GestionMentoresPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [loading, setLoading] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState([]);

  // Custom Hooks
  const {
    data: mentoresData,
    message: mentoresMessage,
    error: mentoresError,
    fetchAPI: fetchApiMentores,
  } = useFetch();

  useEffect(() => {
    let newMentores = [];

    if (mentoresData) {
      if (mentoresData.length > 0) {
        newMentores = mentoresData.map((mentorData, index) => {
          return {
            n: index + 1,
            "Numero Documento": mentorData.usuario.numeroDocumento,
            "Nombre Mentor": `${mentorData.usuario.nombres} ${mentorData.usuario.apellidos}`,
            Cargo: mentorData.cargo,
            "Dependencia/Facultad":
              mentorData.dependencia || mentorData.facultad,
            "Correo Contacto":
              mentorData.usuario.correoInstitucional ||
              mentorData.usuario.correoPersonal,
          };
        });
      }
    }

    setDatos(newMentores);
  }, [mentoresData]);

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
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchApiMentores({
      URL: URL_OBTENER_MENTORES,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          ...datosFiltro,
        },
      },
    }).then(() => setLoading(false));
  };

  const onHandleDetalleMentor = (mentor) => {
    // Show Modal with the info
    const data = mentoresData[mentor.n - 1];
  };

  if (loading) {
    return <h1>LOADING MentoresPage</h1>;
  }

  if (mentoresMessage) {
    return (
      <>
        <p>{mentoresMessage}</p>
      </>
    );
  }

  if (mentoresError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{mentoresError}</p>
      </>
    );
  }

  return (
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

      {mentoresData && (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {datos.length > 0 ? (
            <FlexyTable
              datos={datos}
              titulo={"Mentores"}
              btn1={<img src={showIcon} width="auto" height="25" />}
              fun1={(mentorData) => {
                onHandleDetalleMentor(mentorData);
              }}
              btn2={<img src={editIcon} width="auto" height="25" />}
              fun2={(mentorData) => {
                onHandleDetalleMentor(mentorData);
              }}
              adicional={true}
            />
          ) : (
            <SubTitulo>No hay mentores disponibles</SubTitulo>
          )}
        </Ruta>
      )}
    </>
  );
}

export default GestionMentoresPage;
