import { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { MentorEmprendedorContext } from "src/services/context/MentorEmprendedorContext";
import RutaMentor from "src/components/detalle_emprendedor/ruta/RutaMentor";
import Consultorias from "src/components/detalle_emprendedor/consultoria/Consultoria";
import HistorialConsultoria from "src/components/detalle_emprendedor/consultoria/HistorialConsultoria";
import ProyectoMentor from "src/components/detalle_emprendedor/emprendimientos/ProyectoMentor";

function TabMentor() {
  const [key, setKey] = useState("ruta");
  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");
  const { userData } = useContext(MentorEmprendedorContext);
  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="ruta" title="Ruta">
        <RutaMentor cedula={userData.cedulaEmprendedor} />
      </Tab>

      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <ProyectoMentor />
      </Tab>

      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias />
      </Tab>

      <Tab eventKey="historial" title="Historial Consultorías">
        <HistorialConsultoria />
      </Tab>
    </Tabs>
  );
}

export default TabMentor;
