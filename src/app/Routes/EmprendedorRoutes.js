import Axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// import EditarCuentaPage from "src/pages/emprendedor/EditarCuentaPage";
// import HomePage from "src/pages/emprendedor/HomePage";
// import PerfilPage from "src/pages/emprendedor/PerfilPage";
// import PrimeraAtencionPage from "src/pages/emprendedor/PrimeraAtencionPage";
// import RutaPage from "src/pages/emprendedor/RutaPage";
// import SeleccionarProyectoPage from "src/components/emprendedor/SeleccionarProyectoModal";
import Error404Page from "src/app/Shared/pages/error/Error404/Error404";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/app/Shared/utils/constants";
import { HOST } from "src/app/Shared/utils/apiConstants";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  insertIntoLocalStorage,
} from "src/app/Shared/utils/localStorage.js";
import EmprendedorLayout from "../Emprendedor/layouts/EmprendedorLayout";
import { EmprendedorContextProvider } from "../Emprendedor/contexts/EmprendedorContext";

function EmprendedorRoutes() {
  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    if (!userData.esPrimeraVez) {
      Axios.get(`${HOST}/app/preload/emprendedor`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        params: {
          idUsuario: userData.id,
        },
      })
        .then(({ data }) => {
          deleteFromLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO);
          insertIntoLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO, {
            ...userData,
            esPrimeraVez: data.response.primeraVez,
            proyectosEmprendimiento: data.response.proyectosEmprendimiento,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <EmprendedorContextProvider>
      <EmprendedorLayout sidebar={false}>
        <Routes>
          {/* <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/Seleccionar_Proyecto"
            element={<SeleccionarProyectoPage />}
          />
          <Route exact path="/Editar_Cuenta" element={<EditarCuentaPage />} />
          <Route
            exact
            path="/PrimeraAtencion"
            element={<PrimeraAtencionPage />}
          />
          <Route exact path="/Ruta/*" element={<RutaPage />} />
          <Route exact path="/Perfil" element={<PerfilPage />} /> */}
          <Route path="/" element={<Error404Page />} />
        </Routes>
      </EmprendedorLayout>
    </EmprendedorContextProvider>
  );
}

export default EmprendedorRoutes;
