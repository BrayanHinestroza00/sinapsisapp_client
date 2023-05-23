import { useContext } from "react";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";

function EditarCuentaPage() {
  const { userData } = useContext(EmprendedorContext);
  return (
    <>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuentaPage;
