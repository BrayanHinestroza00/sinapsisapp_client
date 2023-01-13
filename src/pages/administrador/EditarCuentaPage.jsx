import React from "react";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import FormEditarCuenta from "src/components/FormEditarCuenta";
import AdministradorLayout from "src/layouts/AdministradorLayout";

function EditarCuentaPage() {
  return (
    <AdministradorLayout sidebar={true}>
      <>
        <Titulo>Configuración de la Cuenta</Titulo>
        <FormEditarCuenta />
      </>
    </AdministradorLayout>
  );
}

export default EditarCuentaPage;
