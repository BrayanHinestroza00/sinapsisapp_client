import { useEffect, useState } from "react";

import BarChart from "../components/Reportes/ChartJS/BarChart";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { Card } from "src/app/Shared/assets/styles/Common.js";
import { Titulo } from "src/app/Shared/assets/styles/Common";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import {
  HTTP_METHOD_GET,
  URL_REPORTES_FORMACION,
} from "src/app/Shared/utils/apiConstants";

function IndicadoresFormacionPage() {
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
      URL: URL_REPORTES_FORMACION,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
    setLoading(false);
  }, []);

  const nroEmprendedoresXTipoContacto = (tipo) => {
    let nroEmp = [];
    if (tipo == "Estudiante") {
      nroEmp = dataAPI.nroEmprendedoresXTipoContacto.filter((data) => {
        if (data.vinculoConU == "ESTUDIANTE") {
          return data;
        }
      });
    } else if (tipo == "Colaborador") {
      nroEmp = dataAPI.nroEmprendedoresXTipoContacto.filter((data) => {
        if (data.vinculoConU == "COLABORADOR") {
          return data;
        }
      });
    } else {
      nroEmp = dataAPI.nroEmprendedoresXTipoContacto.filter((data) => {
        if (data.vinculoConU == "EXTERNO") {
          return data;
        }
      });
    }

    return nroEmp.map((data) => {
      return data.nroEmprendedores;
    });
  };

  const nroEmprendedoresXEtapaRuta = (tipo) => {
    let nroEmp = [];
    if (tipo == "Sonar") {
      nroEmp = dataAPI.nroEmprendedoresXEtapa.filter((data) => {
        if (data.etapaRuta == "SOÑAR") {
          return data;
        }
      });
    } else if (tipo == "Pensar") {
      nroEmp = dataAPI.nroEmprendedoresXEtapa.filter((data) => {
        if (data.etapaRuta == "PENSAR") {
          return data;
        }
      });
    } else if (tipo == "Testear") {
      nroEmp = dataAPI.nroEmprendedoresXEtapa.filter((data) => {
        if (data.etapaRuta == "TESTEAR") {
          return data;
        }
      });
    } else {
      nroEmp = dataAPI.nroEmprendedoresXEtapa.filter((data) => {
        if (data.etapaRuta == "ARRANCAR") {
          return data;
        }
      });
    }

    return nroEmp.map((data) => {
      return data.nroEmprendedores;
    });
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
        <Titulo>Reporte con Indicadores de Formación</Titulo>
        <LoadingSpinner width="25rem" height="25rem" />;
      </Card>
    );
  } else {
    return (
      <Card>
        <Titulo>Reporte con Indicadores de Formación</Titulo>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mb-3 d-flex">
              <div className="p-3 w-50">
                <BarChart
                  titulo={"Número de emprendedores por tipo de contacto"}
                  labels={["Número de emprendedores"]}
                  data={nroEmprendedoresXTipoContacto("Estudiante")}
                  dataLabel={"Estudiante"}
                  data2={nroEmprendedoresXTipoContacto("Colaborador")}
                  dataLabel2={"Colaborador"}
                  data3={nroEmprendedoresXTipoContacto("Externo")}
                  dataLabel3={"Externo"}
                />
              </div>

              <div className="p-3 w-50">
                <BarChart
                  titulo={"Número de emprendedores en cada etapa"}
                  labels={["Número de emprendedores"]}
                  data={nroEmprendedoresXEtapaRuta("Sonar")}
                  dataLabel={"Sonar"}
                  data2={nroEmprendedoresXEtapaRuta("Pensar")}
                  dataLabel2={"Pensar"}
                  data3={nroEmprendedoresXEtapaRuta("Testear")}
                  dataLabel3={"Testear"}
                  data4={nroEmprendedoresXEtapaRuta("Arrancar")}
                  dataLabel4={"Arrancar"}
                />
              </div>
            </div>

            <br />

            <div className="col-md-12 mb-3 d-flex">
              <div className="p-3 w-50">
                <BarChart
                  titulo={"Número de emprendedores por programa académico"}
                  labels={dataAPI.nroEmprendedoresXPrograma.map(
                    (data) => data.programaAcademico
                  )}
                  data={dataAPI.nroEmprendedoresXPrograma.map(
                    (data) => data.nroEmprendedores
                  )}
                  dataLabel={"Número de emprendedores"}
                />
              </div>
              <div className="p-3 w-50">
                <BarChart
                  titulo={"Número de emprendedores por facultad"}
                  labels={dataAPI.nroEmprendedoresXFacultad.map(
                    (data) => data.facultad
                  )}
                  data={dataAPI.nroEmprendedoresXFacultad.map(
                    (data) => data.nroEmprendedores
                  )}
                  dataLabel={"Número de emprendedores"}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default IndicadoresFormacionPage;
