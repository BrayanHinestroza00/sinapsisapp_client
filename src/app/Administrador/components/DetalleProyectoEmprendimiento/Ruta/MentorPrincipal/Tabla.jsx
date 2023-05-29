import ReactFlexyTable from "react-flexy-table";

function Tabla({ datos, ...props }) {
  const ColumnaAcciones = [
    {
      header: "Acciones",
      td: (datos) => {
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  <button
                    className="btn btn_tabla"
                    onClick={() => props.fun1(datos)}
                  >
                    {props.btn1}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      },
    },
  ];
  return (
    <ReactFlexyTable
      data={datos}
      filteredDataText="Datos filtrados:"
      nextText="Siguiente"
      previousText="Anterior"
      totalDataText="Total datos:"
      rowsText="Número de filas"
      pageText="Página"
      ofText=" de"
      sortable={true}
      filterable
      additionalCols={ColumnaAcciones}
    />
  );
}

export default Tabla;
