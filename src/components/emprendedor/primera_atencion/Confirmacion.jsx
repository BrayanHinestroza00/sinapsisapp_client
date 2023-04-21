import imagen from "../../../assets/images/Logo_Sinapsis.png";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Paso,
  TituloStepByStep,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { confirmAlertWithText } from "src/utils/alerts/ConfirmAlert";

function Confirmacion(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    confirmAlertWithText({
      title: "¿Estas seguro que deseas continuar con el registro?",
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
          <img src={imagen} alt="Logo SINAPSIS UAO" />

          <p>
            A continuación, finalizaras el proceso de primera atención con
            SINAPSIS UAO.
          </p>

          <p>
            Debes estar atento a tu correo electrónico en donde recibirás
            información de los próximos pasos.
          </p>

          <p>
            Un mentor te sera asignado cuando SINAPSIS complete tu registro.
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
