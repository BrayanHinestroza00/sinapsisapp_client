import { useContext, useEffect } from "react";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";

function EditarCuentaPage() {
  const { userData, setShowSidebar } = useContext(EmprendedorContext);

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  return (
    <>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuentaPage;
