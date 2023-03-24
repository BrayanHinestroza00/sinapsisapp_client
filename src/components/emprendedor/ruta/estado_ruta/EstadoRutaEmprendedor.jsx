import { useEffect, useContext, useState } from "react";

import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EstadoRuta from "src/components/EstadoRuta";
import AvanceRuta from "src/components/AvanceRuta";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
} from "src/utils/apiConstants";
import { obtenerNombreEtapa } from "src/utils/functions";

function EstadoRutaEmprendedor() {
  const { userData, selectedProjectIndex, loading } =
    useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);

  // Custom Hooks
  const {
    data: preloadData,
    message: messageFetch,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI: fetchApiRuta,
  } = useFetch();

  useEffect(() => {
    if (userData && selectedProjectIndex != null) {
      fetchApiRuta({
        URL: URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        },
      }).then(() => setLoadingComponent(false));
    }
  }, [userData, selectedProjectIndex]);

  if (loadingFetch || loading || loadingComponent || !preloadData) {
    return <>LOADING EstadoRutaEmprendedor</>;
  }

  if (messageFetch) {
    return (
      <>
        <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

        <CardRuta>
          <Ruta>
            <p>{messageFetch}</p>
          </Ruta>
        </CardRuta>
      </>
    );
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
      <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>
      <CardRuta>
        <Ruta>
          <SubTitulo>
            Actualmente se encuentra en la etapa:{" "}
            <Auxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </Auxiliar>
          </SubTitulo>
          <EstadoRuta etapa={preloadData.idEtapa} />
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <SubTitulo>
            Mi Avance en la ruta de I&E en la etapa:{" "}
            <Auxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </Auxiliar>
          </SubTitulo>
          <AvanceRuta
            preloadData={preloadData}
            userData={userData}
            selectedProjectIndex={selectedProjectIndex}
          />
        </Ruta>
      </CardRuta>
    </>
  );
}

export default EstadoRutaEmprendedor;
