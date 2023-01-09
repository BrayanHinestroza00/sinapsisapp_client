import { useState } from "react";
import { Card } from "react-bootstrap";
import ReactFlexyTable from "react-flexy-table";
import {
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import EditarDisponibilidadModal from "src/components/mentor/detalle_emprendedor/consultoria/EditarDisponibilidadModal";
import TablaHorarios from "src/components/TablaHorarios";
import MentorLayout from "src/layouts/MentorLayout";

function ConsultoriasEspPage() {
  const [showEditarDisponibilidad, setShowEditarDisponibilidad] =
    useState(false);

  function ocultarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(false);
  }
  function mostrarEditarDisponibilidadModal() {
    setShowEditarDisponibilidad(true);
  }

  return (
    <MentorLayout sidebar={true}>
      <>
        <Titulo>Consultorías Especializadas</Titulo>
        <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
          <SubTitulo>HORARIO DE DISPONIBILIDAD</SubTitulo>
          <form>
            <TablaHorarios horarios={horarios} />
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
          {data.length > 0 ? (
            <ReactFlexyTable
              data={data}
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
            horarios={horarios}
          />
        )}
      </>
    </MentorLayout>
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

const horarios = {
  lunes: [{ id: 1, inicio: "02:30 p.m.", fin: "04:00 p.m." }],
  martes: [{ id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." }],
  miercoles: [
    { id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." },
    { id: 2, inicio: "02:30 p.m.", fin: "04:00 p.m." },
  ],
  jueves: [{ id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." }],
  viernes: [],
  sabado: [
    { id: 1, inicio: "10:30 a.m.", fin: "12:00 p.m." },
    { id: 2, inicio: "02:30 p.m.", fin: "04:00 p.m." },
  ],
};

export default ConsultoriasEspPage;
