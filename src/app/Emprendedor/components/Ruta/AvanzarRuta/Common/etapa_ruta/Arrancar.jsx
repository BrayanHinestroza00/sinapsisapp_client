import { Card } from "src/app/Shared/assets/styles/Common";

import arrancarIcon from "src/app/Shared/assets/images/ruta_icons/arrancar_icon.png";

function EtapaArrancar({ showButton }) {
  return (
    <Card className="mb-3">
      <div className="container d-flex justify-content-center">
        <figure
          className="d-flex align-items-center"
          style={{ width: "10%", marginRight: "2rem" }}
        >
          <img style={{ width: "100%" }} src={arrancarIcon} />
        </figure>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column p-2">
            <h1 style={{ fontWeight: "900" }}>
              Ruta de Innovación y Emprendimiento: ARRANCAR
            </h1>
            <p style={{ marginBottom: "1rem" }}>
              <b>3 meses - Etapa arrancar - 2 Sección</b>
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
                Modelo de negocio
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Estudio de Mercado
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Prototipo o validación
              </li>
            </ul>

            <h2>Secciones</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Estructuración financiera
                <ul>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Precio y sus componentes
                  </li>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Bases del plan de financiamiento
                  </li>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Previsión
                  </li>
                </ul>
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Comercialización
                <ul>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Arte de la ventas
                  </li>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Presentación del Negocio
                  </li>
                </ul>
              </li>
            </ul>

            {showButton && (
              <button
                onClick={() => window.alert("Redirigir a etapa de ruta")}
                className="btn btn-primary w-25"
                disabled
              >
                Iniciar
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EtapaArrancar;
