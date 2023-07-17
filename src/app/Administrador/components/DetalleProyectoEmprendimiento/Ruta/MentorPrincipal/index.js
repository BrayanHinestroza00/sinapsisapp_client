import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Tabla from "./Tabla";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_ASIGNAR_MENTOR,
  URL_OBTENER_MENTORES,
} from "src/app/Shared/utils/apiConstants";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";

import agregarMentorIcon from "src/app/Shared/assets/images/icons/agregar_mentor.png";

function AsignarMentor({ preloadData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mentores, setMentores] = useState([]);

  // Custom Hooks
  const {
    data: mentoresData,
    message: mentoresMessage,
    error: mentoresError,
    loading: mentoresLoading,
    fetchAPI: fetchApiMentores,
  } = useFetch();

  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    if (preloadData && preloadData.idEtapa) {
      fetchApiMentores({
        URL: URL_OBTENER_MENTORES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapaRutaInnovacion: preloadData.idEtapa,
          },
        },
      });
    }
  }, [preloadData]);

  useEffect(() => {
    if (mentoresData) {
      let newMentores = [1];

      if (mentoresData.length > 0) {
        newMentores = mentoresData.map((mentorData, index) => {
          return {
            n: index + 1,
            "Número Documento": `${mentorData.acronimoTipoDocumento} - ${mentorData.numeroDocumento}`,
            "Nombre Mentor": mentorData.nombreCompleto,
            Cargo: mentorData.cargoMentor,
            "Dependencia/Facultad":
              mentorData.dependenciaMentor || mentorData.facultadMentor,
            "Correo Contacto":
              mentorData.correoInstitucional || mentorData.correoPersonal,
            "Etapa Mentor": mentorData.etapaRuta,
          };
        });
      }

      setMentores(newMentores);
    }
  }, [mentoresData]);

  const onClicAsignarMentor = (mentor) => {
    confirmAlertWithText({
      title: "¿Estás seguro? Se asignará un mentor principal al emprendedor",
      text: "Este proceso no se puede deshacer",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      onConfirm: () => handleSubmit({ data }),
    });

    const data = {
      ...mentoresData[mentor.n - 1],
    };
  };

  const handleSubmit = ({ data }) => {
    setLoading(true);
    fetchAPI({
      URL: URL_ASIGNAR_MENTOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          idProyectoEmprendimiento: preloadData.idProyectoEmprendimiento,
          idMentorPrincipal: data.id,
          idRutaProyectoEmprendimiento: preloadData.idRutaProyEmprendimiento,
        },
      },
    });
  };

  if (loading && errorAPI) {
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Se ha asignado el mentor correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => navigate("/Administrador/Emprendimientos/"),
      });
    } else {
      messageAlert({
        title: "Asignación de mentor fallido",
        text: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <>
      {mentoresLoading ? (
        <LoadingSpinner width="5rem" height="5rem" />
      ) : mentoresMessage || mentoresError ? (
        <p>{mentoresMessage || mentoresError}</p>
      ) : (
        <Tabla
          datos={mentores}
          btn1={<img src={agregarMentorIcon} width="auto" height="25" />}
          fun1={(mentorData) => {
            onClicAsignarMentor(mentorData);
          }}
        />
      )}
    </>
  );
}

export default AsignarMentor;
