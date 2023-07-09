import { Card } from "src/app/Shared/assets/styles/Common";

import sonarIcon from "src/app/Shared/assets/images/ruta_icons/sonar_icon.png";

function EtapaSonar({ showButton, stateButton, lastActivity, onIniciar }) {
  return (
    <Card className="mb-3">
      <div className="container d-flex justify-content-center">
        <figure
          className="d-flex align-items-center"
          style={{ width: "10%", marginRight: "2rem" }}
        >
          <img style={{ width: "100%" }} src={sonarIcon} />
        </figure>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column p-2">
            <h1 style={{ fontWeight: "900" }}>
              Ruta de Innovación y Emprendimiento: SOÑAR
            </h1>
            <p style={{ marginBottom: "1rem" }}>
              <b>4 semanas - Etapa Soñar - 1 Sección</b>
            </p>

            <p style={{ maxWidth: "50vw" }}>
              En esta fase el emprendedor UAO tiene como objetivo lograr
              consolidar su idea de negocio fortaleciendo sus competencias y
              habilidades. Busca desarrollar competencias del Ser para el hacer,
              habilidades bandas.
            </p>

            <p style={{ maxWidth: "50vw" }}>
              Busca desarrollar competencias del Ser para el hacer, habilidades
              bandas.
            </p>

            {showButton && (
              <>
                <h2>Objetivos</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Generar procesos para el desarrollo de una Cultura en
                    Emprendimiento e Innovación.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Apoyar al emprendedor a identificar su perfil.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Identificar perfil y la etapa de desarrollo del proyecto de
                    emprendimiento: soñar, pensar, testear, arrancar.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Apoyar al emprendedor a identificar su sueño en función del
                    perfil potencial de su emprendimiento o idea.
                  </li>
                </ul>
              </>
            )}

            <h2>Resultados / Entregables</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Perfil del Emprendedor
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Definición del sueño: perfilando la iniciativa.
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
                    Taller "Ser Emprendedor"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Competencias y contextos para aprender"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller para descubrimiento / ideación.
                  </li>
                </ul>

                <h2>Acompañamiento</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Perfilamiento de la iniciativa de emprendimiento.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Perfilamiento de las competencias emprendedor.
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
                    Perfil de Emprendedor
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "2rem" }}>
                    Estructuración de la Idea.
                  </li>
                </ul>
              </>
            )}

            {showButton && (
              <button
                onClick={() => onIniciar(stateButton, lastActivity)}
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

export default EtapaSonar;
