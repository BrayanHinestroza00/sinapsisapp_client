import { useContext, useEffect, useState } from "react";
import moment from "moment";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import DetalleConsultoria from "./DetalleConsultoria";

import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

function HistorialConsultoria() {
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [consultorias, setConsultorias] = useState([]);
  const [showConsultoria, setShowConsultoria] = useState({ show: false });

  // Custom Hooks
  const {
    data: consultoriasData,
    message: consultoriasMessage,
    error: consultoriasError,
    loading: consultoriasLoading,
    fetchAPI: fetchApiConsultorias,
  } = useFetch();

  useEffect(() => {
    if (userData && selectedProjectIndex != null) {
      fetchApiConsultorias({
        URL: URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "H",
          },
        },
      });

      setLoadingComponent(false);
    }
  }, [userData, selectedProjectIndex]);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            título: consultoriaData.tituloConsultoria,
            "Fecha Consultoría": moment(
              consultoriaData.fechaConsultoria,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA),
            "Hora Inicio Programada": moment(
              consultoriaData.horaInicioConsultoria,
              "hh:mm"
            ).format("hh:mm A"),
            "Hora Finalización Programada": moment(
              consultoriaData.horaFinConsultoria,
              "hh:mm"
            ).format("hh:mm A"),
            "Creado Por":
              consultoriaData.nombreMentor +
              " " +
              consultoriaData.apellidoMentor,
            "Correo Contacto": consultoriaData.correoInstitucionalMentor,
            Estado: consultoriaData.estadoConsultoria,
          };
        });
      }

      setConsultorias(newConsultorias);
    }
  }, [consultoriasData]);

  const onClicDetalleConsultoria = (consultoria) => {
    setShowConsultoria({
      show: true,
      data: consultoriasData[consultoria.n - 1],
    });
  };

  if (loadingComponent || consultoriasLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (consultoriasMessage) {
    return (
      <>
        <Titulo>Historial de Consultorías</Titulo>

        <CardRuta>
          <Ruta>
            <p>{consultoriasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (consultoriasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{consultoriasError}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Historial de Consultorías</Titulo>

      {consultorias.length > 0 && (
        <CardRuta>
          <Ruta>
            <FlexyTable
              datos={consultorias}
              titulo={"histórico de consultorías"}
              btn1={"Ver Detalle"}
              fun1={(consultoriaData) => {
                onClicDetalleConsultoria(consultoriaData);
              }}
              adicional={true}
            />
          </Ruta>
        </CardRuta>
      )}

      {showConsultoria.show && (
        <DetalleConsultoria
          show={showConsultoria.show}
          data={showConsultoria.data}
          tipo={showConsultoria.tipo}
          onHide={() => setShowConsultoria({ show: !showConsultoria.show })}
        />
      )}
    </>
  );
}

export default HistorialConsultoria;
