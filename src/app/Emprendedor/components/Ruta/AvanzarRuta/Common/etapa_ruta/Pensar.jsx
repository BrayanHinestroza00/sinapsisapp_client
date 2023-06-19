import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "src/app/Shared/assets/styles/Common";

import pensarIcon from "src/app/Shared/assets/images/ruta_icons/pensar_icon.png";

function EtapaPensar({ showButton, stateButton }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Card className="mb-3">
      <div className="container d-flex justify-content-center">
        <figure
          className="d-flex align-items-center"
          style={{ width: "10%", marginRight: "2rem" }}
        >
          <img style={{ width: "100%" }} src={pensarIcon} />
        </figure>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column p-2">
            <h1 style={{ fontWeight: "900" }}>
              Ruta de Innovación y Emprendimiento: PENSAR
            </h1>
            <p style={{ marginBottom: "1rem" }}>
              <b>4 semanas - Etapa pensar - 1 Sección</b>
            </p>

            <p style={{ maxWidth: "50vw" }}>
              En esta fase el emprendedor UAO tiene como objetivo Estructurar la
              Idea de Negocio reconociendo el entorno, clientes potenciales y
              propuesta de valor.
            </p>

            <p style={{ maxWidth: "50vw" }}>
              En esta etapa el emprendedor tiene la capacidad de analizar si su
              idea de emprendimiento es viable y soluciona una problemática
              real.
            </p>

            {showButton && (
              <>
                <h2>Objetivos</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Facilitar la apropiación tecnológica para el emprendimiento
                    y la innovación.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Ayudar el emprendedor a evaluar la viabilidad de su
                    proyecto.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Apoyar al emprendedor a estructurar su modelo de negocios.
                  </li>
                </ul>
              </>
            )}

            <h2>Resultados / Entregables</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Primer modelo de negocios.
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Validación del modelo de negocios.
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
                    Taller "Generando mi primer modelo de negocios"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Validando mi modelo y proyecto de negocios"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Presentaciones efectivas"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Creatividad e innovación"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Liderazgo para la innovación"
                  </li>
                </ul>

                <h2>Acompañamiento</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Acompañamiento con Expertos (Individual - Grupal).
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
                    Herramienta BMC - Modelo de negocios
                  </li>
                </ul>
              </>
            )}

            {showButton && (
              <button
                onClick={() => navigate("/Emprendedor/Ruta/Avanzar/Pensar")}
                className="btn btn-primary w-25"
                disabled={state?.stateButton == 2}
              >
                {state?.stateButton == 2 ? "En revision" : "Iniciar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EtapaPensar;
