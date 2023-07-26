import axios from "axios";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaTestear from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Testear";
// import ModeloModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Testear/ModeloModal";
// import MercadoModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Testear/MercadoModal";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import {
  HTTP_METHOD_POST,
  URL_CONTINUAR_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";
import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";
import { validacionesTestearPageModeloCanvas } from "src/app/Shared/services/validation/validateAvanceRuta";

function TestearPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  // const [showModalModelo, setShowModalModelo] = useState(false);
  // const [showModalMercados, setShowModalMercados] = useState(false);

  useEffect(() => {
    switch (state?.subActividadRutaId) {
      case 10:
        setPagina(0);
        break;
      case 11:
        setPagina(1);
        break;

      case 12:
        setPagina(2);
        break;

      case 13:
        setPagina(3);
        break;
      case 14:
        setPagina(3);
        break;

      case 15:
        setPagina(3);
        break;

      default:
        setPagina(0);
        break;
    }
  }, []);

  const onGetArchivoModeloCanvas = (archivoModeloCanvas) => {
    delete error.archivoModeloCanvas;
    setDatos({
      ...datos,
      archivoModeloCanvas,
    });
  };

  const getArchivoModeloCanvasRejected = (mensajeError) => {
    setError({ ...error, archivoModeloCanvas: mensajeError });
  };

  const onClicSubirArchivo = () => {
    let erroresFormulario = validacionesTestearPageModeloCanvas(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de modelo canvas?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(11, (response) => {
            if (response.code == 1 && response.message == "OK") {
              messageAlertWithoutText({
                title: "Herramienta entregada con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
                onConfirm: () => {
                  setPagina(2);
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

  const onContinueModelo = () => {
    setPagina(1);
  };

  const onContinueMercados = () => {
    setPagina(3);
    /**
     * Realizar proceso para notificar al mentor sobre asesoría especializada (Herramienta)
     */
  };

  const onContinuePrototipado = () => {
    /**
     * Realizar proceso para notificar al mentor sobre asesoría especializada (Herramienta)
     */

    messageAlert({
      title: "Completado con éxito",
      text: "Ahora debes esperar a que el responsable apruebe tus entregas y puedas avanzar a la siguiente etapa",
      icon: "success",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
        navigate("/Emprendedor/Ruta/Avanzar", {
          replace: true,
          state: {
            stateButton: 3,
            reload: true,
          },
        });
      },
    });
  };

  const onSubmitSubirArchivo = (idSubActRuta, onCallBack) => {
    const form = new FormData();

    form.append("idRutaProyecto", state?.rutaEmprendimientoId);
    form.append("idSubActividadRuta", idSubActRuta);
    form.append("evidencia", datos.archivoModeloCanvas[0]);

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
    if (idSubActRuta == 12 || idSubActRuta == 14) {
      const form = new FormData();

      form.append("idRutaProyecto", state?.rutaEmprendimientoId);
      form.append("idSubActividadRuta", idSubActRuta);

      axios({
        url: URL_CONTINUAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: form,
      }).then(() => {
        const form = new FormData();

        form.append("idRutaProyecto", state?.rutaEmprendimientoId);
        form.append("idSubActividadRuta", idSubActRuta + 1);

        axios({
          url: URL_CONTINUAR_AVANCE_RUTA,
          method: HTTP_METHOD_POST,
          data: form,
        }).then(() => {
          onCallBack();
        });
      });
    } else {
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
      <EtapaTestear showButton={false} />

      <>
        {pagina == 0 && (
          <>
            <SeccionRuta>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Testear</Breadcrumb.Item>
                <Breadcrumb.Item active href="#">
                  Mejorando mi modelo de negocio
                </Breadcrumb.Item>
              </Breadcrumb>

              <h1 style={{ fontWeight: "700" }}>
                Mejorando mi modelo de negocio
              </h1>

              <div>
                <h2>Canales</h2>
                <p>
                  Mejorar los canales en tu modelo de negocio es un paso crucial
                  para maximizar el alcance y la eficacia de tu propuesta de
                  valor hacia tus clientes. Los canales representan los medios a
                  través de los cuales entregas tu producto o servicio y te
                  conectas con tu audiencia. Mejorar los canales en tu modelo de
                  negocio implica estar constantemente atento a las tendencias
                  del mercado y a las preferencias de tus clientes. Mantén una
                  mentalidad abierta a la innovación y la experimentación para
                  adaptarte a los cambios y asegurar el crecimiento sostenible
                  de tu negocio.
                </p>

                <br />

                <div
                  className="card mx-auto"
                  style={{
                    width: "50vw",
                    backgroundColor: "#999",
                    color: "#FFF",
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/lofMcS_sahw"
                    title="Canales en tu modelo de negocio"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ minHeight: "50vh" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Canales en tu modelo de negocio.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-50 mt-3 mb-3"
                onClick={() => onClickContinuar(10, () => onContinueModelo())}
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {pagina == 1 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Testear</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Mejorando mi modelo de negocio
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>
              Mejorando mi modelo de negocio
            </h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p className="mb-3">
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 className="mb-3">Modelo CANVAS</h3>
            <p className="mb-3">
              <a
                className="d-block"
                target="_blank"
                href="https://uao-my.sharepoint.com/:x:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/Testear/6.1%20Modelo%20Canvas.xlsx?d=wa2ea03a1ebee4c618075f4558261f2cf&csf=1&web=1&e=bsTVWv"
              >
                Descarga plantilla de modelo CANVAS
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar la plantilla del modelo CANVAS
                  diligenciada.
                </p>

                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoModeloCanvas}
                    upFilesRejected={getArchivoModeloCanvasRejected}
                    files={datos?.archivoModeloCanvas}
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

                  {error.archivoModeloCanvas && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoModeloCanvas}
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

        {pagina == 2 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Testear</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Estudio de mercado
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Estudio de Mercado</h1>
            <p className="mb-3">
              El estudio de mercado es una investigación exhaustiva y
              sistemática que se realiza para recopilar y analizar información
              relevante sobre un determinado mercado o industria. El objetivo
              principal del estudio de mercado es comprender mejor las
              características, necesidades, preferencias y comportamientos de
              los clientes potenciales, así como evaluar la viabilidad y
              oportunidades para un producto o servicio en particular.
            </p>

            <p className="mb-3">
              El estudio de mercado es esencial para minimizar los riesgos y
              aumentar las posibilidades de éxito en el lanzamiento de un nuevo
              producto o servicio. Proporciona información valiosa que permite
              tomar decisiones estratégicas fundamentadas y adaptar la oferta a
              las necesidades del mercado objetivo. Además, el estudio de
              mercado es un proceso continuo, ya que el mercado y las
              preferencias de los clientes están en constante cambio, por lo que
              mantenerse actualizado es clave para la competitividad y el
              crecimiento sostenible de una empresa.
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
                src="https://www.youtube.com/embed/sp5d-XmrXtY"
                title="Taller Estudio de Mercado"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">Taller Estudio de Mercado</p>
              </div>
            </div>

            <hr className="my-5" />

            <div>
              <h1 style={{ fontWeight: "700" }}>La competencia</h1>

              <p className="mb-3">
                La competencia en los emprendimientos se refiere a la presencia
                de otros negocios o empresas que ofrecen productos o servicios
                similares o alternativos al mismo mercado objetivo. Es decir,
                son todas aquellas empresas que están compitiendo por atraer y
                satisfacer a los mismos clientes o audiencia a la que tu
                emprendimiento también busca llegar.{" "}
              </p>

              <p className="mb-3">
                El análisis de la competencia es una parte crucial del proceso
                emprendedor, ya que proporciona una visión clara del panorama
                del mercado y de qué otras opciones existen para los clientes.
              </p>

              <p className="mb-3">
                La competencia en los emprendimientos puede ser desafiante, pero
                también es una fuente de motivación y crecimiento. Un análisis
                profundo y estratégico de tus competidores te ayudará a tomar
                decisiones más informadas y a desarrollar una estrategia sólida
                para destacar en el mercado.
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
                  src="https://www.youtube.com/embed/5NmWHHAKEK4"
                  title="Estudio del mercado ► LA COMPETENCIA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ minHeight: "50vh" }}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">
                    Estudio del mercado ► LA COMPETENCIA
                  </p>
                </div>
              </div>
            </div>
            <br />

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() => onClickContinuar(12, () => onContinueMercados())}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {pagina == 3 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Testear</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Prototipado o validación
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Prototipado o validación</h1>

            <p className="mb-3">
              El prototipado o validación es un proceso esencial en el
              desarrollo de un producto o servicio dentro de un emprendimiento.
              Consiste en crear versiones iniciales o modelos funcionales de la
              idea para probar y validar su viabilidad, funcionalidad y
              aceptación en el mercado antes de realizar una inversión completa
              en su desarrollo.
            </p>

            <p className="mb-3">
              El objetivo del prototipado o validación es obtener
              retroalimentación temprana de potenciales clientes, usuarios o
              expertos, con el fin de identificar posibles mejoras, solucionar
              problemas y asegurarse de que el producto o servicio cumpla con
              las expectativas y necesidades del mercado.
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
                src="https://www.youtube.com/embed/3EEUj3lpP2k"
                title="¡Diseña tu prototipo!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "50vh" }}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">¡Diseña tu prototipo!</p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-3 mb-3"
              onClick={() =>
                onClickContinuar(14, () => onContinuePrototipado())
              }
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}
      </>
    </>
  );
}

export default TestearPage;
