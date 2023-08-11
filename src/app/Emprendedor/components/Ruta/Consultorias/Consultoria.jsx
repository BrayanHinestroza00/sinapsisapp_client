import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import DetalleConsultoria from "./DetalleConsultoria";
import FlexyTable from "src/app/Shared/components/FlexyTable";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import {
  SpanAuxiliar,
  CardRuta,
  Ruta,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common.js";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/app/Shared/utils/constants";

import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";

function Consultoria() {
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
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
    if (userData && selectedProjectIndex != null) {
      fetchApiConsultorias({
        URL: URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
            tipoBusqueda: "N",
          },
        },
      });

      setLoadingComponent(false);
    }
  }, [userData, selectedProjectIndex]);

  useEffect(() => {
    if (consultoriasData) {
      let newConsultorias = [];

      if (consultoriasData.length > 0) {
        newConsultorias = consultoriasData.map((consultoriaData, index) => {
          return {
            n: index + 1,
            título: consultoriaData.tituloConsultoria,
            "Fecha Consultoría": moment(
              consultoriaData.fechaConsultoria,
              "YYYY-MM-DD hh:mm:ss"
            ).format(SINAPSIS_APP_FORMATO_FECHA),
            "Hora Inicio Programada": moment(
              consultoriaData.horaInicioConsultoria,
              "hh:mm"
            ).format("LT"),
            "Hora Finalización Programada": moment(
              consultoriaData.horaFinConsultoria,
              "hh:mm"
            ).format("LT"),
            "Creado Por":
              consultoriaData.nombreMentor +
              " " +
              consultoriaData.apellidoMentor,
            "Correo Contacto": consultoriaData.correoInstitucionalMentor,
            Estado: consultoriaData.estadoConsultoria,
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

  if (loadingComponent || consultoriasLoading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (consultoriasMessage) {
    return (
      <>
        <Titulo>Consultorías</Titulo>

        <CardRuta>
          <Ruta>
            <p>{consultoriasMessage}</p>
          </Ruta>
        </CardRuta>
      </>
    );
  }

  if (consultoriasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{consultoriasError}</p>
      </>
    );
  }

  console.log("first", consultorias);

  return (
    <>
      <Titulo>
        Consultorías
        <SpanAuxiliar>
          <Link to={"/Emprendedor/Ruta/Consultoria/Historial"}>
            Ver historial
          </Link>
        </SpanAuxiliar>
      </Titulo>

      {consultorias.length > 0 ? (
        <>
          <CardRuta>
            <Ruta>
              <Subtitulo>Próxima Consultoría:</Subtitulo>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>
                    Mentor:
                    <SpanAuxiliar>{`${consultorias[0]["Creado Por"]}`}</SpanAuxiliar>
                  </h5>
                  <h5>
                    Correo:
                    <SpanAuxiliar>{`${consultorias[0]["Correo Contacto"]}`}</SpanAuxiliar>
                  </h5>
                  <h5>
                    Fecha de consultoría:
                    <SpanAuxiliar>
                      {`${consultorias[0]["Fecha Consultoría"]} `}
                      {/* Viernes, 15 de
                      diciembre del 2022 */}
                    </SpanAuxiliar>
                  </h5>
                  <h5>
                    Hora de inicio:
                    <SpanAuxiliar>{`${consultorias[0]["Hora Inicio Programada"]}.`}</SpanAuxiliar>
                  </h5>
                  <h5>
                    Hora de finalización:
                    <SpanAuxiliar>
                      {`${consultorias[0]["Hora Finalización Programada"]}.`}
                    </SpanAuxiliar>
                  </h5>
                </div>
                <img
                  src={logoSinapsis}
                  alt="Logo SINAPSIS UAO"
                  style={{ width: "30%" }}
                />
              </div>
            </Ruta>
          </CardRuta>

          <CardRuta>
            <Ruta>
              <FlexyTable
                datos={consultorias}
                titulo={"Consultorías"}
                // btn1={"Ver Detalle"}
                // fun1={(consultoriaData) => {
                //   onClicDetalleConsultoria(consultoriaData);
                // }}
                // adicional={true}
              />
            </Ruta>
          </CardRuta>
        </>
      ) : (
        <CardRuta>
          <Ruta>No hay próximas consultorias</Ruta>
        </CardRuta>
      )}

      {showConsultoria.show && (
        <DetalleConsultoria
          show={showConsultoria.show}
          data={showConsultoria.data}
          tipo={showConsultoria.tipo}
          onHide={() => setShowConsultoria({ show: !showConsultoria.show })}
        />
      )}
    </>
  );
}

export default Consultoria;
