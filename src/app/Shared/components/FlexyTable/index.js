import ReactFlexyTable from "react-flexy-table";

function FlexyTable({ datos, adicional, ...props }) {
  if (!adicional) {
    return (
      <div className="card_flexy">
        <div className="card-body">
          <h3>Listado de {props.titulo}</h3>
          <ReactFlexyTable
            className="table"
            data={datos}
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
        </div>
      </div>
    );
  } else {
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
                  {props.btn2 ? (
                    <td>
                      <button
                        className="btn btn_tabla_outline"
                        onClick={() => props.fun2(datos)}
                      >
                        {props.btn2}
                      </button>
                    </td>
                  ) : (
                    <></>
                  )}
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
          <div className="table-responsive">
            <div className="table">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlexyTable;
