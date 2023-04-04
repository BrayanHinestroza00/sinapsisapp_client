import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import AsignarEtapaRuta from "src/components/administrador/detalle_primera_atencion/AsignarEtapaRuta";
import TabAdministrador from "src/components/administrador/TabAdministrador";

function DetalleSolicitudPage() {
  return (
    <>
      <Titulo>Detalle de Solicitud de Primera Atención </Titulo>
      <table>
        <tr className="d-flex">
          <td style={{ width: "65vw" }}>
            <TabAdministrador />
          </td>
          <td className="mt-5">
            <AsignarEtapaRuta />
          </td>
        </tr>
      </table>
    </>
  );
}

export default DetalleSolicitudPage;
