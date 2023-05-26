import { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import RutaAdministrador from "src/app/Administrador/components/DetalleProyectoEmprendimiento/Ruta/RutaAdministrador";
import PrimeraAtencion from "src/app/Administrador/components/DetalleProyectoEmprendimiento/PrimeraAtencion";
import Consultorias from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/Consultorias";
import HistorialConsultoria from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/HistorialConsultoria";
import Tareas from "src/app/Shared/components/DetalleProyectoEmprendimiento/tareas/Tareas";
import HistorialTareas from "src/app/Shared/components/DetalleProyectoEmprendimiento/tareas/HistorialTareas";
import Emprendimiento from "src/app/Shared/pages/DetalleProyectoEmprendimiento/Emprendimientos";
import Emprendedor from "src/app/Shared/components/DetalleProyectoEmprendimiento/emprendedor";

import { AdministradorContext } from "src/app/Administrador/contexts/AdministradorContext";

function TabAdministrador() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState("ruta");
  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");
  // const { userData } = useContext(AdminEmprendedorContext);

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="ruta" title="Estado Ruta">
        <RutaAdministrador
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
        />
      </Tab>

      <Tab eventKey="emprendedor" title="Información del Emprendedor">
        <Emprendedor emprendedorId={state.emprendedorId} />
      </Tab>

      <Tab eventKey="emprendimientos" title="Información del Emprendimiento">
        <Emprendimiento idEmprendimiento={state.emprendimientoId} />
      </Tab>

      <Tab eventKey="primera_atencion" title="Información de Primera Atención">
        <PrimeraAtencion
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
        />
      </Tab>

      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
          idEmprendedor={state.emprendedorId}
          idEtapaRuta={state.idEstadoRuta}
          tipoUsuario={"ADMINISTRADOR"}
          idUsuario={userData.id}
          estadoAsesoramiento={state.estadoAsesoramiento}
        />
      </Tab>

      <Tab eventKey="historial" title="Historial Consultorías">
        <HistorialConsultoria
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
        />
      </Tab>

      <Tab eventKey="tareas" title="Tareas">
        <Tareas
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
          tipoUsuario={"ADMINISTRADOR"}
          idUsuario={userData.id}
        />
      </Tab>

      <Tab eventKey="historial_tareas" title="Historial Tareas">
        <HistorialTareas
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
        />
      </Tab>
    </Tabs>
  );
}

export default TabAdministrador;
