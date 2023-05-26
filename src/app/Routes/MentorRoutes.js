import { Route, Routes } from "react-router-dom";

import EditarCuenta from "src/app/Mentor/pages/EditarCuenta";
import Emprendedores from "src/app/Mentor/pages/Emprendedores";
import DetalleEmprendedor from "src/app/Mentor/pages/DetalleEmprendedor";
import Consultorias from "src/app/Mentor/pages/Consultorias";
import ReportesConsultoria from "src/app/Mentor/pages/ReportesConsultoria";
import Anuncios from "src/app/Shared/pages/Anuncios";
import Error404Page from "src/app/Shared/pages/error/Error404/Error404";
import VerPerfil from "../Mentor/pages/VerPerfil";

import MentorLayout from "../Mentor/layouts/MentorLayout";
import { MentorContextProvider } from "../Mentor/contexts/MentorContext";

function MentorRoutes() {
  return (
    <MentorContextProvider>
      <MentorLayout sidebar={true}>
        <Routes>
          <Route exact path="/" element={<Anuncios />} />
          <Route exact path="/Editar_Cuenta" element={<EditarCuenta />} />

          <Route exact path="/Emprendedores" element={<Emprendedores />} />
          <Route
            exact
            path="/Emprendedor/:idEmprendedor"
            element={<DetalleEmprendedor />}
          />
          <Route exact path="/Consultorias" element={<Consultorias />} />
          <Route
            exact
            path="/Reportes/Consultoria"
            element={<ReportesConsultoria />}
          />
          <Route exact path="/Perfil/Ver" element={<VerPerfil />} />

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </MentorLayout>
    </MentorContextProvider>
  );
}

export default MentorRoutes;
