import { useContext, useEffect } from "react";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";

function EditarCuenta() {
  const { userData, setShowSidebar } = useContext(MentorContext);

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

export default EditarCuenta;
