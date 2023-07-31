import moment from "moment";
import { useContext, useEffect, useState } from "react";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import RevisarConsultoria from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/RevisarConsultoria";

import {
  Card,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
} from "src/app/Shared/utils/apiConstants.js";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants.js";

import showIcon from "src/app/Shared/assets/images/icons/detalleConsultoriaIcon.svg";

function Consultorias() {
  const { userData, loadingUserData } = useContext(MentorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
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
    if (userData != null) {
      fetchApiConsultorias({
        URL: URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userData.id,
            tipoUsuario: 2,
          },
        },
      });

      setLoadingComponent(false);
    }
  }, [userData]);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            título: consultoriaData.tituloConsultoria,
            "Tipo Consultoría":
              consultoriaData.tipoConsultoria == "E"
                ? "Especializada"
                : "Normal",
            Temática: consultoriaData.nombreSubActRuta || "N/A",
            "Fecha Consultoría": moment(
              consultoriaData.fechaConsultoria,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA),
            "Hora Inicio Programada": consultoriaData.horaInicioConsultoria,
            "Hora Finalización Programada": consultoriaData.horaFinConsultoria,
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

  if (loadingUserData || loadingComponent || consultoriasLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (consultoriasMessage) {
    return (
      <>
        <Titulo>Consultorías Programadas</Titulo>

        <Card>
          <Ruta>
            <p>{consultoriasMessage}</p>
          </Ruta>
        </Card>
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
      <Titulo>Consultorías Programadas</Titulo>
      <Ruta
        style={{
          padding: "0.5rem 2rem 1rem 2rem",
          marginTop: "1rem",
          marginLeft: "0rem",
        }}
      >
        {consultorias.length > 0 ? (
          <FlexyTable
            datos={consultorias}
            titulo={"consultorías normales y especializadas"}
            btn1={<img src={showIcon} width="auto" height="25" />}
            fun1={(consultoriaData) => {
              onClicRevisarConsultoria(consultoriaData);
            }}
            adicional={true}
          />
        ) : (
          <Subtitulo>No hay consultorías programadas</Subtitulo>
        )}
      </Ruta>

      {showConsultorias.show && (
        <RevisarConsultoria
          show={showConsultorias.show}
          data={showConsultorias.data}
          onHide={() => setShowConsultorias({ show: !showConsultorias.show })}
        />
      )}
    </>
  );
}

export default Consultorias;
