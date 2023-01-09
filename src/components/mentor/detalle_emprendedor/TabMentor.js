import React, { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import Consultorias from "./consultoria/Consultoria";
// import Ruta from "./ruta/Ruta";
// import Diagnostico from "./diagnostico/Diagnostico";
// import Historial from "../../../Shared/components/Historial/Historial";

// import { useLocalStorage } from "../../../Shared/hooks/useLocalStorage";

import { MentorEmprendedorContext } from "src/services/context/MentorEmprendedorContext";
import RutaMentor from "./ruta/RutaMentor";
import ProyectoMentor from "./emprendimientos/ProyectoMentor";
import HistorialConsultoria from "./consultoria/HistorialConsultoria";

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
