import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RedirectToMainRuta from "../components/Ruta/RedirectToMainRuta";
// import AvanzarRuta from "../components/Ruta/AvanzarRuta/AvanzarRuta";
import EstadoRutaEmprendedor from "../components/Ruta/EstadoRuta/EstadoRutaEmprendedor";
import MaterialApoyo from "../components/Ruta/MaterialApoyo/MaterialApoyo";
import Consultoria from "../components/Ruta/Consultorias/Consultoria";
import HistorialConsultoria from "../components/Ruta/Consultorias/HistorialConsultoria";
import ConsultoriaEspecializada from "../components/Ruta/Consultorias/ConsultoriaEspecializada";
import Mentores from "../components/Ruta/Mentores/Mentores";
import Emprendimiento from "../components/Ruta/Emprendimiento/Emprendimiento";
import Tareas from "../components/Ruta/Tareas/Tareas";

import { EmprendedorContext } from "../contexts/EmprendedorContext";
import RouterPage from "./AvanzarRuta/RouterPage";

function RutaPage() {
  const { showSidebar, setShowSidebar } = useContext(EmprendedorContext);

  useEffect(() => {
    if (!showSidebar) {
      setShowSidebar(true);
    }
  }, [showSidebar]);

  return (
    <Routes>
      <Route exact path="/" element={<RedirectToMainRuta />} />
      <Route path="/Avanzar/*" element={<RouterPage />} />
      <Route path="/Estado" element={<EstadoRutaEmprendedor />} />
      <Route path="/Mentores" element={<Mentores />} />
      <Route path="/Tareas" element={<Tareas />} />
      <Route path="/Proyecto" element={<Emprendimiento />} />
      <Route path="/Material" element={<MaterialApoyo />} />
      <Route path="/Consultoria" element={<Consultoria />} />
      <Route path="/Consultoria/Historial" element={<HistorialConsultoria />} />
      <Route
        path="/ConsultoriaEspecializada"
        element={<ConsultoriaEspecializada />}
      />
    </Routes>
  );
}

export default RutaPage;
