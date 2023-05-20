import { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import Consultorias from "src/components/detalle_emprendedor/consultoria/Consultoria";
import RutaMentor from "src/components/detalle_emprendedor/ruta/RutaMentor";
import Tareas from "src/components/administrador/tareas/Tareas";
import HistorialConsultoria from "src/components/detalle_emprendedor/consultoria/HistorialConsultoria";
import { useLocation } from "react-router-dom";
import ProyectoAdmin from "./detalle_primera_atencion/ProyectoAdmin";
import ProyectoMentor from "../detalle_emprendedor/emprendimientos/ProyectoMentor";
import EmprendedorAdmin from "./detalle_primera_atencion/EmprendedorAdmin";
import PrimeraAtencionAdmin from "./detalle_primera_atencion/PrimeraAtencionAdmin";
import ProyectosEmprendedor from "./detalle_emprendedor/ProyectosEmprendedor";
import { AdministradorContext } from "src/services/context/AdministradorContext";
import HistorialTareas from "./tareas/HistorialTareas";

function TabAdministrador() {
  const { userData } = useContext(AdministradorContext);
  const { state } = useLocation();
  const [key, setKey] = useState();
  // const [key, setKey] = useLocalStorage("key_for_tab", "ruta");
  // const { userData } = useContext(AdminEmprendedorContext);

  useEffect(() => {
    if (state.type == "SOLICITUDES") {
      setKey("emprendedor");
    } else if (state.type == "EMPRENDIMIENTOS") {
      setKey("ruta");
    } else {
      setKey("emprendedor");
    }
  }, []);

  if (state.type == "SOLICITUDES") {
    return (
      <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
        <Tab eventKey="emprendedor" title="Emprendedor">
          <EmprendedorAdmin idEmprendedor={state.emprendedorId} />
        </Tab>
        <Tab eventKey="emprendimientos" title="Emprendimientos">
          <ProyectoAdmin idEmprendimiento={state.emprendimientoId} />
        </Tab>
        <Tab eventKey="primera_atencion" title="Primera Atencion">
          <PrimeraAtencionAdmin
            idProyectoEmprendimiento={state.proyectoEmprendimientoId}
          />
        </Tab>
      </Tabs>
    );
  } else if (state.type == "EMPRENDIMIENTOS") {
    return (
      <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
        <Tab eventKey="ruta" title="Ruta">
          <RutaMentor
            idProyectoEmprendimiento={state.proyectoEmprendimientoId}
            userData={userData}
          />
        </Tab>

        <Tab eventKey="emprendimientos" title="Emprendimientos">
          <ProyectoMentor idEmprendimiento={state.emprendimientoId} />
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
  } else {
    return (
      <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
        <Tab eventKey="emprendedor" title="Emprendedor">
          <EmprendedorAdmin idEmprendedor={state.id} />
        </Tab>
        <Tab eventKey="emprendimientos" title="Emprendimientos">
          <ProyectosEmprendedor idEmprendedor={state.id} />
        </Tab>
        <Tab eventKey="consultorias" title="Consultorías Programadas">
          <Consultorias idEmprendedor={state.id} />
        </Tab>
      </Tabs>
    );
  }
}

export default TabAdministrador;
