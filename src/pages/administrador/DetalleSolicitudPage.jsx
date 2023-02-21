import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import TabAdministrador from "src/components/administrador/TabAdministrador";
import AdministradorLayout from "src/layouts/AdministradorLayout";
import { AdminEmprendedorContextProvider } from "src/services/context/AdminEmprendedorContext";

function DetalleSolicitudPage() {
  return (
    // <AdministradorLayout sidebar={true}>
    // <AdminEmprendedorContextProvider>
    <>
      <Titulo>Detalle de Solicitud de Primera Atención </Titulo>
      <TabAdministrador />
    </>
    // </AdminEmprendedorContextProvider>
    // </AdministradorLayout>
  );
}

export default DetalleSolicitudPage;
