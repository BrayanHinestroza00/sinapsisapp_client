import Axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "src/components/login/LoginForm";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";
import { HOST } from "src/utils/apiConstants";
import { insertIntoLocalStorage } from "src/utils/functions";
import Swal from "sweetalert2";

function LoginPage() {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmit = (loginData) => {
    Axios.post(`${HOST}/login`, loginData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then(({ data }) => {
        if (data.code === 200) {
          insertIntoLocalStorage(
            SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
            data.response
          );

          if (data.response.roles.length > 1) {
            navigate("/Administrador");
          } else {
            switch (data.response.roles[0]) {
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
          Swal.fire({
            title: data.message,
            icon: "warning",
            iconColor: "#9a66a8",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#9a66a8",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: error,
          icon: "error",
          iconColor: "#9a66a8",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
        });
      });
  };

  return <LoginForm onSubmit={onSubmit} />;
}

export default LoginPage;
