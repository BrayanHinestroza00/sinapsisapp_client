import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import ReactFlexyTable from "react-flexy-table";
import {
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EditarDisponibilidadModal from "src/components/mentor/detalle_emprendedor/EditarDisponibilidadModal";
import TablaHorarios from "src/components/TablaHorarios";
import { MentorContext } from "src/services/context/MentorContext";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
  URL_OBTENER_HORARIO_MENTOR,
} from "src/utils/apiConstants";
import { SINAPSIS_APP_FORMATO_FECHA } from "src/utils/constants";

function ConsultoriasEspPage() {
  const { userData, loadingUserData } = useContext(MentorContext);

  const [loadingComponent, setLoadingComponent] = useState(true);
  const [consultorias, setConsultorias] = useState([]);
  const [showEditarDisponibilidad, setShowEditarDisponibilidad] =
    useState(false);

  // Custom Hooks
  const {
    data: horariosData,
    message: horariosMessage,
    error: horariosError,
    loading: horariosLoading,
    fetchAPI: fetchApiHorarios,
  } = useFetch();

  const {
    data: consultoriasData,
    message: consultoriasMessage,
    error: consultoriasError,
    loading: consultoriasLoading,
    fetchAPI: fetchApiConsultorias,
  } = useFetch();

  useEffect(() => {
    if (userData != null) {
      fetchApiHorarios({
        URL: URL_OBTENER_HORARIO_MENTOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idMentor: userData.id,
          },
        },
      });

      fetchApiConsultorias({
        URL: URL_OBTENER_CONSULTORIAS_PROGRAMADAS,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userData.id,
            tipoUsuario: 2,
          },
        },
      });

      setLoadingComponent(false);
    }
  }, [userData]);

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

  function ocultarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(false);
  }
  function mostrarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(true);
  }

  if (
    loadingUserData ||
    horariosLoading ||
    loadingComponent ||
    consultoriasLoading ||
    !horariosData
  ) {
    return <>LOADING ConsultoriasEspPageMentor</>;
  }

  if (horariosMessage || consultoriasMessage) {
    return (
      <>
        <Titulo>Estado de la ruta de I&E de SINAPSIS UAO</Titulo>

        <Card>
          <Ruta>
            <p>{horariosMessage || consultoriasMessage}</p>
          </Ruta>
        </Card>
      </>
    );
  }

  if (horariosError || consultoriasError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{horariosError || consultoriasError}</p>
      </>
    );
  }

  // console.log("tes", {
  //   loadingUserData,
  //   horariosLoading,
  //   loadingComponent,
  //   consultoriasLoading,
  //   inverse: { horariosData, consultoriasData },
  // });

  return (
    <>
      <Titulo>Consultorías Especializadas</Titulo>
      <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
        <SubTitulo>HORARIO DE DISPONIBILIDAD</SubTitulo>
        <form>
          <TablaHorarios horarios={horariosData} />
          <button
            type="button"
            className="btn btn-primary w-25"
            onClick={() => mostrarEditarDisponibilidadModal()}
          >
            Editar disponibilidad
          </button>
        </form>
      </Card>

      <Ruta
        style={{
          padding: "0.5rem 2rem 1rem 2rem",
          marginTop: "1rem",
          marginLeft: "0rem",
        }}
      >
        <SubTitulo>CONSULTARÍAS PROGRAMADAS</SubTitulo>
        {consultorias.length > 0 ? (
          <ReactFlexyTable
            data={consultorias}
            filteredDataText="Datos filtrados:"
            nextText="Siguiente"
            previousText="Anterior"
            totalDataText="Total datos:"
            rowsText="Número de filas"
            pageText="Página"
            ofText=" de"
            filterable
            sortable={true}
          />
        ) : (
          <>No hay consultorías programadas</>
        )}
      </Ruta>
      {showEditarDisponibilidad && (
        <EditarDisponibilidadModal
          show={showEditarDisponibilidad}
          setShow={ocultarEditarDisponibilidadModal}
          horarios={horariosData}
        />
      )}
    </>
  );
}

const data = [
  {
    ID: "1",
    "Tipo Doc.": "CC",
    "Num Doc.": "1005943951",
    Nombre: "Brayan Hinestroza",
    Correo: "123@gmail.com",
  },
];

// const horarios = {
//   lunes: [{ id: 1, inicio: "02:30 p.m.", fin: "04:00 p.m." }],
//   martes: [{ id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." }],
//   miercoles: [
//     { id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." },
//     { id: 2, inicio: "02:30 p.m.", fin: "04:00 p.m." },
//   ],
//   jueves: [{ id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." }],
//   viernes: [],
//   sabado: [
//     { id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." },
//     { id: 2, inicio: "02:30 p.m.", fin: "04:00 p.m." },
//   ],
// };

export default ConsultoriasEspPage;
