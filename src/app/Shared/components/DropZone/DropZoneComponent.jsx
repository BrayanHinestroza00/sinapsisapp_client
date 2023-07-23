import { useEffect, useState } from "react";

import DropZone from "./DropZone";

import { getArchivo } from "../../utils/utilityFunctions";

import { img, thumb, thumbInner, thumbsContainer } from "./styled";
import default_imagen from "src/app/Shared/assets/images/file_icon.png";

function DropZoneComponent({
  upFiles,
  files,
  filesUrl,
  accept,
  upFilesRejected,
}) {
  const [datosImagen, setDatosImagen] = useState({});

  useEffect(() => {
    obtenerImagen();
  }, [filesUrl]);

  useEffect(() => {
    obtenerImagenFile();
  }, [files]);

  const obtenerImagen = async () => {
    if (filesUrl) {
      const imagen = await getArchivo(filesUrl);
      if (
        imagen.contentType == "image/jpeg" ||
        imagen.contentType == "image/png"
      ) {
        setDatosImagen({
          url: `data:${imagen.contentType};base64,${imagen.file}`,
          filename: imagen.filename,
        });
      } else {
        setDatosImagen({
          url: default_imagen,
          filename: imagen.filename,
        });
      }
    }
  };

  const obtenerImagenFile = async () => {
    if (files) {
      if (files[0].type == "image/jpeg" || files[0].type == "image/png") {
        setDatosImagen({
          url: URL.createObjectURL(files[0]),
          filename: files[0].name,
        });
      } else {
        setDatosImagen({
          url: default_imagen,
          filename: files[0].name,
        });
      }
    }
  };

  return (
    <>
      <DropZone
        upFiles={upFiles}
        files={files}
        accept={accept}
        upFilesRejected={upFilesRejected}
      />
      {(files || filesUrl) && (
        <aside style={thumbsContainer}>
          <div style={thumb}>
            <div style={thumbInner}>
              <img
                src={datosImagen.url}
                style={img}
                alt={datosImagen.filename}
              />
              <h4>{datosImagen.filename}</h4>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default DropZoneComponent;
