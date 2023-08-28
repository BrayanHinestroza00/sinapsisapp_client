import ReactFlexyTable from "react-flexy-table";

function FlexyTable({ datos, ...props }) {
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
                    className="btn btn_tabla_outline"
                    onClick={() => props.fun1(datos)}
                  >
                    {props.btn1}
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn_tabla_outline"
                    onClick={() => props.fun2(datos)}
                  >
                    {props.btn2}
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn_tabla_outline"
                    onClick={() => props.fun3(datos)}
                  >
                    {props.btn3}
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
    <div className="card_flexy">
      <div className="card-body">
        <h3>Lista de {props.titulo}</h3>

        <ReactFlexyTable
          data={datos}
          filteredDataText="Datos filtrados:"
          nextText="Siguiente Pag."
          previousText="Anterior Pag."
          totalDataText="Total datos:"
          rowsText="Número de filas"
          pageText="Página"
          ofText=" de"
          sortable={true}
          filterable
          additionalCols={ColumnaAcciones}
        />
      </div>
    </div>
  );
}

export default FlexyTable;
