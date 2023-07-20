import { useContext, useEffect, useState } from "react";
import moment from "moment";

import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  SpanAuxiliar,
  CardRuta,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common.js";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_MENTORES_POR_PROYECTO_EMPRENDIMIENTO,
  URL_OBTENER_MENTOR_POR_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";
import { getArchivo } from "src/app/Shared/utils/utilityFunctions";

import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";
import default_image from "src/app/Shared/assets/images/default_profile_picture.png";

function Mentores() {
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [datosImagen, setDatosImagen] = useState({});
  const [datosHistoricoMentor, setDatosHistoricoMentor] = useState(null);

  // Custom Hooks
  const {
    data: mentorAsignado,
    message: mentorAsignadoMessage,
    error: mentorAsignadoError,
    loading: mentorAsignadoLoading,
    fetchAPI: fetchApiMentorAsignado,
  } = useFetch();

  const {
    data: historicoMentores,
    message: historicoMentoresMessage,
    error: historicoMentoresError,
    loading: historicoMentoresLoading,
    fetchAPI: fetchApiHistoricoMentores,
  } = useFetch();

  useEffect(() => {
    if (userData && selectedProjectIndex != null) {
      fetchApiMentorAsignado({
        URL: URL_OBTENER_MENTOR_POR_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "P",
          },
        },
      });

      fetchApiHistoricoMentores({
        URL: URL_OBTENER_MENTORES_POR_PROYECTO_EMPRENDIMIENTO,
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
    obtenerImagen();
  }, [mentorAsignado]);

  useEffect(() => {
    obtenerImagenHistorico();
  }, [historicoMentores]);

  const obtenerImagen = async () => {
    if (mentorAsignado && mentorAsignado.fotoPerfilMentor) {
      const imagen = await getArchivo(mentorAsignado.fotoPerfilMentor);
      setDatosImagen(`data:${imagen.contentType};base64,${imagen.file}`);
    } else {
      setDatosImagen(default_image);
    }
  };

  const obtenerImagenHistorico = async () => {
    if (historicoMentores && historicoMentores.length > 0) {
      let mentores = [];
      for (let i = 0; i < historicoMentores.length; i++) {
        const mentorAsignado = historicoMentores[i];

        if (mentorAsignado && mentorAsignado.fotoPerfilMentor) {
          const imagen = await getArchivo(mentorAsignado.fotoPerfilMentor);
          historicoMentores[
            i
          ].fotoPerfilMentor = `data:${imagen.contentType};base64,${imagen.file}`;
        } else {
          historicoMentores[i].fotoPerfilMentor = default_image;
        }

        mentores.push(historicoMentores[i]);
      }

      setDatosHistoricoMentor(mentores);
    }
  };

  if (loadingComponent || mentorAsignadoLoading || historicoMentoresLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  return (
    <>
      <Titulo>Mis Mentores</Titulo>

      <CardRuta className="mb-3">
        <Ruta>
          <Subtitulo>Mentor Asignado</Subtitulo>

          {mentorAsignadoMessage || mentorAsignadoError ? (
            <p>{mentorAsignadoMessage || mentorAsignadoError}</p>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>
                  Mentor:
                  <SpanAuxiliar>
                    {`${mentorAsignado.nombresMentor} ${mentorAsignado.apellidosMentor}`}
                  </SpanAuxiliar>
                </h5>
                <h5>
                  Correo:
                  <SpanAuxiliar>{`${
                    mentorAsignado.correoInstitucionalMentor || "NA"
                  }`}</SpanAuxiliar>
                </h5>
                <h5>
                  Cargo:
                  <SpanAuxiliar>{`${
                    mentorAsignado.cargoMentor || "NA"
                  }`}</SpanAuxiliar>
                </h5>
                {mentorAsignado.facultadMentor && (
                  <h5>
                    Facultad:
                    <SpanAuxiliar>{`${
                      mentorAsignado.facultadMentor || "NA"
                    }`}</SpanAuxiliar>
                  </h5>
                )}

                {mentorAsignado.dependenciaMentor && (
                  <h5>
                    Dependencia:
                    <SpanAuxiliar>{`${
                      mentorAsignado.dependenciaMentor || "NA"
                    }`}</SpanAuxiliar>
                  </h5>
                )}
              </div>
              <img
                className="rounded"
                src={datosImagen}
                alt="Foto Perfil Mentor"
                style={{ width: "10rem" }}
              />
              <img src={logoSinapsis} alt="Logo SINAPSIS UAO" />
            </div>
          )}
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta className="card-body">
          <Subtitulo>Mi Historial de Mentores</Subtitulo>
          {historicoMentoresMessage || historicoMentoresError ? (
            <p>{historicoMentoresMessage || historicoMentoresError}</p>
          ) : (
            datosHistoricoMentor && (
              <div className="d-flex flex-wrap justify-content-center">
                {datosHistoricoMentor.length > 0 ? (
                  datosHistoricoMentor.map((mentor, index) => {
                    //const imagen = await obtenerImagenHistorico(mentor);

                    return (
                      <div
                        key={index}
                        className="card text-center align-items-center p-3 m-2"
                        style={{ maxWidth: "20rem" }}
                      >
                        <img
                          src={mentor.fotoPerfilMentor}
                          className="card-img-top rounded d-flex"
                          alt="..."
                          style={{ maxWidth: "15rem" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{`${mentor.nombresMentor} ${mentor.apellidosMentor}`}</h5>
                          <p className="card-text mb-2">
                            <b>Fecha de inicio:</b>
                            <span className="d-block">{`${moment(
                              mentor.fechaInicio,
                              "YYYY-MM-DD hh:mm:ss"
                            ).format(SINAPSIS_APP_FORMATO_FECHA)}`}</span>
                          </p>

                          <p className="card-text mb-2">
                            <b>Fecha de finalización:</b>
                            <span className="d-block">{`${moment(
                              mentor.fechaFin,
                              "YYYY-MM-DD hh:mm:ss"
                            ).format(SINAPSIS_APP_FORMATO_FECHA)}`}</span>
                          </p>

                          <p className="card-text mb-2">
                            <b>Comentarios:</b>
                            <span className="d-block">{`${
                              mentor.comentarios || "No hay comentarios"
                            }`}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <SpanAuxiliar>Sin registros</SpanAuxiliar>
                )}
              </div>
            )
          )}
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Mentores;
