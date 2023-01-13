import { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { AdminEmprendedorContext } from "src/services/context/AdminEmprendedorContext";
import Consultorias from "src/components/detalle_emprendedor/consultoria/Consultoria";
import RutaMentor from "src/components/detalle_emprendedor/ruta/RutaMentor";
import ProyectoMentor from "src/components/detalle_emprendedor/emprendimientos/ProyectoMentor";
import Tareas from "src/components/administrador/tareas/Tareas";
import HistorialConsultoria from "src/components/detalle_emprendedor/consultoria/HistorialConsultoria";

function TabAdministrador() {
  const [key, setKey] = useState("ruta");
  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");
  const { userData } = useContext(AdminEmprendedorContext);
  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="ruta" title="Ruta">
        <RutaMentor cedula={userData.cedulaEmprendedor} />
      </Tab>

      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <ProyectoMentor />
      </Tab>

      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias userData={userData} />
      </Tab>

      <Tab eventKey="historial" title="Historial Consultorías">
        <HistorialConsultoria />
      </Tab>

      <Tab eventKey="tareas" title="Tareas">
        <Tareas cedula={userData.cedulaEmprendedor} nombre={userData.nombre} />
      </Tab>
    </Tabs>
  );
}

export default TabAdministrador;
