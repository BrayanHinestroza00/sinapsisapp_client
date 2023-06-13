import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "src/components/login/LoginForm";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";
import { HTTP_METHOD_POST, URL_INICIAR_SESION } from "src/utils/apiConstants";
import { insertIntoLocalStorage } from "src/utils/functions";
import { useFetch } from "src/services/hooks/useFetch";
import { messageAlert } from "src/utils/alerts/MessageAlert";
import { getFromLocalStorage } from "src/utils/functions";

function LoginPage() {
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

  const onSubmit = (loginData) => {
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

  return <LoginForm onSubmit={onSubmit} />;
}

export default LoginPage;
