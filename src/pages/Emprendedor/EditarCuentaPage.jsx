import React from "react";
import {
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EmprendedorLayout from "src/layouts/EmprendedorLayout";

function EditarCuentaPage() {
  return (
    <EmprendedorLayout sidebar={false}>
      <>
        <Titulo>Configuración de la Cuenta</Titulo>
        <div className="container mb-5">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <SubTitulo className="m-0">
                  Información del Emprendedor
                </SubTitulo>
              </div>
            </div>
          </div>
        </div>
      </>
    </EmprendedorLayout>
  );
}

export default EditarCuentaPage;
