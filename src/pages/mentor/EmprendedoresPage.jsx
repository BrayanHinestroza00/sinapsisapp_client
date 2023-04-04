import { useContext, useEffect, useState } from "react";

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
import { useNavigate } from "react-router-dom";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDORES_ASOCIADOS,
  URL_OBTENER_TIPOS_DOCUMENTO,
} from "src/utils/apiConstants";
import { MentorContext } from "src/services/context/MentorContext";
import FlexyTable from "src/components/FlexyTable";

function EmprendedoresPage() {
  // const { userData, loadingUserData } = useContext(MentorContext);

  // const additionalCols = [
  //   {
  //     header: "Actions",
  //     td: (data) => {
  //       return (
  //         <div>
  //           <img
  //             src={showIcon}
  //             width="auto"
  //             height="25"
  //             onClick={() => onHandleSearchEmprendedor(data.ID)}
  //           />{" "}
  //           {/* <img
  //             src={editIcon}
  //             width="auto"
  //             height="25"
  //             onClick={() => alert("this is edit for id " + data.ID)}
  //           />{" "} */}
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [datosFiltro, setDatosFiltro] = useState({});
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: emprendedoresData,
    message: emprendedoresMessage,
    error: emprendedoresError,
    loading: emprendedoresLoading,
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

  const onHandleSearchEmprendedor = (emprendedor) => {
    navigate(
      `/Mentor/Emprendedor/${
        emprendedoresData[emprendedor.n - 1].idEmprendedor
      }`,
      {
        replace: true,
        state: emprendedoresData[emprendedor.n - 1],
      }
    );
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchApiEmprendedores({
      URL: URL_OBTENER_EMPRENDEDORES_ASOCIADOS,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          ...datosFiltro,
          idMentor: 2,
        },
      },
    }).then(() => setLoading(false));
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
      <Titulo>Emprendedores</Titulo>

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

          {/* Estado del Asesoramiento */}
          <div className="col-md-6">
            <Label htmlFor="estadoAsesoramiento" className="form-label">
              Estado del Asesoramiento
            </Label>
            <select
              id="estadoAsesoramiento"
              className="form-select"
              name="estadoAsesoramiento"
              value={datosFiltro.estadoAsesoramiento || "-1"}
              onChange={(e) => onHandleChange(e)}
            >
              <option selected value={"EN CURSO"}>
                EN CURSO
              </option>
              <option value={"FINALIZADA"}>FINALIZADA</option>
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
              className="form-control inputDiag"
              name="nombreEmprendimiento"
              id="nombreEmprendimiento"
              value={
                datosFiltro.nombreEmprendimiento != null
                  ? datosFiltro.nombreEmprendimiento
                  : ""
              }
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

      {emprendedoresData && (
        <Ruta
          style={{
            padding: "0.5rem 2rem 1rem 2rem",
            marginTop: "1rem",
            marginLeft: "0rem",
          }}
        >
          {emprendedoresData.length > 0 ? (
            <>
              <SubTitulo>Listado de Emprendedores</SubTitulo>
              <FlexyTable
                datos={datos}
                titulo={"Listado de Emprendedores"}
                btn1={<img src={showIcon} width="auto" height="25" />}
                fun1={(emprendedorData) => {
                  onHandleSearchEmprendedor(emprendedorData);
                }}
                adicional={true}
              />

              {/* <ReactFlexyTable
                data={emprendedoresData}
                filteredDataText="Datos filtrados:"
                nextText="Siguiente"
                previousText="Anterior"
                totalDataText="Total datosFiltro:"
                rowsText="Número de filas"
                pageText="Página"
                ofText=" de"
                filterable
                sortable={true}
                additionalCols={additionalCols}
              /> */}
            </>
          ) : (
            <SubTitulo>No tienes emprendedores asociados</SubTitulo>
          )}
        </Ruta>
      )}
    </>
  );
}

export default EmprendedoresPage;
