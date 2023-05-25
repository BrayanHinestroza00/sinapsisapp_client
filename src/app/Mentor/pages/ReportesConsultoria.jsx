import { useContext, useEffect, useState } from "react";

import { MentorContext } from "src/app/Mentor/contexts/MentorContext";

import { useFetch } from "src/app/Shared/services/hooks/useFetch.js";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts.js";
import {
  HTTP_METHOD_POST,
  URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR,
} from "src/app/Shared/utils/apiConstants";
import { getCurrentDate } from "src/app/Shared/utils/utilityFunctions";
import { validarFiltroReporteConsultoriaMentor } from "src/app/Shared/services/validation/validateReportesConsultoria.js";
import {
  Card,
  Input,
  Label,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";

function ReportesConsultoria() {
  const { userData } = useContext(MentorContext);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { data, message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    if (data) {
      var blob = new Blob([data.file], { type: "application/vnd.ms-excel" });

      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = data.filename;
      link.click();
    }

    if (messageAPI && messageAPI != "OK") {
      messageAlertWithoutText({
        title: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }

    if (errorAPI) {
      messageAlert({
        title: "Algo ha fallado",
        text: errorAPI,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [data, messageAPI, errorAPI]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    let erroresFormulario = validarFiltroReporteConsultoriaMentor(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      setLoading(true);
      const response = await fetchAPI({
        URL: URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR,
        requestOptions: {
          method: HTTP_METHOD_POST,
          // responseType: "blob",
          data: {
            idMentor: userData.id,
            fechaInicio: datos.fechaInicio,
            fechaFin: datos.fechaFin,
          },
        },
      });

      console.log("response", response);
    }
  };

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  // if (loading && errorAPI) {
  //   messageAlert({
  //     title: "Algo ha fallado",
  //     text: errorAPI,
  //     icon: "error",
  //     confirmButtonText: "Aceptar",
  //   });
  //   setLoading(false);
  // } else if (loading && messageAPI) {
  //   if (messageAPI == "OK") {
  //     console.log("API REPORTES", {
  //       data,
  //     });
  //     var blob = new Blob([data.file], { type: "application/vnd.ms-excel" });

  //     const link = document.createElement("a");
  //     const url = URL.createObjectURL(blob);
  //     link.href = url;
  //     link.download = data.filename;
  //     link.click();
  //   } else {
  //     messageAlertWithoutText({
  //       title: messageAPI,
  //       icon: "warning",
  //       confirmButtonText: "Aceptar",
  //     });
  //   }
  //   setLoading(false);
  // }

  return (
    <>
      <Titulo>Reportes Consultorías</Titulo>

      <Card>
        <Subtitulo>Filtros de búsqueda</Subtitulo>

        <form onSubmit={onHandleSubmit} className="row g-3">
          {/* Fecha de inicio */}
          <div className="col-md-6">
            <Label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio
            </Label>
            <Input
              type="date"
              className="form-control"
              name="fechaInicio"
              id="fechaInicio"
              max={getCurrentDate()}
              value={datos.fechaInicio != null ? datos.fechaInicio : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaInicio && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaInicio}
              </small>
            )}
          </div>

          {/* Fecha de finalización */}
          <div className="col-md-6">
            <Label htmlFor="fechaFin" className="form-label">
              Fecha de Finalización
            </Label>
            <Input
              type="date"
              className="form-control inputDiag"
              name="fechaFin"
              id="fechaFin"
              max={getCurrentDate()}
              value={datos.fechaFin != null ? datos.fechaFin : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaFin && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaFin}
              </small>
            )}
          </div>

          <div>
            <button className="btn btn-primary">Generar Historial</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ReportesConsultoria;
