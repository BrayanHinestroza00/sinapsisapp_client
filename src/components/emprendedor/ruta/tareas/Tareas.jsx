import ReactFlexyTable from "react-flexy-table";

import {
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

const data = [
  { "Fecha Entrega": "22/12/2022", "Correo Mentor": "123@gmail.com" },
];

function Tareas() {
  return (
    <>
      <Titulo>Tareas</Titulo>

      <CardRuta>
        <Ruta>
          <SubTitulo>Tareas pendientes</SubTitulo>
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
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta>
          <SubTitulo>Historial de tareas</SubTitulo>
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
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Tareas;
