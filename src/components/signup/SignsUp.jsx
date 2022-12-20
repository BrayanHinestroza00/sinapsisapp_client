import { useNavigate } from "react-router-dom";

import { signUpStyled } from "../../assets/styles/StyleComponent";

import imagen from "../../assets/images/Sinapsis-LR.png";
import LogoSinapsis from "../../assets/images/Logo_Sinapsis.png";

function SignsUp() {
  let navigate = useNavigate();
  const onClickBtnComunidadUAO = (event) => {
    navigate("/Signup/ComunidadUAO");
  };

  const onClickBtnExterno = (event) => {
    navigate("/Signup/Externo");
  };

  return (
    <signUpStyled.Grid_Layout>
      <signUpStyled.ImagenRegistro src={imagen} alt="Sinapsis" />
      <signUpStyled.Contenedor_Derecho>
        <signUpStyled.CardSignUp>
          <signUpStyled.Figura>
            <signUpStyled.Logo_Sinapsis_Registro
              src={LogoSinapsis}
              alt="Logo Sinapsis"
              width="228"
            />
          </signUpStyled.Figura>

          <signUpStyled.Titulo>Regístrate en Sinapsis UAO</signUpStyled.Titulo>

          <p className="text-muted">¿Eres estudiante o colaborador UAO?</p>

          <signUpStyled.BotonEleccion
            className="btn"
            type="button"
            onClick={() => onClickBtnComunidadUAO()}
          >
            {" "}
            SOY ESTUDIANTE, EGRESADO O COLABORADOR UAO{" "}
          </signUpStyled.BotonEleccion>

          <signUpStyled.BotonEleccion
            className="btn"
            type="button"
            onClick={() => onClickBtnExterno()}
          >
            {" "}
            SOY USUARIO EXTERNO{" "}
          </signUpStyled.BotonEleccion>
        </signUpStyled.CardSignUp>
      </signUpStyled.Contenedor_Derecho>
    </signUpStyled.Grid_Layout>
  );
}

export default SignsUp;
