import { useEffect, useState } from "react";

function TablaHorarioDisponibilidad({ horarios }) {
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
          {listaHorarios.length > 0 ? (
            listaHorarios.map((filaHorario, index) => {
              return (
                <tr key={index}>
                  <td key={index}>
                    {filaHorario.lunes ? (
                      <>
                        {filaHorario.lunes?.horaInicio}
                        <br /> {filaHorario?.lunes?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.martes ? (
                      <>
                        {filaHorario.martes?.horaInicio}
                        <br /> {filaHorario?.martes?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.miercoles ? (
                      <>
                        {filaHorario.miercoles?.horaInicio}
                        <br /> {filaHorario?.miercoles?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.jueves ? (
                      <>
                        {filaHorario.jueves?.horaInicio}
                        <br /> {filaHorario?.jueves?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.viernes ? (
                      <>
                        {filaHorario.viernes?.horaInicio}
                        <br /> {filaHorario?.viernes?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {filaHorario.sabado ? (
                      <>
                        {filaHorario.sabado?.horaInicio}
                        <br /> {filaHorario?.sabado?.horaFin}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="m-5">
                  El mentor no ha registrado ningún horario de disponibilidad
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaHorarioDisponibilidad;
