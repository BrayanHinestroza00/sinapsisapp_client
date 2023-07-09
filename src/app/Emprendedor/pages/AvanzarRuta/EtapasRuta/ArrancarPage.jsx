import axios from "axios";
import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import DropZone from "src/app/Shared/components/DropZone/DropZone";
import SeccionRuta from "../../../components/Ruta/AvanzarRuta/Common/seccion";
import EtapaArrancar from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Common/etapa_ruta/Arrancar";

import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import FinancieraModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Arrancar/FinancieraModal";
import ComercialModal from "src/app/Emprendedor/components/Ruta/AvanzarRuta/Arrancar/ComercialModal";
import { HTTP_METHOD_POST } from "src/app/Shared/utils/apiConstants";

function ArrancarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pagina, setPagina] = useState(0);
  const [showModalFinanciera, setShowModalFinanciera] = useState(false);
  const [showModalComercial, setShowModalComercial] = useState(false);

  useEffect(() => {
    switch (state?.subActividadRutaId) {
      case 15:
        setPagina(0);
        break;
      case 16:
        setPagina(1);
        break;

      case 17:
        setPagina(1);
        break;

      case 18:
        setPagina(2);
        break;

      default:
        setPagina(0);
        break;
    }
  }, []);

  const onClicSubirArchivo = () => {
    messageAlertWithoutText({
      title:
        "¿Estás seguro que deseas entregar la herramienta de Diagnóstico plan de acción?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      onConfirm: () => {
        onClickContinuar(18, () => {
          messageAlert({
            title: "Herramienta entregada con éxito",
            text: "Ahora debes esperar a que el responsable apruebe tus entregas y puedas avanzar a la siguiente etapa",
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
        });
      },
    });
  };

  const onContinueFinanciera = () => {
    setShowModalFinanciera(false);
    setPagina(1);
    /**
     * Realizar proceso para notificar al mentor sobre asesoria especializada (Herramienta)
     */
  };

  const onContinueComercial = () => {
    setShowModalComercial(false);
    setPagina(2);
  };

  const onClickContinuar = (idSubActRuta, onCallBack) => {
    if (idSubActRuta == 15) {
      axios({
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/continuar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: state.rutaEmprendimientoId,
          idSubActividadRuta: idSubActRuta,
        },
      }).then(() => {
        axios({
          url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/continuar",
          method: HTTP_METHOD_POST,
          data: {
            idRutaProyecto: state.rutaEmprendimientoId,
            idSubActividadRuta: idSubActRuta + 1,
          },
        }).then(() => {
          onCallBack();
        });
      });
    } else {
      axios({
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/continuar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: state.rutaEmprendimientoId,
          idSubActividadRuta: idSubActRuta,
        },
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

              <div>
                <h2>Finanzas Básicas</h2>

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
                className="btn btn-primary w-50 mt-5 mb-5"
                onClick={() => setShowModalFinanciera(true)}
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {showModalFinanciera && (
          <FinancieraModal
            show={showModalFinanciera}
            onHide={() => setShowModalFinanciera(false)}
            onContinue={() =>
              onClickContinuar(15, () => onContinueFinanciera())
            }
          />
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

              <div>
                <h2>Marketing Digital</h2>

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
                className="btn btn-primary w-50 mt-5 mb-5"
                onClick={() => setShowModalComercial(true)}
              >
                Continuar ...
              </button>
            </SeccionRuta>
          </>
        )}

        {showModalComercial && (
          <ComercialModal
            show={showModalComercial}
            onHide={() => setShowModalComercial(false)}
            onContinue={() => onClickContinuar(17, () => onContinueComercial())}
          />
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
              Las siguientes herramientas te ayudaran con la apropiación de los
              conceptos mencionados anteriormente
            </p>

            <h3 style={{ marginBottom: "1rem" }}>Diagnóstico plan de acción</h3>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis at elit non scelerisque. Aliquam volutpat odio non
              rhoncus blandit.
              <br />
              <a
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
                  plan de acción diligenciada
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

export default ArrancarPage;
