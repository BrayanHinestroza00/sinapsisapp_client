import { useEffect, useState } from "react";
import moment from "moment";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import RevisarConsultoria from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/RevisarConsultoria.js";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { Card, Subtitulo } from "src/app/Shared/assets/styles/Common.js";
import {
  URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
  HTTP_METHOD_GET,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

import showIcon from "src/app/Shared/assets/images/icons/detalleConsultoriaIcon.svg";

function Consultorias({ idEmprendedor }) {
  const [consultorias, setConsultorias] = useState([]);
  const [showConsultorias, setShowConsultorias] = useState({ show: false });

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
      URL: URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: idEmprendedor,
          tipoUsuario: 1,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            título: consultoriaData.tituloConsultoria,
            Temática: consultoriaData.nombreSubActRuta || "N/A",
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
            Emprendedor:
              consultoriaData.nombreEmprendedor +
              " " +
              consultoriaData.apellidoEmprendedor,
            "Correo Contacto":
              consultoriaData.correoInstitucionalEmprendedor ||
              consultoriaData.correoPersonalEmprendedor,
            Estado: consultoriaData.estadoConsultoria,
          };
        });
      }

      setConsultorias(newConsultorias);
    }
  }, [consultoriasData]);

  const onClicRevisarConsultoria = (consultoria) => {
    setShowConsultorias({
      show: true,
      data: consultoriasData[consultoria.n - 1],
    });
  };

  return (
    <Card>
      <Subtitulo>Consultorías programadas</Subtitulo>

      <>
        {consultoriasLoading ? (
          <LoadingSpinner width="5rem" height="5rem" />
        ) : consultoriasError ||
          (consultoriasMessage && consultoriasMessage != "Sin datos") ? (
          <>
            {consultoriasError && <h6>{consultoriasError}</h6>}

            {consultoriasMessage && <h6>{consultoriasMessage}</h6>}
          </>
        ) : consultorias && consultorias.length > 0 ? (
          <FlexyTable
            datos={consultorias}
            titulo={"consultorías programadas"}
            btn1={
              <img
                src={showIcon}
                width="100%"
                height="25"
                data-toggle="tooltip"
                data-placement="top"
                title="Ver Detalle"
              />
            }
            fun1={(consultoriaData) => {
              onClicRevisarConsultoria(consultoriaData);
            }}
            adicional={true}
          />
        ) : (
          <h6>No hay consultorías programadas</h6>
        )}
      </>

      {showConsultorias.show && (
        <RevisarConsultoria
          show={showConsultorias.show}
          data={showConsultorias.data}
          onHide={() => setShowConsultorias({ show: !showConsultorias.show })}
        />
      )}
    </Card>
  );
}

export default Consultorias;
