import React, { useState } from "react";
import download from "../../../assets/images/download_icon.png";
import excelIcon from "../../../assets/images/excel_icon.png";
import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Paso,
  TituloStepByStep,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { HOST } from "src/utils/apiConstants";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import { validacionesDiagnostico } from "src/utils/validaciones";
import DropZone from "src/components/DropZone";

function InfoDiagnostico(props) {
  const [error, setError] = useState({});

  const onGetFiles = (files) => {
    props.getFileDiagnostico(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesDiagnostico(props.datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  return (
    <Contenido
      className="container"
      style={{ backgroundColor: "#FFF", padding: "1rem 10rem" }}
    >
      <div className="text-center">
        <Circulo>
          <Paso>4</Paso>
        </Circulo>
        <TituloStepByStep>Formato de Autodiagnóstico</TituloStepByStep>
      </div>

      <form className="row g-3" encType="multipart/form-data">
        <div className="text-center">
          <h4>
            Descarga el formato del autodiagnóstico, digiléncialo y súbelo
          </h4>
          <div>
            <a
              rel="noreferrer"
              className="btn-archivo"
              href={`${HOST}/AutoDiagnosticoSinapsis.xlsm`}
              target="_blank"
            >
              <img
                src={download}
                className="imagenDeDiagnostico"
                alt="Descargar Autodiagnostico"
              />
            </a>
          </div>

          <div>
            <h4>
              Sube tu archivo diligenciado <span> (*)</span>
            </h4>
            <DropZone
              upFiles={onGetFiles}
              files={props?.fileDiagnostico}
              accept={{
                "application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
              }}
            />
            {props.datos.fileDiagnostico && (
              <aside style={thumbsContainer}>
                <div style={thumb} key={props.datos?.fileDiagnostico[0].name}>
                  <div style={thumbInner}>
                    <img
                      src={excelIcon}
                      style={img}
                      alt={props.datos?.fileDiagnostico[0].name}
                    />
                  </div>
                </div>
                <span>{props.datos?.fileDiagnostico[0].name}</span>
              </aside>
            )}
            {error.fileDiagnostico && (
              <small className="form-text font-weight-bold text-danger">
                {error.fileDiagnostico}
              </small>
            )}
          </div>
        </div>

        <div className="col-12 d-flex justify-content-end">
          <Boton
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              props.prevStep();
            }}
          >
            Volver
          </Boton>

          <BotonSiguiente
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Siguiente
          </BotonSiguiente>
        </div>
      </form>
    </Contenido>
  );
}

export default InfoDiagnostico;
