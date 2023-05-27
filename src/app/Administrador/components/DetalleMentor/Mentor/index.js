import { useEffect } from "react";

import VerPerfil from "src/app/Shared/components/PerfilUsuario/VerPerfil";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  Card,
  CardRuta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_ADMINISTRADOR,
} from "src/app/Shared/utils/apiConstants";

function Mentor({ idMentor }) {
  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_INFO_ADMINISTRADOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: idMentor,
        },
      },
    });
  }, []);

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
    <Card>
      <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <Subtitulo>Datos del Mentor</Subtitulo>
          <VerPerfil datos={preloadData} />
        </div>
      </CardRuta>
    </Card>
  );
}

export default Mentor;
