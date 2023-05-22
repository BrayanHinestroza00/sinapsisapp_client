import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { AdministradorContext } from "../../contexts/AdministradorContext";

function TabMentores() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState();

  <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
    <Tab eventKey="mentor" title="Mentor">
      <div>Mentor Info</div>
      {/* <EmprendedorAdmin idEmprendedor={state.id} /> */}
    </Tab>

    <Tab eventKey="consultorias" title="Consultorías Programadas">
      <div>Consultorias</div>
      {/* <Consultorias idEmprendedor={state.id} /> */}
    </Tab>
  </Tabs>;
}

export default TabMentores;
