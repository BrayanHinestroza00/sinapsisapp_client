import {
  Auxiliar,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import DescubrirseEmprendedor from "./sonar/ser_emprendedor/conectar_y_potencializar_perfil/DescubrirseEmprendedor";
import SeccionAvanzarRuta from "./SeccionAvanzarRuta";

const etapaActual = "Pensar";

function AvanzarRuta() {
  return (
    <div className="container-fluid mx-2 my-2">
      <div>
        <Titulo className="m-0">
          Ruta de Innovación y Emprendimiento SINAPSIS UAO
        </Titulo>
        <SubTitulo className="mx-0">
          Etapa: <Auxiliar>{etapaActual}</Auxiliar>
        </SubTitulo>
      </div>

      <p>
        En esta etapa el emprendedor tiene la capacidad de analizar si su idea
        de emprendimiento es viable y soluciona una problemática real.
      </p>

      <SubTitulo className="mx-0">Objetivos</SubTitulo>
      <div>
        <ul>
          <li>
            Facilitar la apropiación tecnológica para el emprendimiento y la
            innovación
          </li>
          <li>Ayudar el emprendedor a evaluar la viabilidad de su proyecto</li>
          <li>Apoyar al emprendedor a estructurar su modelo de negocios</li>
        </ul>
      </div>

      <hr />
      <br />

      <div>
        <SubTitulo className="mx-0">
          Continua tu progreso en la etapa: <Auxiliar>{etapaActual}</Auxiliar>
        </SubTitulo>
      </div>

      <SubTitulo className="mx-0">Contenido Educativo</SubTitulo>

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
              <div className="accordion-body card card-body">
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

                {/* <ul>
                  <li>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Conectar y potencializar tu perfil como emprendedor
                    </button>
                  </li>
                  <div></div>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvanzarRuta;
