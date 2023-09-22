import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import HistorialTareas from "./HistorialTareas";
import TareasEntregadas from "./TareasEntregadas";
import TareasPendientes from "./TareasPendientes";

function TabTareas({ idProyectoEmprendimiento }) {
  const [key, setKey] = useState("pendientes");

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="pendientes" title="Retos Pendientes">
        <TareasPendientes idProyectoEmprendimiento={idProyectoEmprendimiento} />
      </Tab>

      <Tab eventKey="entregadas" title="Retos Entregados">
        <TareasEntregadas idProyectoEmprendimiento={idProyectoEmprendimiento} />
      </Tab>

      <Tab eventKey="historial" title="Historial de Retos">
        <HistorialTareas idProyectoEmprendimiento={idProyectoEmprendimiento} />
      </Tab>
    </Tabs>
  );
}

export default TabTareas;
