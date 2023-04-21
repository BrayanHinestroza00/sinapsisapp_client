import { useLocation } from "react-router-dom";
import {
  Auxiliar,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import TabAdministrador from "src/components/administrador/TabAdministrador";

function DetalleMentorPage() {
  const { state } = useLocation();
  return (
    <>
      <Titulo>
        Mentor: <Auxiliar>{`${state.nombreCompleto}`}</Auxiliar>
      </Titulo>
      <TabAdministrador />
    </>
  );
}

export default DetalleMentorPage;
