import ReactFlexyTable from "react-flexy-table";

import {
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

const data = [{ cedula: 123, correo: "123@gmail.com" }];

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
