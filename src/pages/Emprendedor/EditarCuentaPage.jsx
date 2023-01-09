import React from "react";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import FormEditarCuenta from "src/components/FormEditarCuenta";
import EmprendedorLayout from "src/layouts/EmprendedorLayout";

function EditarCuentaPage() {
  return (
    <EmprendedorLayout sidebar={false}>
      <>
        <Titulo>Configuración de la Cuenta</Titulo>
        <FormEditarCuenta />
      </>
    </EmprendedorLayout>
  );
}

export default EditarCuentaPage;
