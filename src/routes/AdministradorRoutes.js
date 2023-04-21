import { Route, Routes } from "react-router-dom";
import AdministradorLayout from "src/layouts/AdministradorLayout";
import DetalleSolicitudPage from "src/pages/administrador/DetalleSolicitudPage";
import DetalleProyectoEmprendimientoPage from "src/pages/administrador/DetalleProyectoEmprendimientoPage";
import EditarCuentaPage from "src/pages/administrador/EditarCuentaPage";
import EmprendedoresPage from "src/pages/administrador/EmprendedoresPage";
import GestionAnunciosPage from "src/pages/administrador/GestionAnunciosPage";
import GestionEmprendedoresPage from "src/pages/administrador/GestionEmprendedoresPage";
import GestionMentoresPage from "src/pages/administrador/GestionMentoresPage";
import HomePage from "src/pages/administrador/HomePage";
import IndicadoresFormacionPage from "src/pages/administrador/IndicadoresFormacionPage";
import IndicadoresGestionPage from "src/pages/administrador/IndicadoresGestionPage";
import MentoresPage from "src/pages/administrador/MentoresPage";
import PrimeraAtencionPage from "src/pages/administrador/PrimeraAtencionPage";
import ProyectoEmprendimientosPage from "src/pages/administrador/ProyectoEmprendimientosPage";
import DetalleEmprendedorPage from "src/pages/administrador/DetalleEmprendedorPage";
import PageNotFound from "src/pages/PageNotFound";
import { AdminEmprendedorContextProvider } from "src/services/context/AdminEmprendedorContext";
import { AdministradorContextProvider } from "src/services/context/AdministradorContext";
import DetalleMentorPage from "src/pages/administrador/DetalleMentorPage";

function AdministradorRoutes() {
  return (
    <AdministradorContextProvider>
      <AdministradorLayout sidebar={true}>
        <AdminEmprendedorContextProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AdminEmprendedorContextProvider>
      </AdministradorLayout>
    </AdministradorContextProvider>
  );
}

export default AdministradorRoutes;
