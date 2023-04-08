import { useContext } from "react";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import FormEditarCuenta from "src/components/FormEditarCuenta";
import { MentorContext } from "src/services/context/MentorContext";

function EditarCuentaPage() {
  const { userData } = useContext(MentorContext);

  return (
    <>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuentaPage;
