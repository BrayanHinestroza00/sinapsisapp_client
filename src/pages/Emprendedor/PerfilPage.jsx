import { useContext, useState } from "react";
import { Boton } from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  Titulo,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EditarPerfil from "src/components/emprendedor/perfil_emprendedor/EditarPerfil";
import VerPerfil from "src/components/emprendedor/perfil_emprendedor/VerPerfil";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_EMPRENDEDOR,
} from "src/utils/apiConstants";

function PerfilPage() {
  const { userData } = useContext(EmprendedorContext);
  const [allowEdit, setAllowEdit] = useState(false);

  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
  } = useFetch({
    URL: URL_OBTENER_INFO_EMPRENDEDOR,
    requestOptions: {
      method: HTTP_METHOD_GET,
      params: {
        idUsuario: userData.id,
      },
    },
  });

  if (loadingFetch || !preloadData) {
    return <h1>LOADING...</h1>;
  }

  if (errorFetch) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{errorFetch}</p>
      </>
    );
  }

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
              <EditarPerfil
                allowEdit={allowEdit}
                setAllowEdit={setAllowEdit}
                preloadData={preloadData}
              />
            ) : (
              <VerPerfil preloadData={preloadData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;
