import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Mentor from "./Mentor";
import Consultorias from "./Consultorias";
import ProyectosEmprendimiento from "./ProyectosEmprendimiento";

function TabMentores() {
  const { state } = useLocation();
  const [key, setKey] = useState();

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="mentor" title="Información del Mentor">
        <Mentor idMentor={state.id} />
      </Tab>

      <Tab eventKey="proyectos" title="Emprendimientos Asociados">
        <ProyectosEmprendimiento idMentor={state.id} />
      </Tab>

      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias idMentor={state.id} />
      </Tab>
    </Tabs>
  );
}

export default TabMentores;
