import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

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
  Input,
  Label,
  Subtitulo,
  Titulo,
} from "src/app/Shared/assets/styles/Common";

function ReportesConsultoria() {
  const { userData } = useContext(MentorContext);
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});

  // Custom Hooks
  const { data, message, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    if (errorAPI) {
    } else {
      if (message) {
      }

      if (data) {
        const link = document.createElement("a");
        const url = URL.createObjectURL(data);
        link.href = url;
        link.download = message;
        link.click();
      }
    }
  }, [data]);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let erroresFormulario = validarFiltroReporteConsultoriaMentor(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      fetchAPI({
        URL: URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR,
        requestOptions: {
          method: HTTP_METHOD_POST,
          responseType: "blob",
          data: {
            idMentor: userData.id,
            fechaInicio: datos.fechaInicio,
            fechaFin: datos.fechaFin,
          },
        },
      });

      if (errorAPI) {
        messageAlert({
          title: "Algo ha fallado",
          text: errorAPI,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }

      if (message) {
        messageAlertWithoutText({
          title: "No se encontraron resultados",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  if (errorAPI) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{errorAPI}</p>
      </>
    );
  }

  return (
    <>
      <Titulo>Reportes Consultorias</Titulo>

      <Card style={{ padding: "0.5rem 2rem 1rem 2rem" }}>
        <Subtitulo>Filtros</Subtitulo>

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
