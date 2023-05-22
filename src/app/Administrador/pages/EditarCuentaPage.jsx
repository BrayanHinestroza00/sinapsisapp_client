import { useContext } from "react";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { AdministradorContext } from "../contexts/AdministradorContext";

function EditarCuentaPage() {
  const { userData } = useContext(AdministradorContext);
  return (
    <>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuentaPage;
