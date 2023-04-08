import { useLocation } from "react-router-dom";
import {
  Auxiliar,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import TabMentor from "src/components/mentor/TabMentor";
import { MentorEmprendedorContextProvider } from "src/services/context/MentorEmprendedorContext";

function DetalleEmprendedorPage() {
  const { state } = useLocation();
  return (
    <MentorEmprendedorContextProvider>
      <Titulo>
        Detalle Asesoramiento Del Emprendedor:{" "}
        <Auxiliar>{`${state.nombres} ${state.apellidos}`}</Auxiliar>
      </Titulo>
      <TabMentor />
    </MentorEmprendedorContextProvider>
  );
}

export default DetalleEmprendedorPage;
