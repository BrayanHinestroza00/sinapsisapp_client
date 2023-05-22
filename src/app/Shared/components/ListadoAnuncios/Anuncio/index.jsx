import { HOST } from "src/app/Shared/utils/apiConstants";

import { AnuncioSpanHelper } from "./styled.js";

function Anuncio({ dataAnuncio, ...props }) {
  return (
    <div className="container-fluid my-3 text-center">
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-around",
        }}
        className="row"
      >
        <h5 className="col-md-6">{dataAnuncio.titulo}</h5>
        <p className="col-md-6">
          <AnuncioSpanHelper>Fecha de publicación:</AnuncioSpanHelper>
          {/* <span className="text-muted">21 de noviembre a las 11:39</span> */}
          <span className="text-muted">{dataAnuncio.fechaCreacion}</span>
        </p>
      </div>
      <div className="row col-md-12">
        <p>{dataAnuncio.descripcion}</p>
        {/* <p>
            La Gran Vitrina Verde, se llevará a cabo el 25 de noviembre en el
            Bulevar del Río Cali, evento de región que tendrá productos y servicios
            de 100 negocios verdes. 📣♻️
          </p> */}
      </div>
      <div className="row col-md-12">
        <div className="w-100 text-center">
          <img
            src={`${HOST}${dataAnuncio.urlAnuncio}`}
            alt={dataAnuncio.titulo}
            className="rounded"
            style={{ maxWidth: "50vw" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Anuncio;
