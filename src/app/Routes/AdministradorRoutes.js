import { Route, Routes } from "react-router-dom";

import { AdministradorContextProvider } from "../Administrador/contexts/AdministradorContext";
import { AdminEmprendedorContextProvider } from "../Administrador/contexts/AdminEmprendedorContext";
import AdministradorLayout from "../Administrador/layouts/AdministradorLayout";

import Anuncios from "src/app/Shared/pages/Anuncios";
import Error404Page from "src/app/Shared/pages/error/Error404/Error404";
import EditarCuentaPage from "../Administrador/pages/EditarCuentaPage";
import ProyectoEmprendimientosPage from "../Administrador/pages/ProyectoEmprendimientosPage";
import DetalleProyectoEmprendimientoPage from "../Administrador/pages/DetalleProyectoEmprendimientoPage";
import PrimeraAtencionPage from "../Administrador/pages/PrimeraAtencionPage";
import DetalleSolicitudPage from "../Administrador/pages/DetalleSolicitudPage";
import EmprendedoresPage from "../Administrador/pages/EmprendedoresPage";
import DetalleEmprendedorPage from "../Administrador/pages/DetalleEmprendedorPage";
import MentoresPage from "../Administrador/pages/MentoresPage";
import DetalleMentorPage from "../Administrador/pages/DetalleMentorPage";
import IndicadoresFormacionPage from "../Administrador/pages/IndicadoresFormacionPage";
import IndicadoresGestionPage from "../Administrador/pages/IndicadoresGestionPage";
import GestionEmprendedoresPage from "../Administrador/pages/GestionEmprendedoresPage";
import GestionMentoresPage from "../Administrador/pages/GestionMentoresPage";
import GestionAnunciosPage from "../Administrador/pages/GestionAnunciosPage";

function AdministradorRoutes() {
  return (
    <AdministradorContextProvider>
      <AdministradorLayout sidebar={true}>
        <AdminEmprendedorContextProvider>
          <Routes>
            <Route exact path="/" element={<Anuncios />} />
            <Route exact path="/Editar_Cuenta" element={<EditarCuentaPage />} />
            <Route
              exact
              path="/Emprendimientos"
              element={<ProyectoEmprendimientosPage />}
            />
            <Route
              exact
              path="/Emprendimientos/:idEmprendimiento"
              element={<DetalleProyectoEmprendimientoPage />}
            />
            <Route
              exact
              path="/Solicitudes"
              element={<PrimeraAtencionPage />}
            />
            <Route
              exact
              path="/Solicitudes/:idSolicitud"
              element={<DetalleSolicitudPage />}
            />
            <Route
              exact
              path="/Emprendedores"
              element={<EmprendedoresPage />}
            />
            <Route
              exact
              path="/Emprendedores/:idEmprendedor"
              element={<DetalleEmprendedorPage />}
            />
            <Route exact path="/Mentores" element={<MentoresPage />} />
            <Route
              exact
              path="/Mentores/:idMentor"
              element={<DetalleMentorPage />}
            />
            <Route
              exact
              path="/Reportes/Formacion"
              element={<IndicadoresFormacionPage />}
            />
            <Route
              exact
              path="/Reportes/Gestion"
              element={<IndicadoresGestionPage />}
            />
            <Route
              exact
              path="/Gestion/Emprendedores"
              element={<GestionEmprendedoresPage />}
            />
            <Route
              exact
              path="/Gestion/Mentores"
              element={<GestionMentoresPage />}
            />
            <Route
              exact
              path="/Gestion/Anuncios"
              element={<GestionAnunciosPage />}
            />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </AdminEmprendedorContextProvider>
      </AdministradorLayout>
    </AdministradorContextProvider>
  );
}

export default AdministradorRoutes;
