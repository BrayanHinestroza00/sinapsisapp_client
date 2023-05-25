import { HOST } from "src/app/Shared/utils/apiConstants";

import { AnuncioParrafo, AnuncioSpanHelper } from "./styled.js";
import { Card } from "src/app/Shared/assets/styles/Common.js";
import moment from "moment";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";

function Anuncio({ dataAnuncio, ...props }) {
  return (
    <Card className="container-fluid my-3 text-center">
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-around",
        }}
        className="row"
      >
        <h2 className="col-md-6">{dataAnuncio.titulo}</h2>
        <p className="col-md-6">
          <AnuncioSpanHelper>Fecha de publicación:</AnuncioSpanHelper>
          {/* <span className="text-muted">21 de noviembre a las 11:39</span> */}
          <span className="text-muted">
            {moment
              .utc(dataAnuncio.fechaCreacion)
              .format(SINAPSIS_APP_FORMATO_FECHA_HORA)}
          </span>
        </p>
      </div>
      <div className="row col-md-12">
        <AnuncioParrafo className="mb-3">
          {dataAnuncio.descripcion}
        </AnuncioParrafo>
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
    </Card>
  );
}

export default Anuncio;
