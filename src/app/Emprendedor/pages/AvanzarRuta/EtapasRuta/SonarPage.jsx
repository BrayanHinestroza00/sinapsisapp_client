import React, { useState } from "react";

import { Card } from "src/app/Shared/assets/styles/Common";
import DropZone from "src/app/Shared/components/DropZone/DropZone";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaSonar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Sonar";
import { useNavigate } from "react-router-dom";

function SonarPage() {
  const [pagina, setPagina] = useState(0);
  const navigate = useNavigate();

  const onClicSubirArchivo = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de perfil de emprendedor?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
        messageAlertWithoutText({
          title: "Herramienta entregada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
          onConfirm: () => {
            setPagina(4);
          },
        });
      },
    });
  };

  const onClicSubirArchivo2 = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de estructuración de idea?",
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
                stateButton: 1,
              },
            });
            // window.location.href = "/Emprendedor/Ruta/Avanzar";
          },
        });
      },
    });
  };

  return (
    <>
      {/* <Card className="mb-3">
        <div className="container d-flex justify-content-center">
          <figure
            className="d-flex align-items-center"
            style={{ width: "10%" }}
          >
            <img style={{ width: "100%" }} src={sonarIcon} />
          </figure>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column p-2">
              <h1 style={{ fontWeight: "900" }}>
                Ruta de Innovación y Emprendimiento: SOÑAR
              </h1>
              <p style={{ marginBottom: "1rem" }}>
                <b>1 mes - Etapa Soñar - 1 Sección</b>
              </p>

              <p style={{ maxWidth: "50vw" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

              <h2>Requisitos</h2>
              <ul>
                <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                  Registrar Primera Atención
                </li>
              </ul>

              <h2>Secciones</h2>
              <ul>
                <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                  Estructuración de la idea de negocio
                  <ul>
                    <li
                      style={{
                        listStyleType: "circle",
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Conectar y potencializar tu perfil como emprendedor
                    </li>
                    <li
                      style={{
                        listStyleType: "circle",
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Descubrirse como emprendedor
                    </li>
                    <li
                      style={{
                        listStyleType: "circle",
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Definirse como emprendedor
                    </li>
                    <li
                      style={{
                        listStyleType: "circle",
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Contenido educativo para estructuración de idea
                    </li>
                  </ul>
                </li>
              </ul>

              <button
                onClick={() => setIniciar(true)}
                className="btn btn-primary w-25"
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </Card> */}

      <EtapaSonar showButton={false} />

      <>
        {pagina == 0 && (
          <SeccionRuta>
            <h1 style={{ fontWeight: "700" }}>
              Sección 1: Estructuración de la idea de negocio{" "}
            </h1>

            <h2>
              Subsección 1: Conectar y potencializar tu perfil como emprendedor{" "}
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setPagina(1)}
            >
              Siguiente sección
            </button>
          </SeccionRuta>
        )}

        {pagina == 1 && (
          <SeccionRuta>
            <h1 style={{ fontWeight: "700" }}>
              Sección 1: Estructuración de la idea de negocio{" "}
            </h1>

            <h2>Subsección 2: Descubrirse como emprendedor</h2>

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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setPagina(2)}
            >
              Siguiente sección
            </button>
          </SeccionRuta>
        )}

        {pagina == 2 && (
          <SeccionRuta>
            <h1 style={{ fontWeight: "700" }}>
              Sección 1: Estructuración de la idea de negocio{" "}
            </h1>

            <h2>Subsección 3: Definirse como emprendedor </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <button
              type="button"
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setPagina(3)}
            >
              Siguiente sección
            </button>
          </SeccionRuta>
        )}

        {pagina == 3 && (
          <SeccionRuta>
            <h1 style={{ fontWeight: "700" }}>
              Sección 1: Estructuración de la idea de negocio{" "}
            </h1>

            <h2 className="mx-0">
              Subsección 4: Herramientas del conocimiento
            </h2>

            <p style={{ marginBottom: "1rem" }}>
              Las siguientes herramientas te ayudaran con la apropiación de los
              conceptos mencionados anteriormente
            </p>

            <h3 style={{ marginBottom: "1rem" }}>Perfil de Emprendedor</h3>
            <p style={{ marginBottom: "1rem" }}>
              Con la realización de este perfil le proponemos realizar acciones
              concretas para ayudarle a comprender mejor su potencial
              empresarial, fortalecer sus habilidades e impulsar sus proyectos
              de negocio.
              <br style={{ marginBottom: "1rem" }} />
              <a
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

            {/* <button
                className="btn btn-primary w-50 mt-5 mb-5"
                onClick={() => setPagina(0)}
              >
                Siguiente sección
              </button> */}
          </SeccionRuta>
        )}

        {pagina == 4 && (
          <SeccionRuta>
            <h1 style={{ fontWeight: "700" }}>
              Sección 1: Estructuración de la idea de negocio{" "}
            </h1>

            <h2>
              Subsección 5: Contenido educativo para estructuración de idea
            </h2>

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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            <>
              <h2 className="mx-0">Herramientas del conocimiento</h2>

              <p style={{ marginBottom: "1rem" }}>
                Las siguientes herramientas te ayudaran con la apropiación de
                los conceptos mencionados anteriormente
              </p>

              <h3 style={{ marginBottom: "1rem" }}>
                Plantilla estructuración de la idea
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Con la realización de esta plantilla le proponemos realizar
                acciones concretas para ayudarle a comprender mejor su potencial
                empresarial, fortalecer sus habilidades e impulsar sus proyectos
                de negocio.
                <br />
                <a
                  target="_blank"
                  href="https://uao-my.sharepoint.com/:x:/r/personal/djrestrepo_uao_edu_co/_layouts/15/Doc.aspx?sourcedoc=%7B73D97C66-042D-4408-A6E7-68E6325FA7C8%7D&file=3.%20Perfil%20del%20emprendedor%20Ruta%20de%20Innovaci%C3%B2n%20y%20Emprendimiento%20UAO.xlsm&action=default&mobileredirect=true"
                >
                  Descarga plantilla de estructuración de la idea
                </a>
              </p>

              <form>
                <div className="text-center">
                  <p>
                    A continuación, podrás cargar la plantilla de estructuración
                    de la idea diligenciada
                  </p>
                  <DropZone />
                  <button
                    type="button"
                    className="btn btn-primary mt-3 w-25"
                    onClick={() => onClicSubirArchivo2()}
                  >
                    Subir
                  </button>
                </div>
              </form>
            </>
          </SeccionRuta>
        )}
      </>
    </>
  );
}

export default SonarPage;
