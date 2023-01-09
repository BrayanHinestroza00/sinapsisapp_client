import React from "react";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import FormEditarCuenta from "src/components/FormEditarCuenta";
import MentorLayout from "src/layouts/MentorLayout";

function EditarCuentaPage() {
  return (
    <MentorLayout sidebar={true}>
      <>
        <Titulo>Configuración de la Cuenta</Titulo>
        <FormEditarCuenta />
      </>
    </MentorLayout>
  );
}

export default EditarCuentaPage;
