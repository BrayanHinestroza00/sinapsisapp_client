import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import ProyectoEmprendimiento from "src/components/ProyectoEmprendimiento";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDIMIENTOS,
  URL_OBTENER_REDES_SOCIALES,
} from "src/utils/apiConstants";

function ProyectosEmprendedor({ idEmprendedor }) {
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
    // console.log("ProyectosEmprendedor", {
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

  return (
    <Card>
      {preloadData && preloadData.length > 1 ? (
        <>
          <SubTitulo>Seleccione el proyecto... </SubTitulo>
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
                <SubTitulo>
                  Información del proyecto:{" "}
                  <Auxiliar className="text-muted">
                    {datos.nombreEmprendimiento}
                  </Auxiliar>
                </SubTitulo>
                <ProyectoEmprendimiento
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
          <SubTitulo>No hay proyectos de emprendimiento registrados</SubTitulo>
        </CardRuta>
      )}
    </Card>
  );
}

export default ProyectosEmprendedor;
