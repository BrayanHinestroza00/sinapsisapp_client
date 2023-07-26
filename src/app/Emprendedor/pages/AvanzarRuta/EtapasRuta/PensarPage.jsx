import axios from "axios";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import EtapaPensar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Pensar";
import SeccionRuta from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/seccion";
// import BMCModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Pensar/BMCModal";
// import ModeloModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Pensar/ModeloModal";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";
import {
  validacionesPensarPageBMC,
  validacionesPensarPageLearnStartup,
} from "src/app/Shared/services/validation/validateAvanceRuta";
import {
  HTTP_METHOD_POST,
  URL_CONTINUAR_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function PensarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  // const [showModalModelo, setShowModalModelo] = useState(false);
  // const [showModalBMC, setShowModalBMC] = useState(false);

  useEffect(() => {
    switch (state?.subActividadRutaId) {
      case 6:
        setPagina(0);
        break;
      case 7:
        setPagina(1);
        break;

      case 8:
        setPagina(2);
        break;

      case 9:
        setPagina(3);
        break;

      default:
        setPagina(0);
        break;
    }
  }, []);

  const onGetArchivoBMC = (archivoBMC) => {
    delete error.archivoBMC;
    setDatos({
      ...datos,
      archivoBMC,
    });
  };

  const onGetArchivoLearnStartup = (archivoLearnStartup) => {
    delete error.archivoLearnStartup;
    setDatos({
      ...datos,
      archivoLearnStartup,
    });
  };

  const getArchivoBMCRejected = (mensajeError) => {
    setError({ ...error, archivoBMC: mensajeError });
  };

  const getArchivoLearnStartupRejected = (mensajeError) => {
    setError({ ...error, archivoLearnStartup: mensajeError });
  };

  const onClicSubirArchivo = () => {
    let erroresFormulario = validacionesPensarPageBMC(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de Formato Canvas y Herramienta BMC?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(8, "BMC", (response) => {
            if (response.code == 1 && response.message == "OK") {
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
    let erroresFormulario = validacionesPensarPageLearnStartup(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de Learn Startup?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(9, "LEARN_STARTUP", (response) => {
            if (response.code == 1 && response.message == "OK") {
              messageAlert({
                title: "Herramienta entregada con éxito",
                text: "Ahora debes esperar a que el responsable apruebe tus entregas y puedas avanzar a la siguiente etapa",
                icon: "success",
                confirmButtonText: "Aceptar",
                onConfirm: () => {
                  navigate("/Emprendedor/Ruta/Avanzar", {
                    replace: true,
                    state: {
                      stateButton: 2,
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

  const onSubmitSubirArchivo = (idSubActRuta, tipo, onCallBack) => {
    const form = new FormData();

    form.append("idRutaProyecto", state?.rutaEmprendimientoId);
    form.append("idSubActividadRuta", idSubActRuta);

    if (tipo == "BMC") {
      form.append("evidencia", datos.archivoBMC[0]);
    } else if (tipo == "LEARN_STARTUP") {
      form.append("evidencia", datos.archivoLearnStartup[0]);
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

  return (
    <>
      <EtapaPensar showButton={false} />

      <>
        {pagina == 0 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Modelo de negocio
              </Breadcrumb.Item>
            </Breadcrumb>

            <div>
              <h1 style={{ fontWeight: "700" }}>Modelo de negocio</h1>
              <p className="mb-3">
                Un modelo de negocio es una representación lógica y estructurada
                de cómo una empresa planea generar ingresos, entregar valor a
                los clientes y obtener beneficios económicos de manera
                sostenible. En esencia, es una descripción detallada de cómo
                opera la empresa y cómo crea, entrega y captura valor en el
                mercado.
              </p>

              <p className="mb-3">
                Un modelo de negocio claro y bien estructurado es fundamental
                para el éxito de una empresa, ya que proporciona una hoja de
                ruta para la toma de decisiones estratégicas, la identificación
                de oportunidades y la mitigación de riesgos. Además, un modelo
                de negocio adaptable permite a la empresa evolucionar con el
                tiempo y mantenerse relevante en un entorno empresarial en
                constante cambio.
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
                  src="https://www.youtube.com/embed/XqMuc7-vRAQ"
                  title="Introducción al curso Ruta 3 - Plataforma virtual Sinapsis UAO"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ minHeight: "50vh" }}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">
                    Introducción al curso Ruta 3 - Plataforma virtual Sinapsis
                    UAO.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(6, () => setPagina(1))}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 1 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Business Model Canvas
              </Breadcrumb.Item>
            </Breadcrumb>

            <div>
              <h1 style={{ fontWeight: "700" }}>¿Qué es un BMC?</h1>
              <p className="mb-3">
                BMC son las siglas de "Business Model Canvas" o "lienzo del
                modelo de negocio" en español, que permite describir y diseñar
                de manera concisa el modelo de negocio de una empresa o proyecto
                emprendedor.
              </p>
              <p className="mb-3">
                El BMC es una herramienta versátil y ampliamente utilizada en el
                mundo del emprendimiento y los negocios. Permite a los
                emprendedores y equipos de trabajo visualizar de manera integral
                cómo funcionará su modelo de negocio y cómo se relacionan los
                diferentes elementos entre sí. Además, facilita la
                identificación de oportunidades de mejora y la toma de
                decisiones estratégicas informadas.
              </p>
            </div>

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
                src="https://www.youtube.com/embed/RztHv21Y1bI"
                title="Herramientas para analizar al cliente ► Mapa de Empatía"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">
                  Herramientas para analizar al cliente ► Mapa de Empatía.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(7, () => setPagina(2))}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 2 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Modelo de negocio
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Modelo de negocio</h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p className="mb-3">
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 className="mb-0">
              Formato Canvas y Herramienta BMC modelo de negocios
            </h3>
            <p className="mb-3">
              <br className="mb-3" />
              <a
                target="_blank"
                href="https://uao-my.sharepoint.com/:w:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/Pensar/6.%20Herramienta%20BMC%20-%20Modelo%20de%20negocios%20(3).docx?d=wf92a61064bbd44d1a690aaf176342bcc&csf=1&web=1&e=6mPjuX"
              >
                Descarga formato de herramienta BMC
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar el formato de herramienta BMC
                  diligenciado
                </p>

                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoBMC}
                    upFilesRejected={getArchivoBMCRejected}
                    files={datos?.archivoBMC}
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

                  {error.archivoBMC && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoBMC}
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
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Learn Startup
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Modelo de negocio</h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p className="mb-3">
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 className="mb-0">Learn Startup</h3>
            <p className="mb-3">
              <br className="mb-3" />
              <a
                target="_blank"
                href="https://uao-my.sharepoint.com/:p:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/Pensar/Desarrollo%20de%20productos.pptx?d=w454ea1582dda4ca4a1a533117a072d56&csf=1&web=1&e=L4eLMA"
              >
                Descarga formato de herramienta Learn Startup
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar el formato de herramienta Learn
                  Startup diligenciado
                </p>

                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoLearnStartup}
                    upFilesRejected={getArchivoLearnStartupRejected}
                    files={datos?.archivoLearnStartup}
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

                  {error.archivoLearnStartup && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoLearnStartup}
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

export default PensarPage;
