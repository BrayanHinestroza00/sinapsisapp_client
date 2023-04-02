import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import FlexyTable from "src/components/FlexyTable";
import {
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { URL_OBTENER_CONSULTORIAS_PROGRAMADAS } from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/utils/constants";
import { HTTP_METHOD_GET } from "src/utils/apiConstants";

// import "../../../styles/ConsultoriasMentor.css";

function Consultoria({ idEmprendedor }) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [consultorias, setConsultorias] = useState([]);

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
      URL: URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: idEmprendedor,
          tipoUsuario: 1,
        },
      },
    });

    setLoadingComponent(false);
  }, []);

  useEffect(() => {
    if (consultoriasData) {
      console.log("consultoriasData", consultoriasData);
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
            Emprendedor:
              consultoriaData.nombreEmprendedor +
              " " +
              consultoriaData.apellidoEmprendedor,
            "Correo Contacto":
              consultoriaData.correoInstitucionalEmprendedor ||
              consultoriaData.correoPersonalEmprendedor,
          };
        });
      }

      setConsultorias(newConsultorias);
    }
  }, [consultoriasData]);

  if (loadingComponent || consultoriasLoading) {
    return <h1>LOADING EstadoRutaEmprendedor</h1>;
  }

  if (consultoriasMessage) {
    return (
      <Card>
        <SubTitulo>Consultorías programadas</SubTitulo>
        <Ruta
          style={{
            padding: "0rem 2rem 1rem 2rem",
            marginTop: "0rem",
            marginLeft: "0rem",
          }}
        >
          <p>Loading Consultoria Mentor</p>
        </Ruta>
      </Card>
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
    <Card>
      <SubTitulo>Consultorías programadas</SubTitulo>
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        {/* <SubTitulo>CONSULTARÍAS PROGRAMADAS</SubTitulo> */}
        {consultorias.length > 0 ? (
          <FlexyTable
            datos={consultorias}
            titulo={"consultorías programadas"}
          />
        ) : (
          <>No hay consultorías programadas</>
        )}
      </Ruta>
    </Card>
  );
}

export default Consultoria;
