import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import AvanceRuta from "src/components/AvanceRuta";
import EstadoRuta from "src/components/EstadoRuta";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR,
} from "src/utils/apiConstants";
import { obtenerNombreEtapa } from "src/utils/functions";
import FinalizarAsesoramiento from "./FinalizarAsesoramiento";
import { SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR } from "src/utils/constants";

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
        <SubTitulo>Estado de la ruta de I&E de SINAPSIS UAO</SubTitulo>

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
      <SubTitulo>Estado de la ruta de I&E de SINAPSIS UAO</SubTitulo>
      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <SubTitulo>
            Actualmente el emprendedor se encuentra en la etapa:{" "}
            <Auxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </Auxiliar>
          </SubTitulo>
          <EstadoRuta etapa={preloadData.idEtapa} />
        </Ruta>
      </CardRuta>

      <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
        <Ruta>
          <SubTitulo>
            Avance en la ruta de I&E del emprendedor en la etapa:{" "}
            <Auxiliar className="text-muted">
              {obtenerNombreEtapa(preloadData.idEtapa)}
            </Auxiliar>
          </SubTitulo>
          <AvanceRuta preloadData={preloadData} />
        </Ruta>
      </CardRuta>

      {preloadData.estadoRuta ==
        SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR &&
        preloadData.idMentor == userData.id && (
          <CardRuta style={{ marginTop: "0rem", marginBottom: "0rem" }}>
            <Ruta>
              <SubTitulo>Finalizar Acompañamiento: </SubTitulo>
              <FinalizarAsesoramiento preloadData={preloadData} />
            </Ruta>
          </CardRuta>
        )}
    </Card>
  );
}

export default RutaMentor;
