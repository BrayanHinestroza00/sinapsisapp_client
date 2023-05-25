import moment from "moment";
import { useContext, useEffect, useState } from "react";

import FlexyTable from "src/app/Shared/components/FlexyTable";
import TablaHorarioDisponibilidad from "src/app/Mentor/components/TablaHorarioDisponibilidad";
import EditarDisponibilidadModal from "src/app/Mentor/components//ModalHorarioDisponibilidad";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

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
  URL_OBTENER_HORARIO_MENTOR,
} from "src/app/Shared/utils/apiConstants.js";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants.js";

function Consultorias() {
  const { userData, loadingUserData } = useContext(MentorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [consultorias, setConsultorias] = useState([]);
  const [showEditarDisponibilidad, setShowEditarDisponibilidad] =
    useState(false);

  // Custom Hooks
  const {
    data: horariosData,
    message: horariosMessage,
    error: horariosError,
    loading: horariosLoading,
    fetchAPI: fetchApiHorarios,
  } = useFetch();

  const {
    data: consultoriasData,
    message: consultoriasMessage,
    error: consultoriasError,
    loading: consultoriasLoading,
    fetchAPI: fetchApiConsultorias,
  } = useFetch();

  useEffect(() => {
    if (userData != null) {
      fetchApiHorarios({
        URL: URL_OBTENER_HORARIO_MENTOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idMentor: userData.id,
          },
        },
      });

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
        console.log("consultoriasData", consultoriasData);
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

  function ocultarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(false);
  }
  function mostrarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(true);
  }

  if (
    loadingUserData ||
    horariosLoading ||
    loadingComponent ||
    consultoriasLoading ||
    !horariosData
  ) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (horariosMessage || consultoriasMessage) {
    return (
      <>
        <Titulo>Consultorías Programadas</Titulo>

        <Card>
          <Ruta>
            <p>{horariosMessage || consultoriasMessage}</p>
          </Ruta>
        </Card>
      </>
    );
  }

  if (horariosError || consultoriasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{horariosError || consultoriasError}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Consultorías Programadas</Titulo>
      {/* <Card>
        <Subtitulo>Horario de disponibilidad</Subtitulo>
        <form>
          <TablaHorarioDisponibilidad horarios={horariosData} />
          <button
            type="button"
            className="btn btn-primary w-25"
            onClick={() => mostrarEditarDisponibilidadModal()}
          >
            Editar disponibilidad
          </button>
        </form>
      </Card> */}

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
            adicional={false}
          />
        ) : (
          <Subtitulo>No hay consultorías programadas</Subtitulo>
        )}
      </Ruta>

      {showEditarDisponibilidad && (
        <EditarDisponibilidadModal
          show={showEditarDisponibilidad}
          setShow={ocultarEditarDisponibilidadModal}
          horarios={horariosData}
        />
      )}
    </>
  );
}

export default Consultorias;
