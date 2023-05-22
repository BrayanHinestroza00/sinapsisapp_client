import TabSolicitudes from "src/app/Administrador/components/DetalleSolicitudPrimeraAtencion/TabSolicitudes";
import AsignarEtapaRuta from "src/app/Administrador/components/DetalleSolicitudPrimeraAtencion/AsignarEtapaRuta";

import { Titulo } from "src/app/Shared/assets/styles/Common";

function DetalleSolicitudPage() {
  return (
    <>
      <Titulo>Detalle de Solicitud de Primera Atención </Titulo>
      <table>
        <tbody className="d-flex">
          <tr>
            <td style={{ width: "65vw" }}>
              <TabSolicitudes />
            </td>
            <td className="mt-5">
              <AsignarEtapaRuta />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default DetalleSolicitudPage;
