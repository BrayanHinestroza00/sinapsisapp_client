import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FlexyTable from "src/app/Shared/components/FlexyTable";

import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDORES_ASOCIADOS,
} from "src/app/Shared/utils/apiConstants.js";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";
import { validarListadoEmprendedores } from "src/app/Shared/services/validation/validateListadoEmprendedores.js";
import {
  SINAPSIS_APP_ESTADO_ASESORAMIENTO_EN_CURSO,
  SINAPSIS_APP_ESTADO_ASESORAMIENTO_FINALIZADO,
} from "src/app/Shared/utils/constants.js";

import showIcon from "src/app/Shared/assets/images/icons/showIcon.png";
import {
  Card,
  Input,
  Label,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";

function Emprendedores() {
  const { userData } = useContext(MentorContext);

  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({
    estadoAsesoramiento: SINAPSIS_APP_ESTADO_ASESORAMIENTO_EN_CURSO,
  });
  const [datos, setDatos] = useState(null);
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
            "Documento Emprendedor": emprendedorData.numeroDocumento,
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

  const onHandleSearchEmprendedor = (emprendedor) => {
    const data = emprendedoresData[emprendedor.n - 1];

    navigate(`/Mentor/Emprendedor/${data.idEmprendedor}`, {
      replace: true,
      state: data,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let erroresFormulario = validarListadoEmprendedores(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      setLoading(true);
      fetchApiEmprendedores({
        URL: URL_OBTENER_EMPRENDEDORES_ASOCIADOS,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            ...datosFiltro,
            idMentor: userData.id,
          },
        },
      }).then(() => setLoading(false));
    }
  };

  return (
    <>
      <Titulo>Emprendedores</Titulo>

      <Card>
        <Subtitulo>Filtros</Subtitulo>

        <form onSubmit={onHandleSubmit} className="row g-3">
          {/* Numero de documento */}
          <div className="col-md-6">
            <Label htmlFor="numeroDocumento" className="form-label">
              Número de documento
            </Label>
            <Input
              type="text"
              className="form-control"
              name="numeroDocumento"
              id="numeroDocumento"
              value={datosFiltro.numeroDocumento || ""}
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
              className="form-control"
              name="nombreEmprendedor"
              id="nombreEmprendedor"
              value={datosFiltro.nombreEmprendedor || ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.nombreEmprendedor && (
              <small className="form-text font-weight-bold text-danger">
                {error.nombreEmprendedor}
              </small>
            )}
          </div>

          {/* Estado del Asesoramiento */}
          <div className="col-md-6">
            <Label htmlFor="estadoAsesoramiento" className="form-label">
              Estado del Asesoramiento
            </Label>
            <select
              id="estadoAsesoramiento"
              className="form-select"
              name="estadoAsesoramiento"
              value={datosFiltro.estadoAsesoramiento}
              onChange={(e) => onHandleChange(e)}
            >
              <option
                selected
                value={SINAPSIS_APP_ESTADO_ASESORAMIENTO_EN_CURSO}
              >
                EN CURSO
              </option>
              <option value={SINAPSIS_APP_ESTADO_ASESORAMIENTO_FINALIZADO}>
                FINALIZADA
              </option>
            </select>
            {error.estadoAsesoramiento && (
              <small className="form-text font-weight-bold text-danger">
                {error.estadoAsesoramiento}
              </small>
            )}
          </div>

          {/* Nombre Emprendimiento */}
          <div className="col-md-6">
            <Label htmlFor="nombreEmprendimiento" className="form-label">
              Nombre del Emprendimiento
            </Label>
            <Input
              type="text"
              className="form-control"
              name="nombreEmprendimiento"
              id="nombreEmprendimiento"
              value={datosFiltro.nombreEmprendimiento || ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.nombreEmprendimiento && (
              <small className="form-text font-weight-bold text-danger">
                {error.nombreEmprendimiento}
              </small>
            )}
          </div>

          <div>
            <button className="btn btn-primary">Filtrar</button>
          </div>
        </form>
      </Card>

      {loading ? (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          <p>Cargando...</p>
        </Ruta>
      ) : emprendedoresMessage || emprendedoresError ? (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {emprendedoresMessage && (
            <Subtitulo>{emprendedoresMessage}</Subtitulo>
          )}

          {emprendedoresError && <Subtitulo>{emprendedoresError}</Subtitulo>}
        </Ruta>
      ) : (
        emprendedoresData && (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {emprendedoresData.length > 0 ? (
              <>
                <FlexyTable
                  datos={datos}
                  titulo={"Listado de Emprendedores"}
                  btn1={<img src={showIcon} width="auto" height="25" />}
                  fun1={(emprendedorData) => {
                    onHandleSearchEmprendedor(emprendedorData);
                  }}
                  adicional={true}
                />
              </>
            ) : (
              <Subtitulo>No tienes emprendedores asociados</Subtitulo>
            )}
          </Ruta>
        )
      )}
    </>
  );
}

export default Emprendedores;
