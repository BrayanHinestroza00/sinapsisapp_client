import { useContext, useEffect, useState } from "react";
import moment from "moment";

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
import { HOST } from "src/app/Shared/utils/apiConstants";

import imagen from "src/app/Shared/assets/images/panel_lateral.png";
import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";
import logoUser from "src/app/Shared/assets/images/header/emprendedor/user.svg";

function Mentores() {
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);

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

  if (loadingComponent || mentorAsignadoLoading || historicoMentoresLoading) {
    return <h1>LOADING Mentores</h1>;
  }

  // if (mentorAsignadoMessage || historicoMentoresMessage) {
  //   return (
  //     <>
  //       <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

  //       <CardRuta>
  //         <Ruta>
  //           <p>{mentorAsignadoMessage || historicoMentoresMessage}</p>
  //         </Ruta>
  //       </CardRuta>
  //     </>
  //   );
  // }

  // if (mentorAsignadoError || historicoMentoresError) {
  //   return (
  //     <>
  //       <h1>ERROR</h1>
  //       <p>{mentorAsignadoError || historicoMentoresError}</p>
  //     </>
  //   );
  // }

  return (
    <>
      <Titulo>Mis Mentores</Titulo>

      <CardRuta>
        <Ruta>
          <Subtitulo>Mentor Asignado</Subtitulo>

          {mentorAsignadoMessage || mentorAsignadoError ? (
            <p>{mentorAsignadoMessage || mentorAsignadoError}</p>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>
                  Mentor:{" "}
                  <SpanAuxiliar>
                    {`${mentorAsignado.nombresMentor} ${mentorAsignado.apellidosMentor}`}
                  </SpanAuxiliar>
                </h5>
                <h5>
                  Correo:{" "}
                  <SpanAuxiliar>{`${
                    mentorAsignado.correoInstitucionalMentor || "NA"
                  }`}</SpanAuxiliar>
                </h5>
                <h5>
                  Cargo:{" "}
                  <SpanAuxiliar>{`${
                    mentorAsignado.cargoMentor || "NA"
                  }`}</SpanAuxiliar>
                </h5>
                {mentorAsignado.facultadMentor && (
                  <h5>
                    Facultad:{" "}
                    <SpanAuxiliar>{`${
                      mentorAsignado.facultadMentor || "NA"
                    }`}</SpanAuxiliar>
                  </h5>
                )}

                {mentorAsignado.dependenciaMentor && (
                  <h5>
                    Dependencia:{" "}
                    <SpanAuxiliar>{`${
                      mentorAsignado.dependenciaMentor || "NA"
                    }`}</SpanAuxiliar>
                  </h5>
                )}
              </div>
              <img
                className="rounded"
                src={
                  mentorAsignado.fotoPerfilMentor
                    ? `${HOST}/${mentorAsignado.fotoPerfilMentor}`
                    : imagen
                }
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
            historicoMentores && (
              <div className="d-flex flex-wrap justify-content-center">
                {historicoMentores.length > 0 ? (
                  historicoMentores.map((mentor, index) => {
                    return (
                      <div
                        key={index}
                        className="card text-center align-items-center p-3 m-2"
                        style={{ maxWidth: "20rem" }}
                      >
                        <img
                          src={
                            mentorAsignado?.fotoPerfilMentor
                              ? `${HOST}/${mentorAsignado?.fotoPerfilMentor}`
                              : imagen
                          }
                          className="card-img-top rounded d-flex"
                          alt="..."
                          style={{ maxWidth: "15rem" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{`${mentor.nombresMentor} ${mentor.apellidosMentor}`}</h5>
                          <p className="card-text">
                            Fecha de inicio:{" "}
                            <span className="d-block">{`${moment(
                              mentor.fechaInicio,
                              "YYYY-MM-DD hh:mm:ss"
                            ).format(SINAPSIS_APP_FORMATO_FECHA)}`}</span>
                          </p>
                          <p className="card-text">
                            Fecha de finalizacion:
                            <span className="d-block">{`${moment(
                              mentor.fechaFin,
                              "YYYY-MM-DD hh:mm:ss"
                            ).format(SINAPSIS_APP_FORMATO_FECHA)}`}</span>
                          </p>

                          <p className="card-text">
                            Comentarios:
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
