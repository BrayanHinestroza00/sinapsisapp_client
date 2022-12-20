import Swal from "sweetalert2";

import imagen from "../../../assets/images/Logo_Sinapsis.png";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Paso,
  TituloStepByStep,
} from "src/assets/styles/emprendedor/primeraAtencion.style";

function Confirmacion(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Estas seguro?",
      showDenyButton: true,
      confirmButtonText: "Enviar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        props.enviarDatos();
      }
    });
  };

  return (
    <Contenido className="container w-50">
      <div className="text-center">
        <Circulo>
          <Paso>3</Paso>
        </Circulo>
        <TituloStepByStep>Completar Primera Atención</TituloStepByStep>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="text-center">
          <img src={imagen} alt="Logo Sinapsis" />

          <p>
            A continuación, iniciaras el proceso de primera atención con
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
            onClick={() => {
              props.prevStep();
            }}
          >
            Volver
          </Boton>
          <BotonSiguiente type="submit" className="btn btn-primary btnNext">
            Enviar
          </BotonSiguiente>
        </div>
      </form>
    </Contenido>
  );
}

export default Confirmacion;
