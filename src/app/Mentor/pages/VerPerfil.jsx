import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import VerPerfilComponent from "src/app/Shared/components/PerfilUsuario/VerPerfil";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import EditarPerfil from "src/app/Shared/components/PerfilUsuario/EditarPerfil";

import { Subtitulo, Titulo } from "src/app/Shared/assets/styles/Common";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_MENTOR,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_PERFIL_MENTOR } from "src/app/Shared/utils/constants";

function VerPerfil() {
  const navigate = useNavigate();
  const { userData, setShowSidebar } = useContext(MentorContext);
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
        URL: URL_OBTENER_INFO_MENTOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userData.id,
          },
        },
      });
    }
  }, [userData]);

  const onHandleBack = () => {
    setShowSidebar(true);
    navigate("/Mentor");
  };

  const onReload = () => {
    fetchAPI({
      URL: URL_OBTENER_INFO_MENTOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: userData.id,
        },
      },
    });
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
    <div className="container-fluid">
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
                  <Titulo className="m-0 mb-3">Información del Mentor</Titulo>
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
                    tipoUsuario={SINAPSIS_APP_PERFIL_MENTOR}
                    onReload={onReload}
                  />
                ) : (
                  <VerPerfilComponent datos={preloadData} />
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default VerPerfil;
