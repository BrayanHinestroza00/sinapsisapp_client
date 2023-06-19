import { useContext } from "react";

import { MentorContext } from "src/app/Mentor/contexts/MentorContext";
import FormularioReporteConsultorias from "../components/FormularioReporteConsultorias";

import { Card, Subtitulo, Titulo } from "src/app/Shared/assets/styles/Common";

function ReportesConsultoria() {
  const { userData } = useContext(MentorContext);

  return (
    <>
      <Titulo>Reportes Consultorías</Titulo>

      <Card>
        <Subtitulo>Filtros de búsqueda</Subtitulo>

        <FormularioReporteConsultorias idMentor={userData.id} />
      </Card>
    </>
  );
}

export default ReportesConsultoria;
