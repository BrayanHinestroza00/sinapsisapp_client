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
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDORES,
} from "src/utils/apiConstants";
import showIcon from "src/assets/images/showIcon.png";
import { useFetch } from "src/services/hooks/useFetch";
import FlexyTable from "src/components/FlexyTable";

function EmprendedoresPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: emprendedoresData,
    message: emprendedoresMessage,
    error: emprendedoresError,
    fetchAPI: fetchApiEmprendedores,
  } = useFetch();

  useEffect(() => {
    let newEmprendedores = [];

    if (emprendedoresData) {
      if (emprendedoresData.length > 0) {
        newEmprendedores = emprendedoresData.map((emprendedorData, index) => {
          return {
            n: index + 1,
            "Numero Documento": emprendedorData.numeroDocumento,
            "Nombre Emprendedor": `${emprendedorData.nombres} ${emprendedorData.apellidos}`,
            "Nombre Emprendimiento": emprendedorData.nombreEmprendimiento,
            "Estado Asesoramiento": emprendedorData.estadoAsesoramiento,
            "Correo Contacto":
              emprendedorData.correoInstitucional ||
              emprendedorData.correoPersonal,
          };
        });
      }
    }
    setDatos(newEmprendedores);
  }, [emprendedoresData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchApiEmprendedores({
      URL: URL_OBTENER_EMPRENDEDORES,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          ...datosFiltro,
        },
      },
    }).then(() => setLoading(false));
  };

  const onHandleDetalleEmprendedor = (emprendedor) => {
    const data = {
      ...emprendedoresData[emprendedor.n - 1],
      type: "EMPRENDEDORES",
    };
    navigate(`/Administrador/Emprendedores/${data.id}`, {
      replace: true,
      state: data,
    });
  };

  if (loading) {
    return <h1>LOADING EmprendedoresPage</h1>;
  }

  if (emprendedoresMessage) {
    return (
      <>
        <p>{emprendedoresMessage}</p>
      </>
    );
  }

  if (emprendedoresError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{emprendedoresError}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Emprendedores </Titulo>

      <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
        <SubTitulo>Filtros</SubTitulo>

        <form onSubmit={onHandleSubmit} className="row g-3">
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
              Nombre(s) Apellido(s):
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

          <div>
            <button className="btn btn-primary">Consultar</button>
          </div>
        </form>
      </Card>

      {emprendedoresData && (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {emprendedoresData.length > 0 ? (
            <FlexyTable
              datos={datos}
              titulo={"Emprendedores"}
              btn1={<img src={showIcon} width="auto" height="25" />}
              fun1={(emprendedorData) => {
                onHandleDetalleEmprendedor(emprendedorData);
              }}
              adicional={true}
            />
          ) : (
            <SubTitulo>No hay emprendedores disponibles</SubTitulo>
          )}
        </Ruta>
      )}
    </>
  );
}

export default EmprendedoresPage;
