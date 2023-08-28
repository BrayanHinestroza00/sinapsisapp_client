import { useEffect, useState } from "react";

import FormEmprendimiento from "src/app/Shared/components/DetalleProyectoEmprendimiento/emprendimientos/FormEmprendimiento";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  Card,
  SpanAuxiliar,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDIMIENTO,
  URL_OBTENER_REDES_SOCIALES,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA_INPUT } from "src/app/Shared/utils/constants";
import moment from "moment";

function Emprendimiento({ idEmprendimiento }) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [datos, setDatos] = useState(null);

  const { data: preloadData, error, loading, fetchAPI } = useFetch();
  const {
    data: redesData,
    error: redesError,
    loading: redesLoading,
    fetchAPI: fetchApiRedes,
  } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_EMPRENDEDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idEmprendimiento: idEmprendimiento,
        },
      },
    });
    fetchApiRedes({
      URL: URL_OBTENER_REDES_SOCIALES,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
    setLoadingComponent(false);
  }, []);

  useEffect(() => {
    if (preloadData && redesData) {
      let redesSociales = {};

      if (preloadData.redesSociales && preloadData.redesSociales.length > 0) {
        preloadData.redesSociales.forEach((redSocial) => {
          redesSociales = {
            ...redesSociales,
            [redSocial.idRedSocial]: {
              nombre: redSocial.redSocial,
              enlace: redSocial.enlace,
            },
          };
        });
      }

      setDatos({
        idEmprendimiento: preloadData.id,
        nombreEmprendimiento: preloadData.nombreEmprendimiento,
        descripcionProducto: preloadData.descripcionProducto,
        necesidadesIdentificadas: preloadData.necesidadesIdentificadas,
        descripcionClientes: preloadData.descripcionClientes,
        materiasPrimas: preloadData.materiasPrimas,
        enfoqueSocial: preloadData.enfoqueSocial,
        sectorEmprendimiento: preloadData.sectorEmprendimiento,
        sitioWeb: preloadData.sitioWeb,
        redesSociales: redesSociales,
        estaConstituida: preloadData.estaConstituida,
        fechaConstitucion: preloadData.fechaConstitucion
          ? moment(preloadData.fechaConstitucion, "YYYY-MM-DD hh:mm:ss").format(
              SINAPSIS_APP_FORMATO_FECHA_INPUT
            )
          : null,
        nitEmpresa: preloadData.nit,
        nombreEmpresa: preloadData.nombreEmpresa,
        razonSocialEmpresa: preloadData.razonSocial,
        logoEmpresaUrl: preloadData.urlLogoEmpresa,
      });
    }
  }, [preloadData, redesData]);

  if (loading || loadingComponent || redesLoading || !preloadData || !datos) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (error || redesError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{error}</p>
      </>
    );
  }

  return (
    <Card>
      <Subtitulo>
        Información del proyecto de emprendimiento:
        <SpanAuxiliar className="text-muted">
          {datos.nombreEmprendimiento}
        </SpanAuxiliar>
      </Subtitulo>
      <FormEmprendimiento
        datos={datos}
        redesData={redesData}
        editable={false}
      />
    </Card>
  );
}

export default Emprendimiento;
