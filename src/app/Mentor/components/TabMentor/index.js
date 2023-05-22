import { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import RutaMentor from "src/app/Mentor/components/DetalleEmprendedor/Ruta/RutaMentor";
import Consultorias from "src/app/Shared/components/DetalleEmprendedor/consultoria/Consultoria";
import HistorialConsultoria from "src/app/Shared/components/DetalleEmprendedor/consultoria/HistorialConsultoria";
import ProyectoMentor from "src/app/Mentor/components/DetalleEmprendedor/Ruta/Emprendimientos/ProyectoMentor";

import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";

function TabMentor() {
  const { userData } = useContext(MentorContext);

  const { state } = useLocation();
  const [key, setKey] = useState("ruta");

  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="ruta" title="Ruta">
        <RutaMentor
          idProyectoEmprendimiento={state.idProyectoEmprendimiento}
          userData={userData}
        />
      </Tab>

      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <ProyectoMentor idEmprendimiento={state.idEmprendimiento} />
      </Tab>

      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias
          idEmprendedor={state.idEmprendedor}
          idProyectoEmprendimiento={state.idProyectoEmprendimiento}
          idEtapaRuta={state.idEstadoRuta}
          tipoUsuario={"MENTOR"}
          idUsuario={userData.id}
          estadoAsesoramiento={state.estadoAsesoramiento}
        />
      </Tab>

      <Tab eventKey="historial" title="Historial Consultorías">
        <HistorialConsultoria
          idProyectoEmprendimiento={state.idProyectoEmprendimiento}
        />
      </Tab>
    </Tabs>
  );
}

export default TabMentor;
