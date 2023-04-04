import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
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
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_PROYECTOS_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";
import FlexyTable from "src/components/FlexyTable";

function ProyectoEmprendimientosPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: emprendimientoData,
    message: emprendimientosMessage,
    error: emprendimientosError,
    fetchAPI: fetchApiPrimerasAtenciones,
  } = useFetch();

  const {
    data: etapasRutaData,
    message: etapasRutaMessage,
    error: etapasRutaError,
    loading: etapasRutaLoading,
    fetchAPI: fetchApiEtapasRuta,
  } = useFetch();

  useEffect(() => {
    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    let newEmprendimiento = [];

    if (emprendimientoData) {
      if (emprendimientoData.length > 0) {
        newEmprendimiento = emprendimientoData.map((emprendimiento, index) => {
          return {
            n: index + 1,
            "Numero Documento": emprendimiento.documentoEmprendedor,
            "Nombre Emprendedor": `${emprendimiento.nombreEmprendedor}`,
            "Nombre Emprendimiento": emprendimiento.nombreEmprendimiento,
            "Etapa en Ruta": emprendimiento.etapaRuta,
            "Estado en Ruta": emprendimiento.estadoRuta,
            "Correo Contacto": emprendimiento.correoEmprendedor,
          };
        });
      }
    }
    setDatos(newEmprendimiento);
  }, [emprendimientoData]);

  const onHandleChange = (event) => {
    setDatosFiltro({
      ...datosFiltro,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchApiPrimerasAtenciones({
      URL: URL_OBTENER_PROYECTOS_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    }).then(() => setLoading(false));
  };

  const onHandleDetalleSolicitud = (emprendimiento) => {
    const data = {
      ...emprendimientoData[emprendimiento.n - 1],
      type: "EMPRENDIMIENTOS",
    };
    navigate(
      `/Administrador/Emprendimientos/${data.proyectoEmprendimientoId}`,
      {
        replace: true,
        state: data,
      }
    );
  };

  if (loading || !etapasRutaData) {
    return <h1>LOADING ProyectoEmprendimientosPage</h1>;
  }

  if (etapasRutaMessage || emprendimientosMessage) {
    return (
      <>
        <p>{etapasRutaMessage || emprendimientosMessage}</p>
      </>
    );
  }

  if (etapasRutaError || emprendimientosError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{etapasRutaError || emprendimientosError}</p>
      </>
    );
  }

  console.log("data ProyectoEmprendimientosPage", {
    loading,
    etapasRutaLoading,
    etapasRutaData,
    emprendimientoData,
  });

  return (
    <>
      <Titulo>Proyectos de Emprendimiento </Titulo>

      <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
        <SubTitulo>Filtros</SubTitulo>

        <form onSubmit={onHandleSubmit} className="row g-3">
          {/* Etapa en la Ruta de Innovacion & Emprendimiento */}
          <div className="col-md-6">
            <Label htmlFor="etapasRuta" className="form-label">
              Etapa en la Ruta de Innovacion & Emprendimiento
            </Label>
            <select
              id="etapasRuta"
              className="form-select"
              name="etapasRuta"
              value={datosFiltro.etapasRuta || "-1"}
              onChange={(e) => onHandleChange(e)}
            >
              <option value={"-1"}>TODAS...</option>
              {etapasRutaData.map((tipoDocumento, index) => {
                return (
                  <option key={index} value={tipoDocumento.id}>
                    {tipoDocumento.nombre}
                  </option>
                );
              })}
            </select>
            {error.etapasRuta && (
              <small className="form-text font-weight-bold text-danger">
                {error.etapasRuta}
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
                datosFiltro.numeroDocumento != null
                  ? datosFiltro.numeroDocumento
                  : ""
              }
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
                datosFiltro.nombreEmprendedor != null
                  ? datosFiltro.nombreEmprendedor
                  : ""
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
                datosFiltro.apellidoEmprendedor != null
                  ? datosFiltro.apellidoEmprendedor
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

      {emprendimientoData && (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {datos.length > 0 ? (
            <>
              <FlexyTable
                datos={datos}
                titulo={"Proyectos de Emprendimiento"}
                btn1={<img src={showIcon} width="auto" height="25" />}
                fun1={(emprendimientoData) => {
                  onHandleDetalleSolicitud(emprendimientoData);
                }}
                adicional={true}
              />

              {/* <ReactFlexyTable
                data={emprendimientoData}
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
              /> */}
            </>
          ) : (
            <SubTitulo>
              No hay Proyectos de Emprendimiento disponibles
            </SubTitulo>
          )}
        </Ruta>
      )}
    </>
  );
}

export default ProyectoEmprendimientosPage;
