import {
  SpanAuxiliar,
  CardRuta,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";
// import DescubrirseEmprendedor from "./sonar_z/ser_emprendedor/conectar_y_potencializar_perfil/DescubrirseEmprendedor";
import SeccionAvanzarRuta from "./SeccionAvanzarRuta";

const etapaActual = "Pensar";

function AvanzarRuta() {
  return (
    <>
      <Titulo>Ruta de Innovación y Emprendimiento SINAPSIS UAO</Titulo>

      <CardRuta>
        <Ruta>
          <div>
            <Subtitulo className="mx-0">
              Etapa: <SpanAuxiliar>{etapaActual}</SpanAuxiliar>
            </Subtitulo>
          </div>

          <p>
            En esta etapa el emprendedor tiene la capacidad de analizar si su
            idea de emprendimiento es viable y soluciona una problemática real.
          </p>

          <Subtitulo className="mx-0">Objetivos</Subtitulo>
          <div>
            <ul>
              <li>
                Facilitar la apropiación tecnológica para el emprendimiento y la
                innovación
              </li>
              <li>
                Ayudar el emprendedor a evaluar la viabilidad de su proyecto
              </li>
              <li>Apoyar al emprendedor a estructurar su modelo de negocios</li>
            </ul>
          </div>

          <hr />
          <br />

          <div>
            <Subtitulo className="mx-0">
              Continua tu progreso en la etapa:
              <SpanAuxiliar>{etapaActual}</SpanAuxiliar>
            </Subtitulo>
          </div>

          <Subtitulo className="mx-0">Contenido Educativo</Subtitulo>

          <div>
            <div className="accordion" id="accordionEtapaPensar">
              <div className="accordion-item">
                <h2 className="accordion-header m-0" id="headingEtapaPensar">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOneEtapaPensar"
                    aria-expanded="true"
                    aria-controls="collapseOneEtapaPensar"
                  >
                    Ser Emprendedor
                  </button>
                </h2>
                <div
                  id="collapseOneEtapaPensar"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingEtapaPensar"
                  data-bs-parent="#accordionEtapaPensar"
                >
                  <div className="accordion-body card card-body m-0 p-0">
                    <SeccionAvanzarRuta
                      idSeccion={"ConectarPotencializarPE"}
                      tituloSeccion={
                        "Conectar y potencializar tu perfil como emprendedor "
                      }
                    />

                    <SeccionAvanzarRuta
                      idSeccion={"PlanNegocioPE"}
                      tituloSeccion={"Plan de Negocios "}
                    />

                    <SeccionAvanzarRuta
                      idSeccion={"DondeIniciarPE"}
                      tituloSeccion={"Por donde comenzar "}
                    />

                    <SeccionAvanzarRuta
                      idSeccion={"ContenidoPlanNegocioPE"}
                      tituloSeccion={"Contenido de Plan de Negocios "}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default AvanzarRuta;
