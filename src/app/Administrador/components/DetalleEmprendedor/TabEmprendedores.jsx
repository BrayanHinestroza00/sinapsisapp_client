import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import EmprendedorTab from "src/app/Shared/components/DetalleEmprendedor/Emprendedor";
import EmprendimientosTab from "src/app/Shared/components/DetalleEmprendedor/Emprendimientos";
import Consultorias from "src/app/Shared/components/DetalleEmprendedor/Consultorias";

import { AdministradorContext } from "../../contexts/AdministradorContext";

function TabEmprendedores() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState();

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="emprendedor" title="Emprendedor">
        <EmprendedorTab idEmprendedor={state.id} />
      </Tab>
      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <EmprendimientosTab idEmprendedor={state.id} />
      </Tab>
      <Tab eventKey="consultorias" title="Consultorías Programadas">
        <Consultorias idEmprendedor={state.id} />
      </Tab>
    </Tabs>
  );
}

export default TabEmprendedores;
