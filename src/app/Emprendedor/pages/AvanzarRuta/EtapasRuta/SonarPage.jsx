import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import DropZone from "src/app/Shared/components/DropZone/DropZone";
import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaSonar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Sonar";
import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
// import PerfilModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Soñar/PerfilModal";
// import EstructuracionModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Soñar/EstructuracionModal";
import {
  HTTP_METHOD_POST,
  URL_CONTINUAR_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";
import {
  validacionesSonarPageEstructuracion,
  validacionesSonarPagePerfil,
} from "src/app/Shared/services/validation/validateAvanceRuta";

function SonarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  // const [showModalPerfil, setShowModalPerfil] = useState(false);
  // const [showModalEstructuracion, setShowModalEstructuracion] = useState(false);

  useEffect(() => {
    switch (state?.subActividadRutaId) {
      case 1:
        setPagina(0);
        break;
      case 2:
        setPagina(1);
        break;

      case 3:
        setPagina(2);
        break;

      case 4:
        setPagina(3);
        break;

      case 5:
        setPagina(4);
        break;

      default:
        setPagina(0);
        break;
    }
  }, []);

  const onGetArchivoPerfilEmprendedor = (archivoPerfilEmprendedor) => {
    delete error.archivoPerfilEmprendedor;
    setDatos({
      ...datos,
      archivoPerfilEmprendedor,
    });
  };

  const onGetArchivoEstructuracionIdea = (archivoEstructuracionIdea) => {
    delete error.archivoEstructuracionIdea;
    setDatos({
      ...datos,
      archivoEstructuracionIdea,
    });
  };

  const getArchivoPerfilEmprendedorRejected = (mensajeError) => {
    setError({ ...error, archivoPerfilEmprendedor: mensajeError });
  };

  const getArchivoEstructuracionIdeaRejected = (mensajeError) => {
    setError({ ...error, archivoEstructuracionIdea: mensajeError });
  };

  const onClicSubirArchivo = () => {
    let erroresFormulario = validacionesSonarPagePerfil(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de perfil de emprendedor?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(3, "PERFIL_EMPRENDEDOR", (response) => {
            if (
              response.code == 0 &&
              response.message == "Ya ha sido realizada"
            ) {
              setPagina(3);
            } else if (response.code == 1 && response.message == "OK") {
              messageAlertWithoutText({
                title: "Herramienta entregada con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
                onConfirm: () => {
                  setPagina(3);
                },
              });
            } else {
              messageAlertWithoutText({
                title: response.message,
                icon: "warning",
                confirmButtonText: "Aceptar",
              });
            }
          });
        },
      });
    }
  };

  const onClicSubirArchivo2 = () => {
    let erroresFormulario = validacionesSonarPageEstructuracion(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});

      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de estructuración de idea?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(5, "ESTRUCTURACION_IDEA", (response) => {
            if (response.code == 1 && response.message == "OK") {
              messageAlertWithoutText({
                title: "Herramienta entregada con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
                onConfirm: () => {
                  navigate("/Emprendedor/Ruta/Avanzar", {
                    replace: true,
                    state: {
                      stateButton: 1,
                      reload: true,
                    },
                  });
                },
              });
            } else {
              messageAlertWithoutText({
                title: response.message,
                icon: "warning",
                confirmButtonText: "Aceptar",
              });
            }
          });
        },
      });
    }
  };

  const onClickContinuar = (idSubActRuta, onCallBack) => {
    if (state != null) {
      const form = new FormData();

      form.append("idRutaProyecto", state?.rutaEmprendimientoId);
      form.append("idSubActividadRuta", idSubActRuta);

      axios({
        url: URL_CONTINUAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: form,
      }).then(() => {
        onCallBack();
      });
    }
  };

  const onSubmitSubirArchivo = (idSubActRuta, tipo, onCallBack) => {
    const form = new FormData();

    form.append("idRutaProyecto", state?.rutaEmprendimientoId);
    form.append("idSubActividadRuta", idSubActRuta);

    if (tipo == "PERFIL_EMPRENDEDOR") {
      form.append("evidencia", datos.archivoPerfilEmprendedor[0]);
    } else if (tipo == "ESTRUCTURACION_IDEA") {
      form.append("evidencia", datos.archivoEstructuracionIdea[0]);
    }

    axios({
      url: URL_CONTINUAR_AVANCE_RUTA,
      method: HTTP_METHOD_POST,
      data: form,
    })
      .then(({ data }) => {
        onCallBack(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <EtapaSonar showButton={false} />

      <>
        {pagina == 0 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Soñar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Perfil Emprendedor
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>
              Conectar y potencializar tu perfil como emprendedor
            </h1>

            <p className="mb-3">
              Conceptos de emprendimiento e innovación, las alternativas que
              existen para emprender e innovar, así como las habilidades y
              herramientas que se necesitan para tener procesos más efectivos.
            </p>

            <p className="mb-3">
              Está diseñada exclusivamente para apoyar y empoderar a
              emprendedores de todos los ámbitos. Nuestra misión es
              proporcionarte un espacio en línea donde puedas desarrollar tus
              habilidades, ampliar tu red de contactos y acceder a recursos
              valiosos que te permitan alcanzar el máximo potencial en tu camino
              empresarial.
            </p>

            <div
              className="card mx-auto"
              style={{
                width: "50vw",
                backgroundColor: "#999",
                color: "#FFF",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/rrUp4fjAYc8"
                title="Introducción al curso Ruta 0 - Plataforma virtual Sinapsis UAO"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">
                  Introducción al curso Ruta 0 - Plataforma virtual Sinapsis
                  UAO.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(1, () => setPagina(1))}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 1 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Soñar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Perfil Emprendedor
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Descubrirse como emprendedor</h1>

            <p>
              Descubrirse como emprendedor es un emocionante viaje de
              autodescubrimiento, creatividad y determinación. Es el proceso de
              reconocer y cultivar el espíritu emprendedor dentro de uno mismo,
              explorando nuevas ideas y oportunidades para llevar a cabo
              proyectos innovadores y hacer realidad tus sueños empresariales.
            </p>

            <h3>CÁPSULA INFORMATIVA</h3>

            <div
              className="card mx-auto"
              style={{
                width: "50vw",
                backgroundColor: "#999",
                color: "#FFF",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/5uo2yctul7k"
                title="Introducción al curso Ruta 1 - - Plataforma virtual Sinapsis UAO"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">
                  Introducción al curso Ruta 1 - - Plataforma virtual Sinapsis
                  UAO
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(2, () => setPagina(2))}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 2 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Soñar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Perfil Emprendedor
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Definirse como emprendedor</h1>

            <p>
              Definirse como emprendedor implica abrazar una mentalidad y un
              enfoque empresarial que va más allá de ser simplemente un creador
              de negocios. Ser un emprendedor es ser un visionario, un innovador
              y un agente de cambio dispuesto a tomar riesgos calculados para
              perseguir sus sueños y convertir sus ideas en realidad.
            </p>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p className="mb-4">
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 className="mb-3">Perfil de Emprendedor</h3>
            <p className="mb-3">
              Con la realización de este perfil le proponemos realizar acciones
              concretas para ayudarle a comprender mejor su potencial
              empresarial, fortalecer sus habilidades e impulsar sus proyectos
              de negocio.
              <a
                className="my-4 d-block"
                target="_blank"
                href="https://uao-my.sharepoint.com/:x:/r/personal/djrestrepo_uao_edu_co/_layouts/15/Doc.aspx?sourcedoc=%7B73D97C66-042D-4408-A6E7-68E6325FA7C8%7D&file=3.%20Perfil%20del%20emprendedor%20Ruta%20de%20Innovaci%C3%B2n%20y%20Emprendimiento%20UAO.xlsm&action=default&mobileredirect=true"
              >
                Descarga formato de perfil de emprendedor
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar el formato de perfil de
                  emprendedor diligenciado
                </p>
                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoPerfilEmprendedor}
                    upFilesRejected={getArchivoPerfilEmprendedorRejected}
                    files={datos?.archivoPerfilEmprendedor}
                    accept={{
                      "application/msword": [],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [],
                      "application/zip": [],
                      "application/vnd.rar": [],
                      "image/jpeg": [],
                      "image/png": [],
                      "application/pdf": [],
                      "text/plain": [],
                      "application/vnd.ms-excel": [],
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        [],
                    }}
                  />

                  {error.archivoPerfilEmprendedor && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoPerfilEmprendedor}
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary mt-3 w-25"
                  onClick={() => onClicSubirArchivo()}
                >
                  Subir
                </button>
              </div>
            </form>
          </SeccionRuta>
        )}

        {pagina == 3 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Soñar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Estructuración de la idea de negocio
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>
              Estructuración de la idea de negocio
            </h1>

            <p>
              La estructuración de la idea de negocio es un proceso fundamental
              para convertir una visión emprendedora en una empresa sólida y
              exitosa. Implica organizar y dar forma a todos los aspectos
              esenciales del negocio, desde la concepción inicial hasta la
              implementación y ejecución efectiva.
            </p>

            <h2>CONCEPTO DE EMPRESA</h2>

            <p className="mb-3">
              El concepto de empresa se refiere a una organización o entidad
              económica creada con el propósito de producir bienes, brindar
              servicios o comercializar productos con el objetivo de obtener
              beneficios económicos. La empresa es una entidad independiente que
              busca satisfacer las necesidades y demandas del mercado a través
              de la oferta de sus productos o servicios.
            </p>

            <div
              className="card mx-auto"
              style={{
                width: "50vw",
                backgroundColor: "#999",
                color: "#FFF",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/tm4ce7PkeGg"
                title="Concepto de Empresa"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">Concepto de Empresa</p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(4, () => setPagina(4))}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 4 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Soñar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Estructuración de la idea de negocio
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>
              Estructuración de la idea de negocio
            </h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p className="mb-4">
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 className="mb-3">Plantilla estructuración de la idea</h3>
            <p className="mb-3">
              Con la realización de esta plantilla le proponemos realizar
              acciones concretas para ayudarle a comprender mejor su potencial
              empresarial, fortalecer sus habilidades e impulsar sus proyectos
              de negocio.
              <a
                className="my-4 d-block"
                target="_blank"
                href="https://uao-my.sharepoint.com/:w:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/So%C3%B1ar/ESTRUCTURA%20IDEA%20DE%20NEGOCIO.docx?d=w637c518d78a84e259c0dfb980a5616d3&csf=1&web=1&e=KzZHX8"
              >
                Descarga plantilla de estructuración de la idea
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar la plantilla de estructuración
                  de la idea diligenciada.
                </p>

                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoEstructuracionIdea}
                    upFilesRejected={getArchivoEstructuracionIdeaRejected}
                    files={datos?.archivoEstructuracionIdea}
                    accept={{
                      "application/msword": [],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [],
                      "application/zip": [],
                      "application/vnd.rar": [],
                      "image/jpeg": [],
                      "image/png": [],
                      "application/pdf": [],
                      "text/plain": [],
                      "application/vnd.ms-excel": [],
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        [],
                    }}
                  />

                  {error.archivoEstructuracionIdea && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoEstructuracionIdea}
                    </small>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary mt-3 w-25"
                  onClick={() => onClicSubirArchivo2()}
                >
                  Subir
                </button>
              </div>
            </form>
          </SeccionRuta>
        )}
      </>
    </>
  );
}

export default SonarPage;
