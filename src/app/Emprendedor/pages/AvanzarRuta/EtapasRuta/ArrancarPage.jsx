import axios from "axios";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaArrancar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Arrancar";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
// import FinancieraModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Arrancar/FinancieraModal";
// import ComercialModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Arrancar/ComercialModal";
import {
  HTTP_METHOD_POST,
  URL_CONTINUAR_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";
import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";
import { validacionesArrancarPagePlanAccion } from "src/app/Shared/services/validation/validateAvanceRuta";

function ArrancarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  // const [showModalFinanciera, setShowModalFinanciera] = useState(false);
  // const [showModalComercial, setShowModalComercial] = useState(false);

  useEffect(() => {
    switch (state?.subActividadRutaId) {
      case 16:
        setPagina(0);
        break;
      case 17:
        setPagina(1);
        break;

      case 18:
        setPagina(1);
        break;

      case 19:
        setPagina(2);
        break;

      default:
        setPagina(0);
        break;
    }
  }, []);

  const onGetArchivoPlanAccion = (archivoPlanAccion) => {
    delete error.archivoPlanAccion;
    setDatos({
      ...datos,
      archivoPlanAccion,
    });
  };

  const getArchivoPlanAccionRejected = (mensajeError) => {
    setError({ ...error, archivoPlanAccion: mensajeError });
  };

  const onClicSubirArchivo = () => {
    let erroresFormulario = validacionesArrancarPagePlanAccion(datos, error);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      messageAlertWithoutText({
        title:
          "¿Estás seguro que deseas entregar la herramienta de Diagnóstico plan de acción?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          onSubmitSubirArchivo(19, (response) => {
            if (response.code == 1 && response.message == "OK") {
              messageAlert({
                title: "Herramienta entregada con éxito",
                text: "Ahora debes esperar a que el responsable apruebe tus entregas y puedas finalizar la ruta de innovación y emprendimiento",
                icon: "success",
                confirmButtonText: "Aceptar",
                onConfirm: () => {
                  navigate("/Emprendedor/Ruta/Avanzar", {
                    replace: true,
                    state: {
                      stateButton: 4,
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

  const onContinueFinanciera = () => {
    setPagina(1);
    /**
     * Realizar proceso para notificar al mentor sobre asesoria especializada (Herramienta)
     */
  };

  const onContinueComercial = () => {
    setPagina(2);
  };

  const onSubmitSubirArchivo = (idSubActRuta, onCallBack) => {
    const form = new FormData();

    form.append("idRutaProyecto", state?.rutaEmprendimientoId);
    form.append("idSubActividadRuta", idSubActRuta);
    form.append("evidencia", datos.archivoPlanAccion[0]);

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
    if (idSubActRuta == 16) {
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
      <EtapaArrancar showButton={false} />

      <>
        {pagina == 0 && (
          <>
            <SeccionRuta>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Arrancar</Breadcrumb.Item>
                <Breadcrumb.Item active href="#">
                  Estructuración financiera
                </Breadcrumb.Item>
              </Breadcrumb>

              <h1 style={{ fontWeight: "700" }}>Estructuración financiera</h1>

              <p className="mb-3">
                La estructuración financiera es un proceso clave en el ámbito
                empresarial que se refiere a la planificación y organización de
                la composición de los recursos financieros de una empresa.
                Implica tomar decisiones estratégicas sobre cómo se financiará
                el negocio, cómo se administrarán los recursos y cómo se
                utilizarán para alcanzar los objetivos financieros y operativos
                de la empresa.
              </p>

              <p className="mb-3">
                La estructuración financiera adecuada es fundamental para el
                éxito y la sostenibilidad de una empresa. Un enfoque estratégico
                en la toma de decisiones financieras permite maximizar la
                eficiencia en el uso de los recursos, minimizar los riesgos y
                aprovechar oportunidades para el crecimiento y desarrollo
                empresarial. Además, una estructura financiera sólida es
                atractiva para inversores y socios potenciales, lo que puede
                facilitar la obtención de financiamiento y el crecimiento de la
                empresa.
              </p>

              <div>
                <h2>Finanzas Básicas</h2>

                <p className="mb-3">
                  Las finanzas básicas se refieren a los conceptos y principios
                  fundamentales que son esenciales para comprender y administrar
                  adecuadamente los aspectos financieros de una persona, empresa
                  o emprendimiento. Estos conceptos son fundamentales para tomar
                  decisiones financieras informadas y mantener una salud
                  financiera sólida.
                </p>

                <p className="mb-3">
                  El dominio de las finanzas básicas es fundamental tanto para
                  individuos como para empresas. Proporciona una base sólida
                  para tomar decisiones financieras acertadas, alcanzar metas
                  financieras, mantener la estabilidad económica y prepararse
                  para enfrentar desafíos financieros con confianza. Además,
                  estas habilidades financieras básicas son esenciales para una
                  gestión efectiva y exitosa de un emprendimiento.
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
                    src="https://www.youtube.com/embed/cmCcG-NIfdE"
                    title="Taller Finanzas Básicas"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ minHeight: "50vh" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">Taller Finanzas Básicas.</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-50 mt-3 mb-3"
                onClick={() =>
                  onClickContinuar(16, () => onContinueFinanciera())
                }
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {pagina == 1 && (
          <>
            <SeccionRuta>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Arrancar</Breadcrumb.Item>
                <Breadcrumb.Item active href="#">
                  Comercialización
                </Breadcrumb.Item>
              </Breadcrumb>

              <h1 style={{ fontWeight: "700" }}>Comercialización</h1>

              <p className="mb-3">
                La comercialización, también conocida como marketing, es un
                conjunto de estrategias y acciones que se utilizan para promover
                y vender productos o servicios a los clientes. Es un elemento
                fundamental en cualquier empresa o emprendimiento, ya que ayuda
                a posicionar la marca, llegar a nuevos clientes y mantener una
                base de clientes leales. La comercialización busca generar
                demanda y satisfacer las necesidades del mercado mediante
                diversas técnicas y herramientas.
              </p>

              <p className="mb-3">
                Una estrategia de comercialización sólida puede impulsar el
                crecimiento y el éxito de una empresa o emprendimiento, mientras
                que una comercialización inadecuada puede afectar negativamente
                las ventas y la percepción de la marca en el mercado.
              </p>

              <div>
                <h2>Marketing Digital</h2>

                <p className="mb-3">
                  El marketing digital es una disciplina del marketing que
                  utiliza plataformas y herramientas digitales para promocionar
                  productos, servicios o marcas a través de Internet y
                  dispositivos electrónicos. Esta forma de comercialización se
                  ha vuelto cada vez más relevante en la era digital, ya que
                  permite llegar a una amplia audiencia de forma rápida,
                  efectiva y medible.
                </p>

                <p className="mb-3">
                  Ofrece ventajas significativas sobre los métodos tradicionales
                  de comercialización, ya que permite una mayor personalización,
                  segmentación precisa, medición de resultados y un alcance
                  global. Es una herramienta esencial para cualquier empresa o
                  emprendimiento que desee tener éxito en un mundo cada vez más
                  conectado y digitalizado.
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
                    src="https://www.youtube.com/embed/zDoWPLQzo1Q"
                    title="Taller Marketing de Contenidos Digitales"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ minHeight: "50vh" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Taller Marketing de Contenidos Digitales.
                    </p>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div>
                <h2>Presentación del Negocio</h2>
                <p className="mb-3">
                  La presentación del negocio es una exposición formal en la que
                  se describen y comunican los aspectos más importantes de una
                  empresa o emprendimiento a una audiencia específica. El
                  objetivo de esta presentación es captar el interés de
                  inversores, socios potenciales, clientes o cualquier otra
                  persona interesada en conocer más sobre la empresa. Una
                  presentación efectiva del negocio debe ser clara, concisa y
                  persuasiva, transmitiendo la propuesta de valor y el potencial
                  del negocio de manera convincente.
                </p>

                <p className="mb-3">
                  Es una oportunidad única para generar interés y confianza en
                  tu empresa o emprendimiento. Es importante practicar y
                  perfeccionar la presentación para transmitir la información de
                  manera clara y segura. Una presentación bien elaborada puede
                  abrir puertas y ser el punto de partida para el éxito de tu
                  negocio.
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
                    src="https://www.youtube.com/embed/fTcm-k_bZW4"
                    title="Taller presentaciones efectivas"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ minHeight: "50vh" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Taller presentaciones efectivas.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-50 mt-3 mb-3"
                onClick={() =>
                  onClickContinuar(18, () => onContinueComercial())
                }
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {pagina == 2 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Arrancar</Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Comercialización
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>Comercialización</h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p style={{ marginBottom: "1rem" }}>
              Las siguientes herramientas te ayudarán con la apropiación de los
              conceptos mencionados anteriormente.
            </p>

            <h3 style={{ marginBottom: "1rem" }}>Diagnóstico plan de acción</h3>
            <p style={{ marginBottom: "1rem" }}>
              <a
                className="d-block"
                target="_blank"
                href="https://uao-my.sharepoint.com/:w:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/Arrancar/2B.%20Diagnostico%20-%20plan%20de%20accion.docx?d=w6552c4e3c7ba47419b66e020a7924b6c&csf=1&web=1&e=BcJtBn"
              >
                Descarga plantilla de diagnóstico de plan de acción
              </a>
            </p>

            <form>
              <div className="text-center">
                <p>
                  A continuación, podrás cargar la plantilla del diagnóstico de
                  plan de acción diligenciada.
                </p>

                <div>
                  <DropZoneComponent
                    className="mb-2"
                    upFiles={onGetArchivoPlanAccion}
                    upFilesRejected={getArchivoPlanAccionRejected}
                    files={datos?.archivoPlanAccion}
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

                  {error.archivoPlanAccion && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.archivoPlanAccion}
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
      </>
    </>
  );
}

export default ArrancarPage;
