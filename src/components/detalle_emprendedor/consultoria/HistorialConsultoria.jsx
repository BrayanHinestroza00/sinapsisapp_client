import { useEffect, useState } from "react";
import moment from "moment";

import {
  CardRuta,
  Ruta,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import DetalleConsultoria from "src/components/emprendedor/ruta/consultorias/DetalleConsultoria";
import FlexyTable from "src/components/FlexyTable";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/utils/constants";

function HistorialConsultoria({ idProyectoEmprendimiento }) {
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
    fetchApiConsultorias({
      URL: URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
          tipoBusqueda: "H",
        },
      },
    });

    setLoadingComponent(false);
  }, []);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            titulo: consultoriaData.tituloConsultoria,
            Tematica: consultoriaData.nombreSubActRuta || "N/A",
            "Fecha Consultoria": moment(
              consultoriaData.fechaConsultoria,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA),
            "Hora Inicio": consultoriaData.horaInicioConsultoria,
            "Hora Finalizacion": consultoriaData.horaFinConsultoria,
            "Creado Por":
              consultoriaData.nombreMentor +
              " " +
              consultoriaData.apellidoMentor,
            "Correo Contacto": consultoriaData.correoInstitucionalMentor,
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
    return <h1>LOADING HISTORICO CONSULTORIA</h1>;
  }

  if (consultoriasMessage) {
    return (
      <>
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
      {consultorias.length > 0 && (
        <CardRuta>
          <Ruta>
            <FlexyTable
              datos={consultorias}
              titulo={"Historico de Consultorias"}
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
