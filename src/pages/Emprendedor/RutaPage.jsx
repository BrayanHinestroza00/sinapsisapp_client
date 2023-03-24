import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AvanzarRuta from "src/components/emprendedor/ruta/avanzar_ruta/AvanzarRuta";
import Consultoria from "src/components/emprendedor/ruta/consultorias/Consultoria";
import ConsultoriaEspecializada from "src/components/emprendedor/ruta/consultorias/ConsultoriaEspecializada";
import HistorialConsultoria from "src/components/emprendedor/ruta/consultorias/HistorialConsultoria";
import EstadoRuta from "src/components/emprendedor/ruta/estado_ruta/EstadoRutaEmprendedor";
import MaterialApoyo from "src/components/emprendedor/ruta/material_apoyo/MaterialApoyo";
import Mentores from "src/components/emprendedor/ruta/mentores/Mentores";
import Proyecto from "src/components/emprendedor/ruta/proyecto/ProyectoEmprendedor";
import RedirectToEstado from "src/components/emprendedor/ruta/RedirectToEstado";
import Tareas from "src/components/emprendedor/ruta/tareas/Tareas";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";

function RutaPage() {
  const { showSidebar, setShowSidebar } = useContext(EmprendedorContext);

  useEffect(() => {
    if (!showSidebar) {
      setShowSidebar(true);
    }
  }, [showSidebar]);

  return (
    <Routes>
      <Route exact path="/" element={<RedirectToEstado />} />
      <Route path="/Avanzar" element={<AvanzarRuta />} />
      <Route path="/Estado" element={<EstadoRuta />} />
      <Route path="/Mentores" element={<Mentores />} />
      <Route path="/Tareas" element={<Tareas />} />
      <Route path="/Proyecto" element={<Proyecto />} />
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
