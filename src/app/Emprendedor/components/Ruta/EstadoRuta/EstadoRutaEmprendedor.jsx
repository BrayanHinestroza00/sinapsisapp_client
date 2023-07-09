import { useEffect, useContext, useState } from "react";

import AvanceRuta from "src/app/Shared/components/DetalleProyectoEmprendimiento/ruta/AvanceRuta";
import EstadoRuta from "src/app/Shared/components/DetalleProyectoEmprendimiento/ruta/EstadoRuta";

import {
  SpanAuxiliar,
  CardRuta,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { obtenerNombreEtapa } from "src/app/Shared/utils/utilityFunctions";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

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
    return <LoadingSpinner width="5rem" height="5rem" />;
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
      <CardRuta className="mb-3">
        <Ruta>
          <Subtitulo>
            Actualmente se encuentra en la etapa:
            <SpanAuxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </SpanAuxiliar>
          </Subtitulo>
          <EstadoRuta etapa={preloadData.idEtapa} />
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <Subtitulo>
            Mi avance en la ruta de I&E en la etapa:
            <SpanAuxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </SpanAuxiliar>
          </Subtitulo>
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
