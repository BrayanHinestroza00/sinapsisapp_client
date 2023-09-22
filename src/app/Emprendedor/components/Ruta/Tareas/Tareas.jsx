import { Titulo } from "src/app/Shared/assets/styles/Common";
import TabTareas from "./Tabs";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { useContext } from "react";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

function Tareas() {
  const { userData, selectedProjectIndex, loading } =
    useContext(EmprendedorContext);

  if (loading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  } else {
    console.log("asd", { userData, selectedProjectIndex, loading });
    return (
      <>
        <Titulo>Mis Retos</Titulo>
        <TabTareas
          idProyectoEmprendimiento={
            userData.proyectosEmprendimiento[selectedProjectIndex]
              .idProyectoEmprendimiento
          }
        />
      </>
    );
  }
}

export default Tareas;
