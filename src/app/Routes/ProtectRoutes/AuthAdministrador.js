import swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import AdministradorRoutes from "../AdministradorRoutes";
import { getFromLocalStorage } from "src/app/Shared/utils/localStorage";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/app/Shared/utils/constants";

function AuthAdministrador() {
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

  return <AdministradorRoutes />;
}

export default AuthAdministrador;
