import { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  img,
  rejectStyle,
  thumb,
  thumbInner,
} from "./styled";

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
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      props.upFiles(acceptedFiles);
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

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>Clickea o Arrastra y suelta el archivo aquí</p>
        <em>(Máximo 1 archivo)</em>
      </div>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
    </section>
  );
}

export default DropZone;
