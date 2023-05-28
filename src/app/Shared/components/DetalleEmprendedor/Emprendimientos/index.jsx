import { useEffect, useState } from "react";

import FormEmprendimiento from "src/app/Shared/components/DetalleProyectoEmprendimiento/emprendimientos/FormEmprendimiento";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
  Card,
  SpanAuxiliar,
  CardRuta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDIMIENTOS,
  URL_OBTENER_REDES_SOCIALES,
} from "src/app/Shared/utils/apiConstants";

function Emprendimientos({ idEmprendedor }) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [datos, setDatos] = useState(null);
  const [selected, setSelected] = useState(0);

  const { data: preloadData, error, loading, fetchAPI } = useFetch();
  const {
    data: redesData,
    error: redesError,
    loading: redesLoading,
    fetchAPI: fetchApiRedes,
  } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_EMPRENDEDIMIENTOS,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idEmprendedor: idEmprendedor,
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

      if (
        preloadData[selected].redesSociales &&
        preloadData[selected].redesSociales.length > 0
      ) {
        preloadData[selected].redesSociales.forEach((redSocial) => {
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
        idEmprendimiento: preloadData[selected].id,
        nombreEmprendimiento: preloadData[selected].nombreEmprendimiento,
        descripcionProducto: preloadData[selected].descripcionProducto,
        necesidadesIdentificadas:
          preloadData[selected].necesidadesIdentificadas,
        descripcionClientes: preloadData[selected].descripcionClientes,
        materiasPrimas: preloadData[selected].materiasPrimas,
        enfoqueSocial: preloadData[selected].enfoqueSocial,
        sectorEmprendimiento: preloadData[selected].sectorEmprendimiento,
        sitioWeb: preloadData[selected].sitioWeb,
        redesSociales: redesSociales,
        estaConstituida: preloadData[selected].estaConstituida,
        fechaConstitucion: preloadData[selected].fechaConstitucion,
        nitEmpresa: preloadData[selected].nit,
        nombreEmpresa: preloadData[selected].nombreEmpresa,
        razonSocialEmpresa: preloadData[selected].razonSocial,
        logoEmpresaUrl: preloadData[selected].urlLogoEmpresa,
      });
    }
  }, [preloadData, redesData, selected]);

  const onChangeSelectedProject = (index) => {
    setSelected(index);
  };

  if (loadingComponent || loading) {
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
      {preloadData && preloadData.length > 1 ? (
        <>
          <Subtitulo>Seleccione el proyecto... </Subtitulo>
          <div className="px-3">
            {preloadData.map((proyecto, index) => {
              return (
                <button
                  id={index}
                  className="btn btn-primary mx-1"
                  key={index}
                  onClick={() => onChangeSelectedProject(index)}
                >
                  {proyecto.nombreEmprendimiento}
                </button>
              );
            })}
          </div>
          {datos && (
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
                <Subtitulo>
                  Información del proyecto:
                  <SpanAuxiliar className="text-muted">
                    {datos.nombreEmprendimiento}
                  </SpanAuxiliar>
                </Subtitulo>
                <FormEmprendimiento
                  datos={datos}
                  redesData={redesData}
                  editable={false}
                />
              </div>
            </CardRuta>
          )}
        </>
      ) : (
        <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
          <Subtitulo>No hay proyectos de emprendimiento registrados</Subtitulo>
        </CardRuta>
      )}
    </Card>
  );
}

export default Emprendimientos;
