import { useEffect, useState } from "react";

import DropZone from "./DropZone";

import { getArchivo } from "../../utils/utilityFunctions";

import { img, thumb, thumbInner, thumbsContainer } from "./styled";

function DropZoneComponent({ upFiles, files, filesUrl, accept, ...props }) {
  const [datosImagen, setDatosImagen] = useState({});

  useEffect(() => {
    obtenerImagen();
  }, [filesUrl]);

  const obtenerImagen = async () => {
    if (filesUrl) {
      const imagen = await getArchivo(filesUrl);
      setDatosImagen({
        url: `data:${imagen.contentType};base64,${imagen.file}`,
        filename: imagen.filename,
      });
    } else {
      setDatosImagen(null);
    }
  };

  return (
    <>
      <DropZone upFiles={upFiles} files={files} accept={accept} />
      {(files || filesUrl) && (
        <aside style={thumbsContainer}>
          <div style={thumb}>
            <div style={thumbInner}>
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : filesUrl
                    ? datosImagen?.url
                    : ""
                }
                style={img}
                alt={files ? files[0].name : filesUrl}
              />
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default DropZoneComponent;
