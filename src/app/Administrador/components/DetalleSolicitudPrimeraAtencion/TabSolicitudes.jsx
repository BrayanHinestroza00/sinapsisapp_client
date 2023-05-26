import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

import { AdministradorContext } from "../../contexts/AdministradorContext";
import EmprendedorTab from "src/app/Shared/components/DetalleEmprendedor/Emprendedor";
import EmprendimientoTab from "src/app/Shared/pages/DetalleProyectoEmprendimiento/Emprendimientos";
import PrimeraAtencionTab from "src/app/Administrador/components/DetalleSolicitudPrimeraAtencion/PrimeraAtencion";
import { Card } from "src/app/Shared/assets/styles/Common";

function TabSolicitudes() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState();

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="emprendedor" title="Emprendedor">
        <EmprendedorTab idEmprendedor={state.emprendedorId} />
      </Tab>
      <Tab eventKey="emprendimientos" title="Emprendimientos">
        <EmprendimientoTab idEmprendimiento={state.emprendimientoId} />
      </Tab>
      <Tab eventKey="primera_atencion" title="Primera Atención">
        <Card>
          <PrimeraAtencionTab
            idProyectoEmprendimiento={state.proyectoEmprendimientoId}
          />
        </Card>
      </Tab>
    </Tabs>
  );
}

export default TabSolicitudes;
