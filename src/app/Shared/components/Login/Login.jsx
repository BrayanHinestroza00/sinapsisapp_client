import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import leftPanelImage from "src/app/Shared/assets/images/panel_lateral.png";

import {
  LoginCard,
  LoginContainer,
  LoginLeftPanelImage,
  LoginRightPanelContainer,
} from "./styled.js";
import LoginFormComponent from "./LoginFormComponent.jsx";
import {
  HTTP_METHOD_POST,
  URL_INICIAR_SESION,
} from "../../utils/apiConstants.js";
import { useFetch } from "../../services/hooks/useFetch.js";
import {
  getFromLocalStorage,
  insertIntoLocalStorage,
} from "../../utils/localStorage.js";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "../../utils/constants.js";
import { messageAlert } from "../../utils/messageAlerts.js";

function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    const data = getFromLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO);

    if (data) {
      if (data.roles.length > 1) {
        navigate("/Administrador");
      } else {
        switch (data.roles[0]) {
          case 1:
            navigate("/Administrador");
            break;
          case 2:
            navigate("/Mentor");
            break;
          case 3:
            navigate("/Emprendedor");
            break;
          default:
            break;
        }
      }
    }
  }, []);

  const onHandleSubmit = (loginData) => {
    setLoading(true);
    fetchAPI({
      URL: URL_INICIAR_SESION,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: loginData,
      },
    });
  };

  if (loading && errorAPI) {
    messageAlert({
      title: "Inicio de sesion fallido",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      insertIntoLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO, dataAPI);

      if (dataAPI.roles.length > 1) {
        navigate("/Administrador");
      } else {
        switch (dataAPI.roles[0]) {
          case 1:
            navigate("/Administrador");
            break;
          case 2:
            navigate("/Mentor");
            break;
          case 3:
            navigate("/Emprendedor");
            break;
          default:
            break;
        }
      }
    } else {
      messageAlert({
        title: "Inicio de sesion fallido",
        text: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <LoginContainer>
      <LoginLeftPanelImage src={leftPanelImage} alt="SINAPSIS UAO" />
      <LoginRightPanelContainer>
        <LoginCard>
          <LoginFormComponent onSubmit={onHandleSubmit} />
        </LoginCard>
      </LoginRightPanelContainer>
    </LoginContainer>
  );
}

export default Login;
