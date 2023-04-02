import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import TabMentor from "src/components/mentor/TabMentor";
import MentorLayout from "src/layouts/MentorLayout";
import { MentorEmprendedorContextProvider } from "src/services/context/MentorEmprendedorContext";

function DetalleEmprendedorPage() {
  return (
    <MentorEmprendedorContextProvider>
      <Titulo>Detalle del Emprendedor </Titulo>
      <TabMentor />
    </MentorEmprendedorContextProvider>
  );
}

export default DetalleEmprendedorPage;
