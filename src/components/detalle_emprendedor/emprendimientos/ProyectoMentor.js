import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import ProyectoEmprendimiento from "src/components/ProyectoEmprendimiento";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDIMIENTO,
  URL_OBTENER_REDES_SOCIALES,
} from "src/utils/apiConstants";

function ProyectoMentor({ idEmprendimiento }) {
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
        fechaConstitucion: preloadData.fechaConstitucion,
        nitEmpresa: preloadData.nit,
        nombreEmpresa: preloadData.nombreEmpresa,
        razonSocialEmpresa: preloadData.razonSocial,
        logoEmpresaUrl: preloadData.urlLogoEmpresa,
      });
    }
  }, [preloadData, redesData]);

  if (loading || loadingComponent || redesLoading || !preloadData || !datos) {
    // console.log("ProyectoMentor", {
    //   loading,
    //   loadingComponent,
    //   redesLoading,
    //   inverted: { preloadData, datos },
    // });

    return <h1>LOADING...</h1>;
  }

  if (error || redesError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{error}</p>
      </>
    );
  }

  // console.log(preloadData);

  return (
    <Card>
      <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        <Ruta>
          <Titulo>
            Información del proyecto de emprendimiento:
            <Auxiliar className="text-muted">
              {datos.nombreEmprendimiento}
            </Auxiliar>
          </Titulo>
          <ProyectoEmprendimiento
            datos={datos}
            redesData={redesData}
            editable={false}
          />
        </Ruta>
      </CardRuta>
    </Card>
  );
}

export default ProyectoMentor;
