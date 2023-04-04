import { useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  CardRuta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import VerPerfil from "src/components/emprendedor/perfil_emprendedor/VerPerfil";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_EMPRENDEDOR,
} from "src/utils/apiConstants";

function EmprendedorAdmin({ idEmprendedor }) {
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
          <SubTitulo>Datos del emprendedor</SubTitulo>
          <VerPerfil preloadData={preloadData} />
        </div>
      </CardRuta>
    </Card>
  );
}

export default EmprendedorAdmin;
