import { useEffect } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Anuncio from "./Anuncio";

import {
  HTTP_METHOD_GET,
  URL_OBTENER_ANUNCIOS,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { ListadoAnuncioSubtitulo } from "./styled.js";

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
    return <LoadingSpinner width="5rem" height="5rem" />;
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
          <ListadoAnuncioSubtitulo>
            No se encontró ningún anuncio publicado en el sistema
          </ListadoAnuncioSubtitulo>
        </>
      )}
    </>
  );
}

export default ListadoAnuncios;
