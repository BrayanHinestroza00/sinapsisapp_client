import React from "react";
import { Route, Routes } from "react-router-dom";
import ConsultoriasEspPage from "src/pages/mentor/ConsultoriasEspPage";
import ConsultoriasPage from "src/pages/mentor/ConsultoriasPage";
import DetalleEmprendedorPage from "src/pages/mentor/DetalleEmprendedorPage";
import EditarCuentaPage from "src/pages/mentor/EditarCuentaPage";
import EmprendedoresPage from "src/pages/mentor/EmprendedoresPage";
import HomePage from "src/pages/mentor/HomePage";
import ReportesConsultoriaPage from "src/pages/mentor/ReportesConsultoriaPage";
import PageNotFound from "src/pages/PageNotFound";

function MentorRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/Editar_Cuenta" element={<EditarCuentaPage />} />

      <Route exact path="/Emprendedores" element={<EmprendedoresPage />} />
      <Route
        exact
        path="/Emprendedor/:idEmprendedor"
        element={<DetalleEmprendedorPage />}
      />
      <Route
        exact
        path="/Consultorias/Normales"
        element={<ConsultoriasPage />}
      />
      <Route
        exact
        path="/Consultorias/Especializadas"
        element={<ConsultoriasEspPage />}
      />
      <Route
        exact
        path="/Reportes/Consultoria"
        element={<ReportesConsultoriaPage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default MentorRoutes;
