import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "src/app/Shared/assets/styles/Common";

import testearIcon from "src/app/Shared/assets/images/ruta_icons/testear_icon.png";

function EtapaTestear({ showButton, stateButton, lastActivity }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Card className="mb-3">
      <div className="container d-flex justify-content-center">
        <figure
          className="d-flex align-items-center"
          style={{ width: "10%", marginRight: "2rem" }}
        >
          <img style={{ width: "100%" }} src={testearIcon} />
        </figure>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column p-2">
            <h1 style={{ fontWeight: "900" }}>
              Ruta de Innovación y Emprendimiento: TESTEAR
            </h1>
            <p style={{ marginBottom: "1rem" }}>
              <b>12 semanas - Etapa testear - 3 Sección</b>
            </p>

            <p style={{ maxWidth: "50vw" }}>
              En esta fase el emprendedor UAO tiene como objetivo realizar las
              validaciones de su producto o servicio con su publico objetivo e
              identificar la viabilidad del proyecto.
            </p>

            <p style={{ maxWidth: "50vw" }}>
              El emprendedor aprende a manejar herramientas de prototipado y
              validación para la toma de decisiones.
            </p>

            {showButton && (
              <>
                <h2>Objetivos</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Fortalecer procesos de experimentación/ prototipado para el
                    emprendimiento y la innovación.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Apoyar al emprendedor a testear el mercado y definirsu
                    segmento de clientes – validación de hipótesis.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Apoyar la estructuración del plan de negocios desde un
                    enfoque de innovación.
                  </li>
                </ul>
              </>
            )}

            <h2>Resultados / Entregables</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Prototipo o producto mínimo viable.
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Plan de negocios.
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Estrategia de creación.
              </li>
            </ul>

            {showButton && (
              <>
                <h2>Formación</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Conferencias de empresarios / emprendedores / experto.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Conferencias en tendencias de mercado / tecnología.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Socialización de resultados de investigación aplicada.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Presentación de convocatorios y concursos del ecosistema.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "BMG (2) - Test concepto"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Gestión contable e impuestos 1"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller de prototipado.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Estrategia financiera 1"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Planificación general y plan de negocios"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Estudio de mercado emprender"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Gestión de operaciones y recursos"
                  </li>
                </ul>

                <h2>Acompañamiento</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Acompañamiento con expertos (Individual - Grupal).
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Coaching para emprendedores (Individual - Grupal)
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Codesarrollo.
                  </li>
                </ul>

                <h2>Herramientas</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Modelo Canvas
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Asesoría especializada (Guía para desarrollo de un estudio
                    de mercado)
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "2rem" }}>
                    Asesoría especializada (Prototipo o validación)
                  </li>
                </ul>
              </>
            )}

            {showButton && (
              <button
                onClick={() =>
                  navigate("/Emprendedor/Ruta/Avanzar/Testear", {
                    state: lastActivity,
                  })
                }
                className="btn btn-primary w-25"
                disabled={stateButton == 1}
              >
                {stateButton == 1
                  ? "En revisión"
                  : stateButton == 0
                  ? "Iniciar"
                  : "Continuar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EtapaTestear;
