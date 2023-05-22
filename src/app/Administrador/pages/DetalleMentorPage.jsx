import { useLocation } from "react-router-dom";

import TabMentores from "src/app/Administrador/components/DetalleMentor/TabMentores";

import { SpanAuxiliar, Titulo } from "src/app/Shared/assets/styles/Common";

function DetalleMentorPage() {
  const { state } = useLocation();
  return (
    <>
      <Titulo>
        Mentor: <SpanAuxiliar>{`${state.nombreCompleto}`}</SpanAuxiliar>
      </Titulo>
      <TabMentores />
    </>
  );
}

export default DetalleMentorPage;
