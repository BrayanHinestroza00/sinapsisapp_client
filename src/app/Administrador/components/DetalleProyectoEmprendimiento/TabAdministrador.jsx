import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import { AdministradorContext } from "src/app/Administrador/contexts/AdministradorContext";

import RutaAdministrador from "./Ruta/RutaAdministrador";
import Emprendimiento from "src/app/Shared/pages/DetalleProyectoEmprendimiento/Emprendimientos";
import Consultorias from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/Consultorias";
import HistorialConsultoria from "src/app/Shared/components/DetalleProyectoEmprendimiento/consultorias/HistorialConsultoria";
import Tareas from "src/app/Shared/components/DetalleProyectoEmprendimiento/tareas/Tareas";
import HistorialTareas from "src/app/Shared/components/DetalleProyectoEmprendimiento/tareas/HistorialTareas";

function TabAdministrador() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState("ruta");
  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");
  // const { userData } = useContext(AdminEmprendedorContext);

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="ruta" title="Ruta">
        <RutaAdministrador
          idProyectoEmprendimiento={state.proyectoEmprendimientoId}
        />
      </Tab>

      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <Emprendimiento idEmprendimiento={state.emprendimientoId} />
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
        <Tareas idProyectoEmprendimiento={state.proyectoEmprendimientoId} />
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
