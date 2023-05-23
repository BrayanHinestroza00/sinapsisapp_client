import { useContext, useEffect, useState } from "react";

import ProyectoEmprendimiento from "src/app/Shared/components/DetalleProyectoEmprendimiento/emprendimientos/FormEmprendimiento";

import { CardRuta, Ruta, Titulo } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_EMPRENDEDIMIENTO,
  URL_OBTENER_REDES_SOCIALES,
} from "src/app/Shared/utils/apiConstants";

function Emprendimiento() {
  const {
    userData,
    selectedProjectIndex,
    loading: loadingContext,
  } = useContext(EmprendedorContext);

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
    if (userData != null && selectedProjectIndex != null && datos == null) {
      fetchAPI({
        URL: URL_OBTENER_EMPRENDEDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idEmprendimiento,
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
    }
  }, [userData, selectedProjectIndex]);

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

  if (
    loadingContext ||
    loading ||
    loadingComponent ||
    redesLoading ||
    !preloadData ||
    !datos
  ) {
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
    <>
      <Titulo>Información del Proyecto de Emprendimiento</Titulo>

      <CardRuta>
        <Ruta>
          <ProyectoEmprendimiento
            datos={datos}
            setDatos={setDatos}
            redesData={redesData}
            editable={true}
          />
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Emprendimiento;
