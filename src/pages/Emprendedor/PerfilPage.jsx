import { useState } from "react";
import { Boton } from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  Titulo,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EditarPerfil from "src/components/emprendedor/perfil_emprendedor/EditarPerfil";
import VerPerfil from "src/components/emprendedor/perfil_emprendedor/VerPerfil";

function PerfilPage() {
  const [allowEdit, setAllowEdit] = useState(false);
  return (
    <>
      <Titulo>Mi perfil</Titulo>

      <div className="container mb-5">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <SubTitulo className="m-0">Información del Emprendedor</SubTitulo>
              {allowEdit === false && (
                <Boton
                  type="button"
                  className="btn btn-primary m-0"
                  onClick={() => setAllowEdit(!allowEdit)}
                >
                  Editar datos
                </Boton>
              )}
            </div>

            {allowEdit ? (
              <EditarPerfil allowEdit={allowEdit} setAllowEdit={setAllowEdit} />
            ) : (
              <VerPerfil allowEdit={allowEdit} setAllowEdit={setAllowEdit} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;
