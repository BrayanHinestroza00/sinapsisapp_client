import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import VerPerfil from "src/app/Shared/components/PerfilUsuario/VerPerfil";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import EditarPerfil from "src/app/Shared/components/PerfilUsuario/EditarPerfil";

import { Subtitulo, Titulo } from "src/app/Shared/assets/styles/Common";
import { AdministradorContext } from "../contexts/AdministradorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_ADMINISTRADOR,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_PERFIL_ADMINISTRADOR } from "src/app/Shared/utils/constants";

function VerPerfilPage() {
  const navigate = useNavigate();
  const { userData, setShowSidebar } = useContext(AdministradorContext);
  const [allowEdit, setAllowEdit] = useState(false);

  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  useEffect(() => {
    if (userData) {
      fetchAPI({
        URL: URL_OBTENER_INFO_ADMINISTRADOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userData.id,
          },
        },
      });
    }
  }, [userData]);

  const onReload = () => {
    fetchAPI({
      URL: URL_OBTENER_INFO_ADMINISTRADOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: userData.id,
        },
      },
    });
  };

  const onHandleBack = () => {
    setShowSidebar(true);
    navigate("/Administrador");
  };

  if (loadingFetch || !preloadData) {
    return <LoadingSpinner width="5rem" height="5rem" />;
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
    <div className="d-flex flex-column">
      <button
        style={{ display: "block", width: "10rem", marginTop: "1rem" }}
        className="btn btn-primary"
        onClick={onHandleBack}
      >
        Volver al inicio
      </button>
      <>
        <Titulo>Mi perfil</Titulo>

        <div className="container mb-5">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <Subtitulo className="m-0">
                  Información del Administrador
                </Subtitulo>
                {allowEdit === false && (
                  <Button
                    type="button"
                    variant="primary"
                    className="m-0"
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
                  tipoUsuario={SINAPSIS_APP_PERFIL_ADMINISTRADOR}
                  onReload={onReload}
                />
              ) : (
                <VerPerfil datos={preloadData} />
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default VerPerfilPage;
