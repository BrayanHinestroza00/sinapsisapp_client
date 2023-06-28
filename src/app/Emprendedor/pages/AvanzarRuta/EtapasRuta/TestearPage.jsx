import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DropZone from "src/app/Shared/components/DropZone/DropZone";
import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaTestear from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Testear";
import ModeloModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Testear/ModeloModal";
import MercadoModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Testear/MercadoModal";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function TestearPage() {
  const navigate = useNavigate();

  const [pagina, setPagina] = useState(0);
  const [showModalModelo, setShowModalModelo] = useState(false);
  const [showModalMercados, setShowModalMercados] = useState(false);

  const onClicSubirArchivo = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de modelo canvas?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
        messageAlertWithoutText({
          title: "Herramienta entregada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
          onConfirm: () => {
            setPagina(2);
          },
        });
      },
    });
  };

  const onContinueModelo = () => {
    setShowModalModelo(false);
    setPagina(1);
  };

  const onContinueMercados = () => {
    setShowModalMercados(false);
    setPagina(3);
    /**
     * Realizar proceso para notificar al mentor sobre asesoria especializada (Herramienta)
     */
  };

  const onContinuePrototipado = () => {
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
          },
        });
        // window.location.href = "/Emprendedor/Ruta/Avanzar";
      },
    });
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
                <h2>Modelo de negocio</h2>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  facilisis at elit non scelerisque. Aliquam volutpat odio non
                  rhoncus blandit.
                </p>

                <h3>CAPSULA INFORMATIVA</h3>

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
              <br />
              <hr />
              <div>
                <h2>Canales</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  facilisis at elit non scelerisque. Aliquam volutpat odio non
                  rhoncus blandit.
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
                className="btn btn-primary w-50 mt-5 mb-5"
                onClick={() => setShowModalModelo(true)}
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {showModalModelo && (
          <ModeloModal
            show={showModalModelo}
            onHide={() => setShowModalModelo(false)}
            onContinue={() => onContinueModelo()}
          />
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

            <p style={{ marginBottom: "1rem" }}>
              Las siguientes herramientas te ayudaran con la apropiación de los
              conceptos mencionados anteriormente
            </p>

            <h3 style={{ marginBottom: "1rem" }}>Modelo CANVAS</h3>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit.
              <br />
              <a
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
                  diligenciada
                </p>
                <DropZone />
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Donec facilisis at elit non scelerisque. Aliquam
              volutpat odio non rhoncus blandit.
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
            <br />
            <hr />
            <br />

            <div>
              <h2>La competencia</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit.
              </p>

              <h3>CAPSULA INFORMATIVA</h3>
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
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setShowModalMercados(true)}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {showModalMercados && (
          <MercadoModal
            show={showModalMercados}
            onHide={() => setShowModalMercados(false)}
            onContinue={() => onContinueMercados()}
          />
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

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Donec facilisis at elit non scelerisque. Aliquam
              volutpat odio non rhoncus blandit.
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
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => onContinuePrototipado()}
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
