import { useEffect, useState } from "react";

function TablaHorarios({ horarios }) {
  const [loaded, setLoaded] = useState(false);
  const [listaHorarios, setListaHorarios] = useState([]);

  useEffect(() => {
    if (!loaded) {
      let listaFinal = [];
      for (const diaSemana in horarios) {
        const horariosDiaSemana = horarios[diaSemana];
        for (const horarioDia in horariosDiaSemana) {
          if (typeof listaFinal[horarioDia] === "undefined") {
            listaFinal.push({ [diaSemana]: horariosDiaSemana[horarioDia] });
          } else {
            listaFinal[horarioDia] = {
              ...listaFinal[horarioDia],
              [diaSemana]: horariosDiaSemana[horarioDia],
            };
          }
        }
      }
      setListaHorarios(listaFinal);
      setLoaded(true);
    }
  }, [loaded]);

  if (!loaded) {
    return <>loading</>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover text-center">
        <thead className="table-primary-personalized">
          <tr>
            <th scope="col">LUNES</th>
            <th scope="col">MARTES</th>
            <th scope="col">MIÉRCOLES</th>
            <th scope="col">JUEVES</th>
            <th scope="col">VIERNES</th>
            <th scope="col">SÁBADO</th>
          </tr>
        </thead>
        <tbody>
          {listaHorarios.length > 0 &&
            listaHorarios.map((filaHorario, index) => {
              return (
                <tr key={index}>
                  <td key={index}>
                    {filaHorario.lunes ? (
                      <>
                        {filaHorario.lunes?.inicio}
                        <br /> {filaHorario?.lunes?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.martes ? (
                      <>
                        {filaHorario.martes?.inicio}
                        <br /> {filaHorario?.martes?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.miercoles ? (
                      <>
                        {filaHorario.miercoles?.inicio}
                        <br /> {filaHorario?.miercoles?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.jueves ? (
                      <>
                        {filaHorario.jueves?.inicio}
                        <br /> {filaHorario?.jueves?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.viernes ? (
                      <>
                        {filaHorario.viernes?.inicio}
                        <br /> {filaHorario?.viernes?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.sabado ? (
                      <>
                        {filaHorario.sabado?.inicio}
                        <br /> {filaHorario?.sabado?.fin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaHorarios;
