import { useEffect } from "react";

import PerfilEmprendedor from "src/app/Shared/components/PerfilEmprendedor";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
  Card,
  CardRuta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";

function EmprendedorTab({ idEmprendedor }) {
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
          idUsuario: idEmprendedor,
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
            marginLeft: "2rem",
            marginRight: "2rem",
            marginBottom: "2rem",
            padding: "15px 16px 30px 14px",
          }}
        >
          <Subtitulo>Datos del emprendedor</Subtitulo>
          <PerfilEmprendedor preloadData={preloadData} />
        </div>
      </CardRuta>
    </Card>
  );
}

export default EmprendedorTab;
