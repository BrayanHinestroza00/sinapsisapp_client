import ReactFlexyTable from "react-flexy-table";

import {
  CardRuta,
  Ruta,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

const data = [{ cedula: 123, correo: "123@gmail.com" }];

function HistorialConsultoria() {
  return (
    <>
      <Titulo>Historial de Consultorías</Titulo>
      <CardRuta>
        <Ruta>
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
      </CardRuta>{" "}
    </>
  );
}

export default HistorialConsultoria;
