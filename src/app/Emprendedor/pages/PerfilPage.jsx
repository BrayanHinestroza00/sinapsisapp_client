import { useContext, useEffect, useState } from "react";

import EditarPerfil from "src/app/Emprendedor/components/Perfil/EditarPerfil";
import VerPerfil from "src/app/Emprendedor/components/Perfil/VerPerfil";

import { Titulo, Subtitulo } from "src/app/Shared/assets/styles/Common";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { Button } from "react-bootstrap";

function PerfilPage() {
  const { userData } = useContext(EmprendedorContext);
  const [allowEdit, setAllowEdit] = useState(false);

  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    if (userData) {
      fetchAPI({
        URL: URL_OBTENER_INFO_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userData.id,
          },
        },
      });
    }
  }, [userData]);

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
              <Subtitulo className="m-0">Información del Emprendedor</Subtitulo>
              {allowEdit === false && (
                <Button
                  type="button"
                  className="btn btn-primary m-0"
                  onClick={() => setAllowEdit(!allowEdit)}
                >
                  Editar datos
                </Button>
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
