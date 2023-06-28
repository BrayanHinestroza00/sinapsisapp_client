import { useEffect, useState } from "react";

import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import BarChart from "../components/Reportes/ChartJS/BarChart";
import LineChart from "../components/Reportes/ChartJS/LineChart";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { Card, Subtitulo } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import {
  HTTP_METHOD_GET,
  URL_REPORTES_GESTION,
} from "src/app/Shared/utils/apiConstants";
import { removeDuplicatesItems } from "src/app/Shared/utils/utilityFunctions";

function IndicadoresGestionPage() {
  const [loading, setLoading] = useState(true);

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_REPORTES_GESTION,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
    setLoading(false);
  }, []);

  const consultoriasNormalesXTipo = () => {
    const meses = removeDuplicatesItems(
      dataAPI.nroConsultoriasXTipoXMes.map((data) => data.id.mesConsultoria)
    );

    const consultoriasNormales = removeDuplicatesItems(
      dataAPI.nroConsultoriasXTipoXMes.filter((data) => {
        if (data.id.tipoConsultoria == "NORMAL") {
          return data;
        }
      })
    );

    let array = [];
    let count = 0;

    meses.forEach((mes) => {
      for (let i = 0; i < consultoriasNormales.length; i++) {
        const data = consultoriasNormales[i];

        if (data.id.mesConsultoria == mes) {
          array[count] = data.nroConsultorias;
          break;
        }
      }

      if (!array[count]) {
        array[count] = 0;
      }

      count++;
    });

    return array;
  };

  const consultoriasEspecializadasXTipo = () => {
    const meses = removeDuplicatesItems(
      dataAPI.nroConsultoriasXTipoXMes.map((data) => data.id.mesConsultoria)
    );

    const consultoriasEspecializadas = dataAPI.nroConsultoriasXTipoXMes.filter(
      (data) => {
        if (data.id.tipoConsultoria == "ESPECIALIZADA") {
          return data;
        }
      }
    );

    let array = [];
    let count = 0;
    meses.forEach((mes) => {
      for (let i = 0; i < consultoriasEspecializadas.length; i++) {
        const data = consultoriasEspecializadas[i];

        if (data.id.mesConsultoria == mes) {
          array[count] = data.nroConsultorias;
          break;
        }
      }

      if (!array[count]) {
        array[count] = 0;
      }

      count++;
    });

    return array;
  };

  const consultoriasXEstadoProgramadaXMes = () => {
    const meses = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.map((data) => data.id.mesConsultoria)
    );

    const consultoriasProgramadas = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.filter((data) => {
        if (data.id.estadoConsultoria == "PROGRAMADA") {
          return data;
        }
      })
    );

    let array = [];
    let count = 0;

    meses.forEach((mes) => {
      for (let i = 0; i < consultoriasProgramadas.length; i++) {
        const data = consultoriasProgramadas[i];

        if (data.id.mesConsultoria == mes) {
          array[count] = data.nroConsultorias;
          break;
        }
      }

      if (!array[count]) {
        array[count] = 0;
      }

      count++;
    });

    return array;
  };

  const consultoriasXEstadoTerminadaXMes = () => {
    const meses = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.map((data) => data.id.mesConsultoria)
    );

    const consultoriasTerminadas = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.filter((data) => {
        if (data.id.estadoConsultoria == "TERMINADA") {
          return data;
        }
      })
    );

    let array = [];
    let count = 0;

    meses.forEach((mes) => {
      for (let i = 0; i < consultoriasTerminadas.length; i++) {
        const data = consultoriasTerminadas[i];

        if (data.id.mesConsultoria == mes) {
          array[count] = data.nroConsultorias;
          break;
        }
      }

      if (!array[count]) {
        array[count] = 0;
      }

      count++;
    });

    return array;
  };

  const consultoriasXEstadoNoAsistidaXMes = () => {
    const meses = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.map((data) => data.id.mesConsultoria)
    );

    const consultoriasNoAsistidas = removeDuplicatesItems(
      dataAPI.estadoConsultoriaXMes.filter((data) => {
        if (data.id.estadoConsultoria == "NO ASISTIDA") {
          return data;
        }
      })
    );

    let array = [];
    let count = 0;

    meses.forEach((mes) => {
      for (let i = 0; i < consultoriasNoAsistidas.length; i++) {
        const data = consultoriasNoAsistidas[i];

        if (data.id.mesConsultoria == mes) {
          array[count] = data.nroConsultorias;
          break;
        }
      }

      if (!array[count]) {
        array[count] = 0;
      }

      count++;
    });

    return array;
  };

  if (!loading && errorAPI) {
    messageAlert({
      title: "Algo ha fallado",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (!loading && messageAPI) {
    messageAlertWithoutText({
      title: messageAPI,
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
  }

  if (loading || !dataAPI) {
    return (
      <Card>
        <Titulo>Reporte con Indicadores de Gestión</Titulo>
        <LoadingSpinner width="15rem" height="15rem" />;
      </Card>
    );
  } else {
    return (
      <Card>
        <Titulo>Reporte con Indicadores de Gestión</Titulo>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Subtitulo>De emprendedores en ruta I&E</Subtitulo>
            </div>

            <>
              <div className="col-md-12">
                <Card className="d-flex">
                  <div className="p-3 w-50">
                    <h3>Número de emprendedores registrados: </h3>
                    <p>
                      {dataAPI.nroEmprendedores.nroEmprendedoresCompleto}{" "}
                      Emprendedores
                    </p>
                  </div>
                  <div className="p-3 w-50">
                    <h3>Número de emprendedores en ruta de I&E: </h3>
                    <p>
                      {dataAPI.nroEmprendedores.nroEmprendedores} Emprendedores
                    </p>
                  </div>
                </Card>
              </div>

              <div className="col-md-12 mb-3 d-flex">
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de emprendedores en ruta de I&E por programa académico"
                    }
                    labels={dataAPI.nroEmprendedoresRutaXPrograma.map(
                      (data) => data.programaAcademico
                    )}
                    data={dataAPI.nroEmprendedoresRutaXPrograma.map(
                      (data) => data.nroEmprendedores
                    )}
                    dataLabel={"Número de emprendedores"}
                  />
                </div>
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de emprendedores en ruta de I&E por facultad"
                    }
                    labels={dataAPI.nroEmprendedoresRutaXFacultad.map(
                      (data) => data.facultad
                    )}
                    data={dataAPI.nroEmprendedoresRutaXFacultad.map(
                      (data) => data.nroEmprendedores
                    )}
                    dataLabel={"Número de emprendedores"}
                  />
                </div>
              </div>

              <div className="col-md-12 mb-3 d-flex">
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de emprendedores por municipio de residencia"
                    }
                    labels={dataAPI.nroEmprendedoresXMunicipio.map(
                      (data) => data.municipio
                    )}
                    data={dataAPI.nroEmprendedoresXMunicipio.map(
                      (data) => data.nroEmprendedores
                    )}
                    dataLabel={"Número de emprendedores"}
                  />
                </div>
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de estudiantes que optaron por modalidad de emprendimiento como proyecto de grado"
                    }
                    labels={dataAPI.nroEmprendedoresXModalidad.map(
                      (data) => data.modTrabajoGrado
                    )}
                    data={dataAPI.nroEmprendedoresXModalidad.map(
                      (data) => data.nroEmprendedores
                    )}
                    dataLabel={"Número de estudiantes"}
                  />
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <BarChart
                  titulo={
                    "Número de proyectos de emprendimiento por emprendedor"
                  }
                  labels={dataAPI.nroProyectosXEmprendedor.map(
                    (data) => data.emprendedor
                  )}
                  data={dataAPI.nroProyectosXEmprendedor.map(
                    (data) => data.nroEmprendimientos
                  )}
                  dataLabel={"Número de proyectos de emprendimiento"}
                />
              </div>
            </>

            <div className="col-md-12">
              <Subtitulo>De proyectos de emprendimiento en ruta I&E</Subtitulo>
            </div>

            <div className="col-md-12 mb-3">
              <Card className="d-flex">
                <div className="p-3 w-50">
                  <h3>Número de proyectos de emprendimiento registrados: </h3>
                  <p>
                    {
                      dataAPI.nroProyectosEmprendimiento
                        .nroProyectosEmprendimientoCompleto
                    }
                    Proyectos de emprendimiento
                  </p>
                </div>
                <div className="p-3 w-50">
                  <h3>Número de proyectos de emprendimiento en ruta I&E: </h3>
                  <p>
                    {
                      dataAPI.nroProyectosEmprendimiento
                        .nroProyectosEmprendimiento
                    }
                    Proyectos de emprendimiento
                  </p>
                </div>
              </Card>
            </div>

            <>
              <div className="col-md-12 mb-3 d-flex">
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de proyectos de emprendimiento en ruta de I&E por programa académico"
                    }
                    labels={dataAPI.nroProyectosEmprendimientoXPrograma.map(
                      (data) => data.programaAcademico
                    )}
                    data={dataAPI.nroProyectosEmprendimientoXPrograma.map(
                      (data) => data.nroProyectosEmprendimiento
                    )}
                    dataLabel={"Número de proyectos de emprendimiento"}
                  />
                </div>
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de proyectos de emprendimiento en ruta de I&E por facultad"
                    }
                    labels={dataAPI.nroProyectosEmprendimientoXFacultad.map(
                      (data) => data.facultad
                    )}
                    data={dataAPI.nroProyectosEmprendimientoXFacultad.map(
                      (data) => data.nroProyectosEmprendimiento
                    )}
                    dataLabel={"Número de proyectos de emprendimiento"}
                  />
                </div>
              </div>
            </>

            <div className="col-md-12">
              <Subtitulo>De la ruta I&E</Subtitulo>
            </div>

            <>
              <div className="col-md-12 mb-3 d-flex">
                <div className="p-3 w-50">
                  <LineChart
                    titulo={
                      "Número de consultorías por tipo de consultoría por mes"
                    }
                    labels={removeDuplicatesItems(
                      dataAPI.nroConsultoriasXTipoXMes.map(
                        (data) => data.id.mesConsultoria
                      )
                    )}
                    data={consultoriasNormalesXTipo()}
                    dataLabel={"Consultoría Normal"}
                    data2={consultoriasEspecializadasXTipo()}
                    dataLabel2={"Consultoría Especializada"}
                  />
                </div>
                <div className="p-3 w-50">
                  <LineChart
                    titulo={
                      "Número de emprendedores en consultorías en I&E por mes"
                    }
                    labels={dataAPI.nroConsultoriasXMes.map(
                      (data) => data.mesConsultoria
                    )}
                    data={dataAPI.nroConsultoriasXMes.map(
                      (data) => data.nroConsultorias
                    )}
                    dataLabel={"Número de emprendedores"}
                  />
                </div>
              </div>

              <div className="col-md-12 mb-3 d-flex">
                <div className="p-3 w-50">
                  <BarChart
                    titulo={
                      "Número de emprendedores en consultorías en I&E por programa académico"
                    }
                    labels={dataAPI.nroConsultoriasXMesXPrograma.map(
                      (data) => data.programaAcademico
                    )}
                    data={dataAPI.nroConsultoriasXMesXPrograma.map(
                      (data) => data.nroConsultorias
                    )}
                    dataLabel={"Número de emprendedores"}
                  />
                </div>
                <div className="p-3 w-50">
                  <BarChart
                    titulo={"Estado de consultorías por mes"}
                    labels={removeDuplicatesItems(
                      dataAPI.estadoConsultoriaXMes.map(
                        (data) => data.id.mesConsultoria
                      )
                    )}
                    data={consultoriasXEstadoProgramadaXMes()}
                    dataLabel={"Consultoria Programada"}
                    data2={consultoriasXEstadoNoAsistidaXMes()}
                    dataLabel2={"Consultoria No Asistida"}
                    data3={consultoriasXEstadoTerminadaXMes()}
                    dataLabel3={"Consultoria Terminada"}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </Card>
    );
  }
}

export default IndicadoresGestionPage;
