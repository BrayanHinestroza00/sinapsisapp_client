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
  URL_OBTENER_TIPOS_CONTACTO,
} from "src/utils/apiConstants";
import showIcon from "src/assets/images/showIcon.png";
import { useFetch } from "src/services/hooks/useFetch";
import FlexyTable from "src/components/FlexyTable";
import { validarListadoEmprendedoresAdmin } from "src/utils/validaciones";

function EmprendedoresPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});

  // Custom Hooks
  const {
    data: emprendedoresData,
    message: emprendedoresMessage,
    error: emprendedoresError,
    fetchAPI: fetchApiEmprendedores,
  } = useFetch();

  const {
    data: tiposContactoData,
    message: tiposContactoMessage,
    error: tiposContactoError,
    loading: tiposContactoLoading,
    fetchAPI: fetchApiTiposContacto,
  } = useFetch();

  useEffect(() => {
    fetchApiTiposContacto({
      URL: URL_OBTENER_TIPOS_CONTACTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    let newEmprendedores = [];

    if (emprendedoresData) {
      if (emprendedoresData.length > 0) {
        newEmprendedores = emprendedoresData.map((emprendedorData, index) => {
          return {
            n: index + 1,
            "Numero Documento": emprendedorData.numeroDocumento,
            "Nombre Emprendedor": emprendedorData.nombreCompleto,
            "Tipo Contacto": emprendedorData.tipoContacto,
            "Correo Contacto":
              emprendedorData.correoInstitucional ||
              emprendedorData.correoPersonal,
            "Estado Ruta I&E": emprendedorData.estado,
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
    let erroresFormulario = validarListadoEmprendedoresAdmin(datosFiltro);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      fetchApiEmprendedores({
        URL: URL_OBTENER_EMPRENDEDORES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            ...datosFiltro,
          },
        },
      });
    }
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

  return (
    <>
      <Titulo>Emprendedores Registrados</Titulo>

      <>
        {tiposContactoLoading ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            <p>Cargando...</p>
          </Ruta>
        ) : tiposContactoMessage || tiposContactoError ? (
          <Ruta
            style={{
              padding: "0.5rem 2rem 1rem 2rem",
              marginTop: "1rem",
              marginLeft: "0rem",
            }}
          >
            {tiposContactoError && <SubTitulo>{tiposContactoError}</SubTitulo>}

            {tiposContactoMessage && (
              <SubTitulo>{tiposContactoMessage}</SubTitulo>
            )}
          </Ruta>
        ) : (
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
                  value={datosFiltro.numeroDocumento || ""}
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
                  value={datosFiltro.nombreEmprendedor || ""}
                  onChange={(e) => onHandleChange(e)}
                />
                {error.nombreEmprendedor && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.nombreEmprendedor}
                  </small>
                )}
              </div>
              {/* Estado en la Ruta de Innovacion & Emprendimiento */}
              <div className="col-md-6">
                <Label htmlFor="estadosRuta" className="form-label">
                  Estado en la Ruta de Innovacion & Emprendimiento
                </Label>
                <select
                  id="estadosRuta"
                  className="form-select"
                  name="estadosRuta"
                  value={datosFiltro.estadosRuta || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  <option value={"ACTIVO"}>ACTIVO</option>
                  <option value={"INACTIVO"}>INACTIVO</option>
                </select>
                {error.estadosRuta && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.estadosRuta}
                  </small>
                )}
              </div>

              {/* Tipo contacto */}
              <div className="col-md-6">
                <Label htmlFor="tiposContacto" className="form-label">
                  Tipo de Contacto del Emprendedor:
                </Label>
                <select
                  id="tiposContacto"
                  className="form-select"
                  name="tiposContacto"
                  value={datosFiltro.tiposContacto || "-1"}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={"-1"}>TODAS...</option>
                  {tiposContactoData &&
                    tiposContactoData.length > 0 &&
                    tiposContactoData.map((tipoContacto, index) => {
                      return (
                        <option key={index} value={tipoContacto.id}>
                          {tipoContacto.nombre}
                        </option>
                      );
                    })}
                </select>
                {error.tiposContacto && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.tiposContacto}
                  </small>
                )}
              </div>
              <div>
                <button className="btn btn-primary">Consultar</button>
              </div>
            </form>
          </Card>
        )}
      </>

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
