import { useEffect } from "react";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { useFetch } from "src/services/hooks/useFetch";
import { HTTP_METHOD_GET, URL_OBTENER_ANUNCIOS } from "src/utils/apiConstants";
import Anuncio from "./Anuncio";

// const data = [
//   {
//     dAnuncio: 1,
//     titulo: "Gran Vitrina Verde",
//     descripcion:
//       "La Gran Vitrina Verde, se llevará a cabo el 25 de noviembre en el Bulevar del Río Cali, evento de región que tendrá productos y servicios de 100 negocios verdes. 📣♻️",
//     urlAnuncio:
//       "/anuncios/315222325_3267776200103231_4392146787720809758_n.jpg",
//     fechaCreacion: "2023-04-21 11:39:00",
//   },
// ];
//const data = [];

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
