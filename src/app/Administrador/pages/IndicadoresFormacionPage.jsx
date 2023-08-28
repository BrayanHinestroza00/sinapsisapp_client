import { useEffect, useState } from "react";

import BarChart2 from "../components/Reportes/ChartJS/BarChart2";
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
                <BarChart2
                  titulo={"Número de emprendedores por tipo de contacto"}
                  labels={["Tipos de contacto"]}
                  dataLabel={dataAPI.nroEmprendedoresXTipoContacto.map(
                    (datos) => {
                      return {
                        label: datos.vinculoConU,
                        data: datos.nroEmprendedores,
                      };
                    }
                  )}
                />
              </div>

              <div className="p-3 w-50">
                <BarChart2
                  titulo={"Número de emprendedores en cada etapa"}
                  labels={["Etapa en la Ruta de Innovación y Emprendimiento"]}
                  dataLabel={dataAPI.nroEmprendedoresXEtapa.map((datos) => {
                    return {
                      label: datos.etapaRuta,
                      data: datos.nroEmprendedores,
                    };
                  })}
                />
              </div>
            </div>

            <br />

            <div className="col-md-12 mb-3 d-flex">
              <div className="p-3 w-50">
                <BarChart2
                  titulo={"Número de emprendedores por programa académico"}
                  labels={["Programas Académicos"]}
                  dataLabel={dataAPI.nroEmprendedoresXPrograma.map((datos) => {
                    return {
                      label: datos.programaAcademico,
                      data: datos.nroEmprendedores,
                    };
                  })}
                />
              </div>
              <div className="p-3 w-50">
                <BarChart2
                  titulo={"Número de emprendedores por facultad"}
                  labels={["Facultades"]}
                  dataLabel={dataAPI.nroEmprendedoresXFacultad.map((datos) => {
                    return {
                      label: datos.facultad,
                      data: datos.nroEmprendedores,
                    };
                  })}
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
