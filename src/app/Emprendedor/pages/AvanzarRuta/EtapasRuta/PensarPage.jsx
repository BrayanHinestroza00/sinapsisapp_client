import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import EtapaPensar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Pensar";
import SeccionRuta from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/seccion";
import BMCModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Pensar/BMCModal";
import ModeloModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Pensar/ModeloModal";
import DropZone from "src/app/Shared/components/DropZone/DropZone";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function PensarPage() {
  const navigate = useNavigate();

  const [pagina, setPagina] = useState(1);
  const [showModalModelo, setShowModalModelo] = useState(false);
  const [showModalBMC, setShowModalBMC] = useState(false);

  const onClicSubirArchivo = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de Formato Canvas y Herramienta BMC?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
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
              },
            });
          },
        });
      },
    });
  };

  const onContinueModelo = () => {
    setShowModalModelo(false);
    setPagina(1);
  };

  const onContinueBMC = () => {
    setShowModalBMC(false);
    setPagina(2);
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
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>CANVAS DE MODELO DE NEGOCIO</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
              sodales quis quam. Donec rhoncus eleifend erat, in consequat ante
              tincidunt eu. Vestibulum et gravida leo. Nam elit quam, consequat
              nec tincidunt in, luctus et mi. Nunc at tincidunt turpis.
            </p>

            <div>
              <h3>Modelo de negocio</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
                sodales quis quam. Donec rhoncus eleifend erat, in consequat
                ante tincidunt eu. Vestibulum et gravida leo. Nam elit quam,
                consequat nec tincidunt in, luctus et mi. Nunc at tincidunt
                turpis.
              </p>
              <br />

              <div>
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
            </div>

            <div>
              <h3>Que es un BMC (Características, Ventajas)</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
                sodales quis quam. Donec rhoncus eleifend erat, in consequat
                ante tincidunt eu. Vestibulum et gravida leo. Nam elit quam,
                consequat nec tincidunt in, luctus et mi. Nunc at tincidunt
                turpis.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
                sodales quis quam. Donec rhoncus eleifend erat, in consequat
                ante tincidunt eu. Vestibulum et gravida leo. Nam elit quam,
                consequat nec tincidunt in, luctus et mi. Nunc at tincidunt
                turpis.
              </p>
            </div>

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
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setShowModalModelo(true)}
            >
              Continuar ...
            </button>
          </SeccionRuta>
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
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                CANVAS DE MODELO DE NEGOCIO
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1 style={{ fontWeight: "700" }}>CANVAS DE MODELO DE NEGOCIO</h1>

            <div>
              <h3>Que es un BMC (Características, Ventajas)</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
                sodales quis quam. Donec rhoncus eleifend erat, in consequat
                ante tincidunt eu. Vestibulum et gravida leo. Nam elit quam,
                consequat nec tincidunt in, luctus et mi. Nunc at tincidunt
                turpis.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis at elit non scelerisque. Aliquam volutpat odio non
                rhoncus blandit. Cras elit sapien, scelerisque in fermentum et,
                sodales quis quam. Donec rhoncus eleifend erat, in consequat
                ante tincidunt eu. Vestibulum et gravida leo. Nam elit quam,
                consequat nec tincidunt in, luctus et mi. Nunc at tincidunt
                turpis.
              </p>

              <div className="d-flex justify-content-around">
                <div>
                  <h4>Ventajas</h4>
                  <ul>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4>Desventajas</h4>
                  <ul>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li
                      style={{ listStyleType: "square", marginBottom: "1rem" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setShowModalBMC(true)}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {showModalBMC && (
          <BMCModal
            show={showModalBMC}
            onHide={() => setShowModalBMC(false)}
            onContinue={() => onContinueBMC()}
          />
        )}

        {pagina == 2 && (
          <SeccionRuta>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pensar</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Mi primer modelo de negocio
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                CANVAS DE MODELO DE NEGOCIO
              </Breadcrumb.Item>
            </Breadcrumb>

            <h1 style={{ fontWeight: "700" }}>CANVAS DE MODELO DE NEGOCIO</h1>

            <h3 className="mx-0">Herramientas del conocimiento</h3>

            <p style={{ marginBottom: "1rem" }}>
              Las siguientes herramientas te ayudaran con la apropiación de los
              conceptos mencionados anteriormente
            </p>

            <h3 style={{ marginBottom: "1rem" }}>
              Formato Canvas y Herramienta BMC modelo de negocios
            </h3>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit.
              <br style={{ marginBottom: "1rem" }} />
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
      </>
    </>
  );
}

export default PensarPage;
