import leftPanelImage from "src/app/Shared/assets/images/panel_lateral.png";
import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";

import {
  LoginCard,
  LoginContainer,
  LoginFormImageContainer,
  LoginFormImageElement,
  LoginFormTitulo,
  LoginLeftPanelImage,
  LoginRightPanelContainer,
} from "./styled";

function LoginForm() {
  return (
    <LoginContainer>
      <LoginLeftPanelImage src={leftPanelImage} alt="SINAPSIS UAO" />
      <LoginRightPanelContainer>
        <LoginCard>
          <LoginForm>
            <LoginFormImageContainer>
              <LoginFormImageElement
                src={logoSinapsis}
                alt="Logo SINAPSIS UAO"
              />
            </LoginFormImageContainer>
            <LoginFormTitulo>Inicia sesión en SINAPSIS UAO</LoginFormTitulo>
          </LoginForm>
        </LoginCard>
      </LoginRightPanelContainer>
    </LoginContainer>
  );
}

export default LoginForm;
