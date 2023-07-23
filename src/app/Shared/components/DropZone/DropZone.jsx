import { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { acceptStyle, activeStyle, baseStyle, rejectStyle } from "./styled";

function DropZone(props) {
  const [files, setFiles] = useState(props?.files || []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: props.accept ? props.accept : {},
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const files = acceptedFiles.length + rejectedFiles.length;

      if (files > 1) {
        props.upFilesRejected("Sólo se permite la carga de 1 archivo.");
      } else {
        if (acceptedFiles.length > 0) {
          props.upFiles(acceptedFiles);
        }

        if (rejectedFiles.length > 0) {
          if (rejectedFiles[0].errors.code == "too-many-files") {
            props.upFilesRejected("Sólo se permite la carga de 1 archivo.");
          } else {
            props.upFilesRejected("Formato de archivo NO permitido.");
          }
        }
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>Clickea o arrastra y suelta el archivo aquí</p>
        <em>(Máximo 1 archivo)</em>
      </div>
    </section>
  );
}

export default DropZone;
