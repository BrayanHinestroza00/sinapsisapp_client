import { useEffect, useState } from "react";
import moment from "moment";
import { Card } from "react-bootstrap";

import DetalleConsultoria from "src/app/Shared/components/DetalleEmprendedor/consultoria/DetalleConsultoria";
import FlexyTable from "src/app/Shared/components/FlexyTable";

import {
  CardRuta,
  Ruta,
  Subtitulo,
} from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

function HistorialConsultoria({ idProyectoEmprendimiento }) {
  // const [loadingComponent, setLoadingComponent] = useState(true);
  const [consultorias, setConsultorias] = useState([]);
  const [showConsultoria, setShowConsultoria] = useState({ show: false });

  // Custom Hooks
  const {
    data: consultoriasData,
    message: consultoriasMessage,
    error: consultoriasError,
    loading: consultoriasLoading,
    fetchAPI: fetchApiConsultorias,
  } = useFetch();

  useEffect(() => {
    fetchApiConsultorias({
      URL: URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
          tipoBusqueda: "H",
        },
      },
    });

    // setLoadingComponent(false);
  }, []);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            titulo: consultoriaData.tituloConsultoria,
            Tematica: consultoriaData.nombreSubActRuta || "N/A",
            "Fecha Consultoria": moment(
              consultoriaData.fechaConsultoria,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA),
            "Hora Inicio": consultoriaData.horaInicioConsultoria,
            "Hora Finalizacion": consultoriaData.horaFinConsultoria,
            "Creado Por":
              consultoriaData.nombreMentor +
              " " +
              consultoriaData.apellidoMentor,
            "Correo Contacto": consultoriaData.correoInstitucionalMentor,
          };
        });
      }

      setConsultorias(newConsultorias);
    }
  }, [consultoriasData]);

  const onClicDetalleConsultoria = (consultoria) => {
    setShowConsultoria({
      show: true,
      data: consultoriasData[consultoria.n - 1],
    });
  };

  // if (loadingComponent || consultoriasLoading) {
  //   console.log("Loading HistorialConsultoria", {
  //     loadingComponent,
  //     consultoriasLoading,
  //   });
  //   return <h1>LOADING HISTORICO CONSULTORIA</h1>;
  // }

  // if (consultoriasMessage) {
  //   console.log("Message HistorialConsultoria");
  //   return (
  //     <>
  //       <CardRuta>
  //         <Ruta>
  //           <p>{consultoriasMessage}</p>
  //         </Ruta>
  //       </CardRuta>
  //     </>
  //   );
  // }

  // if (consultoriasError) {
  //   console.log("Errpr HistorialConsultoria");
  //   return (
  //     <>
  //       <h1>ERROR</h1>
  //       <p>{consultoriasError}</p>
  //     </>
  //   );
  // }

  // console.log("first", {
  //   consultoriasData,
  //   consultoriasMessage,
  //   consultoriasError,
  //   loadingComponent,
  //   consultoriasLoading,
  // });

  return (
    <Card>
      <Subtitulo>Historico de Consultorias del Emprendedor</Subtitulo>
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        {consultoriasLoading ? (
          <h6>Cargando...</h6>
        ) : consultoriasError || consultoriasMessage ? (
          <>
            {consultoriasError && <h6>{consultoriasError}</h6>}

            {consultoriasMessage && <h6>{consultoriasMessage}</h6>}
          </>
        ) : consultorias && consultorias.length > 0 ? (
          <FlexyTable
            datos={consultorias}
            titulo={"Historico de Consultorias"}
            btn1={"Ver Detalle"}
            fun1={(consultoriaData) => {
              onClicDetalleConsultoria(consultoriaData);
            }}
            adicional={true}
          />
        ) : (
          <h6>No se encontraron consultorías</h6>
        )}

        {showConsultoria.show && (
          <DetalleConsultoria
            show={showConsultoria.show}
            data={showConsultoria.data}
            tipo={showConsultoria.tipo}
            onHide={() => setShowConsultoria({ show: !showConsultoria.show })}
          />
        )}
      </Ruta>
    </Card>
  );
}

export default HistorialConsultoria;
