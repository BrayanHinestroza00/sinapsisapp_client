import { Card } from "src/app/Shared/assets/styles/Common";

import pensarIcon from "src/app/Shared/assets/images/ruta_icons/pensar_icon.png";

function EtapaPensar({ showButton }) {
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
              <b>2 meses - Etapa pensar - 1 Sección</b>
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
                Estructuración de la idea de negocio
              </li>
            </ul>

            <h2>Secciones</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Mi primer modelo de negocio
                <ul>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    CANVAS DE MODELO DE NEGOCIO
                  </li>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Que es un BMC (Características, Ventajas)
                  </li>
                  <li
                    style={{
                      listStyleType: "circle",
                      marginLeft: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Propuesta de valor
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

export default EtapaPensar;
