import { useState } from "react";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Paso,
  TituloStepByStep,
} from "./styled";
import { HOST } from "src/app/Shared/utils/apiConstants";

import { validacionesDiagnostico } from "src/app/Shared/services/validation/validatePrimeraAtencion";
import download from "src/app/Shared/assets/images/icons/download_icon.png";

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
              Sube tu archivo diligenciado
              <span className="text-danger"> (*)</span>
            </h4>
            <DropZoneComponent
              upFiles={onGetFiles}
              files={props?.fileDiagnostico}
              // accept={{
              //   "application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
              // }}
            />

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
            style={{ height: "auto" }}
            onClick={() => {
              props.prevStep();
            }}
          >
            Volver
          </Boton>

          <BotonSiguiente
            type="button"
            className="btn btn-primary"
            style={{ height: "auto" }}
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
