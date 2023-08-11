import { useEffect, useState } from "react";

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
import { Input, Label } from "src/app/Shared/assets/styles/Common";

function FormularioReporteConsultorias({ idMentor }) {
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { data, message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    if (data && loading) {
      const link = document.createElement("a");
      const url = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data.file}`;
      link.href = url;
      link.download = data.filename;
      link.click();
      setLoading(false);
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
            idMentor: idMentor,
            fechaInicio: datos.fechaInicio,
            fechaFin: datos.fechaFin,
          },
        },
      });
    }
  };

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
          //max={getCurrentDate()}
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
          // max={getCurrentDate()}
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
  );
}

export default FormularioReporteConsultorias;
