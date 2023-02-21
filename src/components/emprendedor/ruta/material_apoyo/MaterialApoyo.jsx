import React from "react";
import { Label } from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  CardRuta,
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

function MaterialApoyo() {
  return (
    <>
      <CardRuta>
        <Ruta>
          <SubTitulo>Filtros</SubTitulo>
          <form className="d-flex">
            <div className="mx-3">
              <Label className="mb-1">Etapa de la ruta</Label>
              <select className="d-block w-100 form-select" type={"text"}>
                <option>Sonar</option>
                <option>Pensar</option>
                <option>Testear</option>
                <option>Arrancar</option>
              </select>
            </div>
          </form>
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <SubTitulo>Material de Apoyo</SubTitulo>
          <div className="d-flex flex-wrap justify-content-center">
            <div
              key={1}
              className="card text-center align-items-center px-3 m-2"
            >
              <h5>Recursos digitales</h5>

              <iframe
                className="card-img-top d-flex"
                src="https://www.youtube.com/embed/rrUp4fjAYc8"
                title="Introducción al curso Ruta 0 - Plataforma virtual Sinapsis UAO"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: "20rem" }}
              />
              <div className="card-body">
                <h6 className="card-title">
                  Introducción al curso Ruta 0 - Plataforma virtual Sinapsis UAO
                </h6>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  placerat risus vitae dapibus venenatis. Sed vitae ex mi.
                  Integer auctor turpis non urna sodales pulvinar.
                </p>
              </div>

              <hr />

              <h5 className="mb-0">Recursos Bibliograficos</h5>
              <div className="card-body mt-0">
                <h6 className="card-title">
                  Introducción al curso Ruta 0 - Plataforma virtual Sinapsis UAO
                </h6>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  placerat risus vitae dapibus venenatis. Sed vitae ex mi.
                  Integer auctor turpis non urna sodales pulvinar.
                </p>
              </div>
            </div>
          </div>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default MaterialApoyo;
