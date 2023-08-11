import { useEffect, useState } from "react";
import moment from "moment";

import DetalleConsultoria from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/DetalleConsultoria";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import { Card, CardRuta, Ruta } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

import showIcon from "src/app/Shared/assets/images/icons/detalleIcon.svg";

function HistorialConsultoria({ idProyectoEmprendimiento }) {
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
            ).format("LT"),
            "Hora Finalización Programada": moment(
              consultoriaData.horaFinConsultoria,
              "hh:mm"
            ).format("LT"),
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

  return (
    <>
      <Card>
        <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
          <Ruta>
            {consultoriasLoading ? (
              <LoadingSpinner width="5rem" height="5rem" />
            ) : consultoriasError || consultoriasMessage ? (
              <>
                {consultoriasError && <h6>{consultoriasError}</h6>}

                {consultoriasMessage && <h6>{consultoriasMessage}</h6>}
              </>
            ) : consultorias && consultorias.length > 0 ? (
              <FlexyTable
                datos={consultorias}
                titulo={"Histórico de Consultorías"}
                btn1={<img src={showIcon} width="auto" height="25" />}
                fun1={(consultoriaData) => {
                  onClicDetalleConsultoria(consultoriaData);
                }}
                adicional={true}
              />
            ) : (
              <h6>No se encontraron consultorías</h6>
            )}

            {showConsultoria.show && (
              <DetalleConsultoria
                show={showConsultoria.show}
                data={showConsultoria.data}
                tipo={showConsultoria.tipo}
                onHide={() =>
                  setShowConsultoria({ show: !showConsultoria.show })
                }
              />
            )}
          </Ruta>
        </CardRuta>
      </Card>
    </>
  );
}

export default HistorialConsultoria;
