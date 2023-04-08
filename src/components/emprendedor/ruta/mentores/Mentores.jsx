import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

import imagen from "src/assets/images/Sinapsis-LR.png";
import logoSinapsis from "src/assets/images/Logo_Sinapsis.png";
import logoUser from "src/assets/images/header/emprendedor/user.svg";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_MENTORES_POR_PROYECTO_EMPRENDIMIENTO,
  URL_OBTENER_MENTOR_POR_PROYECTO_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/utils/constants";
import { HOST } from "src/utils/apiConstants";

function Mentores() {
  const { userData, selectedProjectIndex, loading } =
    useContext(EmprendedorContext);

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

  if (mentorAsignadoMessage || historicoMentoresMessage) {
    return (
      <>
        <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

        <CardRuta>
          <Ruta>
            <p>{mentorAsignadoMessage || historicoMentoresMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (mentorAsignadoError || historicoMentoresError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{mentorAsignadoError || historicoMentoresError}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Mis Mentores</Titulo>

      <CardRuta>
        <Ruta>
          <SubTitulo>Mentor Asignado</SubTitulo>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>
                Mentor:{" "}
                <Auxiliar>
                  {`${mentorAsignado.nombresMentor} ${mentorAsignado.apellidosMentor}`}
                </Auxiliar>
              </h5>
              <h5>
                Correo:{" "}
                <Auxiliar>{`${
                  mentorAsignado.correoInstitucionalMentor || "NA"
                }`}</Auxiliar>
              </h5>
              <h5>
                Cargo:{" "}
                <Auxiliar>{`${mentorAsignado.cargoMentor || "NA"}`}</Auxiliar>
              </h5>
              {mentorAsignado.facultadMentor && (
                <h5>
                  Facultad:{" "}
                  <Auxiliar>{`${
                    mentorAsignado.facultadMentor || "NA"
                  }`}</Auxiliar>
                </h5>
              )}

              {mentorAsignado.dependenciaMentor && (
                <h5>
                  Dependencia:{" "}
                  <Auxiliar>{`${
                    mentorAsignado.dependenciaMentor || "NA"
                  }`}</Auxiliar>
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
            <img src={logoSinapsis} alt="Logo Sinapsis" />
          </div>
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta className="card-body">
          <SubTitulo>Mi Historial de Mentores</SubTitulo>
          <div className="d-flex flex-wrap justify-content-center">
            {true ? (
              historicoMentores.map((mentor, index) => {
                return (
                  <div
                    key={index}
                    className="card text-center align-items-center p-3 m-2"
                    style={{ maxWidth: "20rem" }}
                  >
                    <img
                      className="rounded"
                      src={
                        mentorAsignado.fotoPerfilMentor
                          ? `${HOST}/${mentorAsignado.fotoPerfilMentor}`
                          : imagen
                      }
                      className="card-img-top d-flex"
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
              <Auxiliar>Sin registros</Auxiliar>
            )}
          </div>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Mentores;
