import { useContext } from "react";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";

function EditarCuenta() {
  const { userData } = useContext(MentorContext);

  return (
    <>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuenta;
