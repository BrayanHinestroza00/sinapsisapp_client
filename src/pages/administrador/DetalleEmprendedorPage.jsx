import { useLocation } from "react-router-dom";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import TabAdministrador from "src/components/administrador/TabAdministrador";

function DetalleEmprendedorPage() {
  const { state } = useLocation();

  return (
    <>
      <Titulo>{`${state.nombres} ${state.apellidos}`}</Titulo>
      <TabAdministrador />
    </>
  );
}

export default DetalleEmprendedorPage;
