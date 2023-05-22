import { useLocation } from "react-router-dom";

import TabEmprendedores from "src/app/Administrador/components/DetalleEmprendedor/TabEmprendedores";

import { Titulo } from "src/app/Shared/assets/styles/Common";

function DetalleEmprendedorPage() {
  const { state } = useLocation();

  return (
    <>
      <Titulo>{`${state.nombres} ${state.apellidos}`}</Titulo>
      <TabEmprendedores />
    </>
  );
}

export default DetalleEmprendedorPage;
