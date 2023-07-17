import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import DropZone from "src/app/Shared/components/DropZone/DropZone";
import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaSonar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Sonar";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import PerfilModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Soñar/PerfilModal";
import EstructuracionModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Soñar/EstructuracionModal";
import {
  HTTP_METHOD_POST,
  URL_CONTINUAR_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";

function SonarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const [showModalEstructuracion, setShowModalEstructuracion] = useState(false);

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

  const onClicSubirArchivo = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de perfil de emprendedor?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
        onClickContinuar(3, () => {
          messageAlertWithoutText({
            title: "Herramienta entregada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
            onConfirm: () => {
              setPagina(3);
            },
          });
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
        onClickContinuar(5, () => {
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
                  reload: true,
                },
              });
              // window.location.href = "/Emprendedor/Ruta/Avanzar";
            },
          });
        });
      },
    });
  };

  const onClickContinuar = (idSubActRuta, onCallBack) => {
    if (state != null) {
      axios({
        url: URL_CONTINUAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: state?.rutaEmprendimientoId,
          idSubActividadRuta: idSubActRuta,
        },
      }).then(() => {
        onCallBack();
      });
    }
  };

  const onContinuePerfil = () => {
    setShowModalPerfil(false);
    setPagina(1);
  };

  const onContinueEstructuracion = () => {
    setShowModalEstructuracion(false);
    setPagina(4);
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

            <p>
              Conceptos de emprendimiento e innovación, las alternativas que
              existen para emprender e innovar, así como las habilidades y
              herramientas que se necesitan para tener procesos más efectivos.
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
                  Introducción al curso Ruta 0 - Plataforma virtual Sinapsis
                  UAO.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setShowModalPerfil(true)}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {showModalPerfil && (
          <PerfilModal
            show={showModalPerfil}
            onHide={() => setShowModalPerfil(false)}
            onContinue={() => onClickContinuar(1, () => onContinuePerfil())}
          />
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
              className="btn btn-primary w-50 mt-5 mb-5"
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

            <h3 className="mx-0">Herramientas del conocimiento</h3>

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

            <h2>CONCEPTO DE EMPRESA</h2>

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
              className="btn btn-primary w-50 mt-5 mb-5"
              onClick={() => setShowModalEstructuracion(true)}
            >
              Continuar ...
            </button>
          </SeccionRuta>
        )}

        {showModalEstructuracion && (
          <EstructuracionModal
            show={showModalEstructuracion}
            onHide={() => setShowModalEstructuracion(false)}
            onContinue={() =>
              onClickContinuar(4, () => onContinueEstructuracion())
            }
          />
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

            <p style={{ marginBottom: "1rem" }}>
              Las siguientes herramientas te ayudaran con la apropiación de los
              conceptos mencionados anteriormente
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
                href="https://uao-my.sharepoint.com/:w:/r/personal/djrestrepo_uao_edu_co/Documents/CI%26E/SINAPSIS%202023/CIES-7.3-16%20INFORMES%20RUTA%20DE%20INNOVACI%C3%93N/CIES-7.3-16-20%20Informes%20de%20Consejer%C3%ADa/RUTA%20DE%20INNOVACI%C3%93N%20Y%20EMPRENDIMIENTO/Herramientas%20Etapas/So%C3%B1ar/ESTRUCTURA%20IDEA%20DE%20NEGOCIO.docx?d=w637c518d78a84e259c0dfb980a5616d3&csf=1&web=1&e=KzZHX8"
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
          </SeccionRuta>
        )}
      </>
    </>
  );
}

export default SonarPage;
