import { Card } from "src/app/Shared/assets/styles/Common";

import sonarIcon from "src/app/Shared/assets/images/ruta_icons/sonar_icon.png";
import { useNavigate } from "react-router-dom";

function EtapaSonar({ showButton, stateButton }) {
  const navigate = useNavigate();
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
              <b>1 mes - Etapa Soñar - 1 Sección</b>
            </p>

            <p style={{ maxWidth: "50vw" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
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

            {showButton && (
              <button
                onClick={() => navigate("/Emprendedor/Ruta/Avanzar/Soñar")}
                className="btn btn-primary w-25"
                disabled={stateButton?.stateButton == 1}
              >
                {stateButton?.stateButton == 1 ? "En revision" : "Iniciar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EtapaSonar;
