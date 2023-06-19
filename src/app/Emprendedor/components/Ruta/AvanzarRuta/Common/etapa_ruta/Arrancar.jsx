import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "src/app/Shared/assets/styles/Common";

import arrancarIcon from "src/app/Shared/assets/images/ruta_icons/arrancar_icon.png";

function EtapaArrancar({ showButton, stateButton }) {
  const navigate = useNavigate();
  const { state } = useLocation();

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
              <b>8 semanas - Etapa arrancar - 2 Sección</b>
            </p>

            <p style={{ maxWidth: "50vw" }}>
              En esta fase el emprendedor UAO tiene como objetivo estructurar
              todo el plan estratégico y comercial para el arranque del
              proyecto.
            </p>

            <p style={{ maxWidth: "50vw" }}>
              El emprendedor desarrolla competencias para consolidar la
              estrategia comercial, comunicación, financiera para consolidar su
              proyecto de emprendimiento.
            </p>

            {showButton && (
              <>
                <h2>Objetivos</h2>
                <ul>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Ayudar al emprendedor a establecer una estructura financiera
                    y los estados financieros de la empresa.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Ayudar el emprendedor a establecerla Planeación Estratégica
                    para el arranque de su negocio.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Ayudar el emprendedor a fortalecer sus habilidades para
                    vender su proyecto.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Ayudar el emprendedor a fortalecer sus habilidades
                    personales, interpersonales y comerciales para el arranque y
                    potencialización de su empresa.
                  </li>
                </ul>
              </>
            )}

            <h2>Resultados / Entregables</h2>
            <ul>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Plan de arranque de la empresa.
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Previsiones financieras.
              </li>
              <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                Portafolio de productos y servicios.
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
                    Taller "Técnicas de ventas"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Gestión de la propiedad intelectual.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Gestión contable e impuestos 2"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Marketing y comercio digital"
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Plan de acción de arranque.
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "1rem" }}>
                    Taller "Estrategia financiera 2"
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
                    Asesoría especializada (Estructuración financiera)
                  </li>
                  <li style={{ listStyleType: "square", marginBottom: "2rem" }}>
                    Diagnóstico plan de acción.
                  </li>
                </ul>
              </>
            )}

            {showButton && (
              <button
                onClick={() => navigate("/Emprendedor/Ruta/Avanzar/Arrancar")}
                className="btn btn-primary w-25"
                disabled={state?.stateButton == 4}
              >
                {state?.stateButton == 4 ? "En revision" : "Iniciar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EtapaArrancar;
