import { useLocation } from "react-router-dom";

import TabMentor from "src/app/Mentor/components/TabMentor";

import { MentorEmprendedorContextProvider } from "src/app/Mentor/contexts/MentorEmprendedorContext";
import { SpanAuxiliar, Titulo } from "src/app/Shared/assets/styles/Common";

function DetalleEmprendedor() {
  const { state } = useLocation();
  return (
    <MentorEmprendedorContextProvider>
      <Titulo>
        Detalle Asesoramiento Del Emprendedor:{" "}
        <SpanAuxiliar>{`${state.nombres} ${state.apellidos}`}</SpanAuxiliar>
      </Titulo>
      <TabMentor />
    </MentorEmprendedorContextProvider>
  );
}

export default DetalleEmprendedor;
