import { Link } from "react-router-dom";
import moment from "moment";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "src/services/hooks/useFetch";
import logoSinapsis from "src/assets/images/Logo_Sinapsis.png";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO,
} from "src/utils/apiConstants";
import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import DetalleConsultoria from "./DetalleConsultoria";
import FlexyTable from "src/components/FlexyTable";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/utils/constants";

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
            titulo: consultoriaData.tituloConsultoria,
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

  if (loadingComponent || consultoriasLoading) {
    return <h1>LOADING EstadoRutaEmprendedor</h1>;
  }

  if (consultoriasMessage) {
    return (
      <>
        <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

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

  return (
    <>
      <Titulo>
        Consultorías{" "}
        <Auxiliar>
          <Link to={"/Emprendedor/Ruta/Consultoria/Historial"}>
            Ver historial
          </Link>
        </Auxiliar>
      </Titulo>

      {consultorias.length > 0 ? (
        <>
          <CardRuta>
            <Ruta>
              <SubTitulo>Proxima Consultoría:</SubTitulo>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>
                    Mentor:{" "}
                    <Auxiliar>{`${consultorias[0]["Creado Por"]}`}</Auxiliar>
                  </h5>
                  <h5>
                    Correo:{" "}
                    <Auxiliar>{`${consultorias[0]["Correo Contacto"]}`}</Auxiliar>
                  </h5>
                  <h5>
                    Fecha de consultoría:{" "}
                    <Auxiliar>
                      {`${consultorias[0]["Fecha Consultoria"]} `}Viernes, 15 de
                      diciembre del 2022
                    </Auxiliar>
                  </h5>
                  <h5>
                    Hora de inicio:{" "}
                    <Auxiliar>{`${consultorias[0]["Hora Inicio"]}.`}</Auxiliar>
                  </h5>
                  <h5>
                    Hora de finalización:{" "}
                    <Auxiliar>
                      {`${consultorias[0]["Hora Finalizacion"]}.`}
                    </Auxiliar>
                  </h5>
                </div>
                <img
                  src={logoSinapsis}
                  alt="Logo Sinapsis"
                  style={{ width: "30%" }}
                />
              </div>
            </Ruta>
          </CardRuta>

          <CardRuta>
            <Ruta>
              <FlexyTable
                datos={consultorias}
                titulo={"Consultorias"}
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
          <Ruta>No hay proximas consultorias</Ruta>
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
