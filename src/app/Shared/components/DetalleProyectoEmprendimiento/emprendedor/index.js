import { useEffect } from "react";

import PerfilEmprendedor from "src/app/Shared/components/PerfilEmprendedor";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { Card, Subtitulo } from "src/app/Shared/assets/styles/Common";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";

function Emprendedor({ emprendedorId }) {
  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_INFO_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: emprendedorId,
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
      <Subtitulo>Información de emprendedor</Subtitulo>

      <PerfilEmprendedor preloadData={preloadData} />
    </Card>
  );
}

export default Emprendedor;
