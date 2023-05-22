import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";
import image from "src/app/Shared/assets/images/panel_lateral.png";
import {
  SignUpCard,
  SignUpContainer,
  SignUpFormButton,
  SignUpFormDescription,
  SignUpFormImageContainer,
  SignUpFormImageElement,
  SignUpFormTitulo,
  SignUpLeftPanelImage,
  SignUpRightPanelContainer,
} from "./styled";

function SignUpComponent({ onClickBtnComunidadUAO, onClickBtnExterno }) {
  return (
    <SignUpContainer>
      <SignUpLeftPanelImage src={image} alt="SINAPSIS UAO" />
      <SignUpRightPanelContainer>
        <SignUpCard>
          <SignUpFormImageContainer>
            <SignUpFormImageElement
              src={logoSinapsis}
              alt="Logo SINAPSIS UAO"
              width="228"
            />
          </SignUpFormImageContainer>

          <SignUpFormTitulo>Regístrate en Sinapsis UAO</SignUpFormTitulo>

          <SignUpFormDescription className="text-muted">
            ¿Eres estudiante o colaborador UAO?
          </SignUpFormDescription>

          <SignUpFormButton
            type="button"
            onClick={() => onClickBtnComunidadUAO()}
          >
            SOY ESTUDIANTE, EGRESADO O COLABORADOR UAO
          </SignUpFormButton>

          <SignUpFormButton type="button" onClick={() => onClickBtnExterno()}>
            SOY USUARIO EXTERNO
          </SignUpFormButton>
        </SignUpCard>
      </SignUpRightPanelContainer>
    </SignUpContainer>
  );
}

export default SignUpComponent;
