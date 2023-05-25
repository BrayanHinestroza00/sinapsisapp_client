import sinapsisLogo from "src/app/Shared/assets/images/logo_sinapsis.png";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Paso,
  TituloStepByStep,
} from "./styled";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";

function Confirmacion(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    confirmAlertWithText({
      title: "¿Estás seguro que deseas continuar con el registro?",
      text: "Este proceso no se puede deshacer",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      onConfirm: () => props.enviarDatos(),
    });
  };

  return (
    <Contenido
      className="container w-50"
      style={{ backgroundColor: "#FFF", padding: "1rem 10rem" }}
    >
      <div className="text-center">
        <Circulo>
          <Paso>5</Paso>
        </Circulo>
        <TituloStepByStep>
          Completar Registro de Primera Atención
        </TituloStepByStep>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="text-center">
          <img src={sinapsisLogo} alt="Logo SINAPSIS UAO" />

          <p className="mb-2">
            A continuación, finalizarás el proceso de primera atención con
            SINAPSIS UAO.
          </p>

          <p className="mb-2">
            Debes estar atento a tu correo electrónico en donde recibirás
            información de los próximos pasos.
          </p>

          <p className="mb-4">
            Un mentor te será asignado cuando SINAPSIS complete tu registro.
          </p>
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
            type="submit"
            className="btn btn-primary"
            style={{ height: "auto" }}
          >
            Enviar
          </BotonSiguiente>
        </div>
      </form>
    </Contenido>
  );
}

export default Confirmacion;
