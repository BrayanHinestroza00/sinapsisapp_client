import { useEffect } from "react";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { useFetch } from "src/services/hooks/useFetch";
import { HTTP_METHOD_GET, URL_OBTENER_ANUNCIOS } from "src/utils/apiConstants";
import Anuncio from "./Anuncio";

function ListadoAnuncios() {
  // Custom Hooks
  const { data, message, error, loading, fetchAPI } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_ANUNCIOS,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  if (loading) {
    return <h1>LOADING MentoresPage</h1>;
  }

  if (message) {
    return (
      <>
        <p>{message}</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{error}</p>
      </>
    );
  }
  return (
    <>
      {data && data.length > 0 ? (
        <>
          {data.map((anuncio, index) => {
            return (
              <div key={index}>
                <Anuncio dataAnuncio={anuncio} />
                <hr className="my-4" />
              </div>
            );
          })}
        </>
      ) : (
        <>
          <SubTitulo>No hay anuncios publicados</SubTitulo>
        </>
      )}
    </>
  );
}

export default ListadoAnuncios;
