import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import CrearConsultoria from "./CrearConsultoria";
import RevisarConsultoria from "./RevisarConsultoria";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import { Card, Ruta, Subtitulo } from "src/app/Shared/assets/styles/Common.js";
import {
  URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
  HTTP_METHOD_GET,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

import showIcon from "src/app/Shared/assets/images/icons/detalleConsultoriaIcon.svg";

function Consultorias({
  idEmprendedor,
  idProyectoEmprendimiento,
  idEtapaRuta,
  tipoUsuario,
  idUsuario,
  estadoAsesoramiento,
}) {
  const [consultorias, setConsultorias] = useState([]);
  const [showConsultorias, setShowConsultorias] = useState({ show: false });
  const [showCrearConsultoria, setShowCrearConsultoria] = useState(false);

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
            "Hora Inicio": consultoriaData.horaInicioConsultoria,
            "Hora Finalización": consultoriaData.horaFinConsultoria,
            Emprendedor:
              consultoriaData.nombreEmprendedor +
              " " +
              consultoriaData.apellidoEmprendedor,
            "Correo Contacto":
              consultoriaData.correoInstitucionalEmprendedor ||
              consultoriaData.correoPersonalEmprendedor,
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

      {estadoAsesoramiento != "FINALIZADA" && (
        <Button
          className="btn btn-primary mx-4 my-3 w-25"
          onClick={() => setShowCrearConsultoria(!showCrearConsultoria)}
        >
          Programar Consultoría
        </Button>
      )}

      <Ruta>
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
            btn1={<img src={showIcon} width="auto" height="25" />}
            fun1={(consultoriaData) => {
              onClicRevisarConsultoria(consultoriaData);
            }}
            adicional={true}
          />
        ) : (
          <h6>No hay consultorías programadas</h6>
        )}
      </Ruta>

      {showCrearConsultoria && (
        <CrearConsultoria
          show={showCrearConsultoria}
          idProyectoEmprendimiento={idProyectoEmprendimiento}
          tipoUsuario={tipoUsuario}
          idUsuario={idUsuario}
          idEtapaRuta={idEtapaRuta}
          onHide={() => setShowCrearConsultoria(!showCrearConsultoria)}
        />
      )}

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
