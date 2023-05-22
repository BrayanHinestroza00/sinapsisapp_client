import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import AvanceRuta from "src/app/Shared/components/DetalleEmprendedor/ruta/AvanceRuta";
import EstadoRuta from "src/app/Shared/components/DetalleEmprendedor/ruta/EstadoRuta";
import FinalizarAsesoramiento from "./FinalizarAsesoramiento";

import {
  SpanAuxiliar,
  CardRuta,
  Ruta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import { obtenerNombreEtapa } from "src/app/Shared/utils/utilityFunctions.js";
import { SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR } from "src/app/Shared/utils/constants";

function RutaMentor({ idProyectoEmprendimiento, userData }) {
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
    fetchApiRuta({
      URL: URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
        },
      },
    }).then(() => setLoadingComponent(false));
  }, []);

  if (loadingFetch || loadingComponent /*|| !preloadData*/) {
    // console.log("RutaMentor", {
    //   loadingFetch,
    //   loadingComponent,
    //   dt: { preloadData, messageFetch, errorFetch },
    // });
    return <>LOADING RutaMentor</>;
  }

  if (messageFetch) {
    return (
      <Card>
        <Subtitulo>Estado de la ruta de I&E de SINAPSIS UAO</Subtitulo>

        <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
          <Ruta>
            <p>{messageFetch}</p>
          </Ruta>
        </CardRuta>
      </Card>
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
    <Card>
      <Subtitulo>Estado de la ruta de I&E de SINAPSIS UAO</Subtitulo>
      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <Subtitulo>
            Actualmente el emprendedor se encuentra en la etapa:{" "}
            <SpanAuxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </SpanAuxiliar>
          </Subtitulo>
          <EstadoRuta etapa={preloadData.idEtapa} />
        </Ruta>
      </CardRuta>

      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <Subtitulo>
            Avance en la ruta de I&E del emprendedor en la etapa:{" "}
            <SpanAuxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </SpanAuxiliar>
          </Subtitulo>
          <AvanceRuta preloadData={preloadData} />
        </Ruta>
      </CardRuta>

      {preloadData.estadoRuta ==
        SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR &&
        preloadData.idMentor == userData.id && (
          <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
            <Ruta>
              <Subtitulo>Finalizar Acompañamiento: </Subtitulo>
              <FinalizarAsesoramiento preloadData={preloadData} />
            </Ruta>
          </CardRuta>
        )}
    </Card>
  );
}

export default RutaMentor;
