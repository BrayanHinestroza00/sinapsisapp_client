import { Navigate } from "react-router-dom";
import swal from "sweetalert2";

import Error404Page from "src/app/Shared/pages/error/Error404/Error404";
import EmprendedorRoutes from "../EmprendedorRoutes";
import { getFromLocalStorage } from "src/app/Shared/utils/localStorage";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/app/Shared/utils/constants";

function AuthEmprendedor() {
  const datosUsuario = getFromLocalStorage(
    SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
  );

  if (!datosUsuario) {
    swal.fire({
      title: "Por favor, inicia sesión",
      icon: "error",
      iconColor: "#9a66a8",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#9a66a8",
      showConfirmButton: true,
    });
    return <Navigate to="/" />;
  }

  // eslint-disable-next-line
  if (datosUsuario.roles.length > 1 && datosUsuario.roles.contains(3)) {
    return <EmprendedorRoutes />;
  }

  return <Error404Page />;
}

export default AuthEmprendedor;
