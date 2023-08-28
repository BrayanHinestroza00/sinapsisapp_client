import moment from "moment";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import { AnuncioParrafo, AnuncioSpanHelper, AnuncioTitulo } from "./styled.js";
import { Card } from "src/app/Shared/assets/styles/Common.js";
import { SINAPSIS_APP_FORMATO_FECHA_HORA } from "src/app/Shared/utils/constants";
import { getArchivo, urlify } from "src/app/Shared/utils/utilityFunctions.js";

function Anuncio({ dataAnuncio, ...props }) {
  const [datosImagen, setDatosImagen] = useState({});
  useEffect(() => {
    obtenerImagen();
  }, []);

  const obtenerImagen = async () => {
    const imagen = await getArchivo(dataAnuncio.urlAnuncio);
    setDatosImagen(imagen);
  };

  return (
    <Card className="container-fluid">
      <AnuncioSpanHelper>
        Fecha de publicación:{" "}
        <span className="text-muted">
          {moment
            .utc(dataAnuncio.fechaCreacion)
            .format("dddd, DD [de] MMMM [del] YYYY [a las] hh:mm A")}
        </span>
      </AnuncioSpanHelper>
      <AnuncioTitulo>{dataAnuncio.titulo}</AnuncioTitulo>
      <div className="row col-md-12">
        <AnuncioParrafo className="mb-3">
          {parse(urlify(dataAnuncio.descripcion))}
        </AnuncioParrafo>
      </div>
      <div className="row col-md-12 text-center">
        <div className="w-100 text-center">
          {datosImagen == null ? (
            <LoadingSpinner width="5rem" height="5rem" />
          ) : (
            <img
              src={`data:${datosImagen.contentType};base64,${datosImagen.file}`}
              alt={dataAnuncio.titulo}
              className="rounded"
              style={{ /*maxWidth: "50vw", */ maxHeight: "75vh" }}
            />
          )}
        </div>
      </div>
    </Card>

    // <Card className="container-fluid my-3 text-center">
    //   <div
    //     style={{
    //       display: "flex",
    //       flexWrap: "nowrap",
    //       justifyContent: "space-around",
    //     }}
    //     className="row"
    //   >
    //     <h2 className="col-md-6">{dataAnuncio.titulo}</h2>
    //     <p className="col-md-6">
    //       <AnuncioSpanHelper>Fecha de publicación:</AnuncioSpanHelper>
    //       {/* <span className="text-muted">21 de noviembre a las 11:39</span> */}
    //       <span className="text-muted">
    //         {moment
    //           .utc(dataAnuncio.fechaCreacion)
    //           .format(SINAPSIS_APP_FORMATO_FECHA_HORA)}
    //       </span>
    //     </p>
    //   </div>
    //   <div className="row col-md-12">
    //     <AnuncioParrafo className="mb-3">
    //       {dataAnuncio.descripcion}
    //     </AnuncioParrafo>
    //     {/* <p>
    //         La Gran Vitrina Verde, se llevará a cabo el 25 de noviembre en el
    //         Bulevar del Río Cali, evento de región que tendrá productos y servicios
    //         de 100 negocios verdes. 📣♻️
    //       </p> */}
    //   </div>
    //   <div className="row col-md-12">
    //     <div className="w-100 text-center">
    //       {datosImagen == null ? (
    //         <LoadingSpinner width="5rem" height="5rem" />
    //       ) : (
    //         <img
    //           src={`data:${datosImagen.contentType};base64,${datosImagen.file}`}
    //           alt={dataAnuncio.titulo}
    //           className="rounded"
    //           style={{ maxWidth: "50vw", maxHeight: "35vh" }}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </Card>
  );
}

export default Anuncio;
