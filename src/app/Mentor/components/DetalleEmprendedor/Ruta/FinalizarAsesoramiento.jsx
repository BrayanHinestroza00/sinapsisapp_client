import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import {
  HTTP_METHOD_POST,
  URL_FINALIZAR_ACOMPANAMIENTO,
} from "src/app/Shared/utils/apiConstants";
import { SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR } from "src/app/Shared/utils/constants";
import { validarFinalizarAsesoramiento } from "src/app/Shared/services/validation/validateFinalizarAsesoramiento";

function FinalizarAsesoramiento({ preloadData }) {
  const navigate = useNavigate();

  const { userData } = useContext(MentorContext);

  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const handleChangle = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let erroresFormulario = validarFinalizarAsesoramiento(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas finalizar el acompañamiento?",
        text: "Esta acción no se puede deshacer",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    setLoading(true);
    fetchAPI({
      URL: URL_FINALIZAR_ACOMPANAMIENTO,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyectoEmprendimiento: preloadData.idRutaProyEmprendimiento,
          observaciones: datos.observaciones,
          idMentorCrea: userData.id,
        },
      },
    });
  };

  if (loading && errorAPI) {
    messageAlert({
      title: "Algo ha fallado",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Acompañamiento Finalizado Exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setDatos({});
      navigate("/Mentor/Emprendedores");
    } else {
      messageAlertWithoutText({
        title: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            Observaciones del Acompañamiento
            <span className="text-danger"> (*)</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="observaciones"
            className="form-control"
            onChange={(e) => handleChangle(e)}
            disabled={
              preloadData.estadoRuta !=
              SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
            }
          />

          {error.observaciones && (
            <small className="form-text font-weight-bold text-danger">
              {error.observaciones}
            </small>
          )}
        </Form.Group>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={
            preloadData.estadoRuta !=
            SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
          }
        >
          Finalizar Asesoramiento
        </button>
      </Form>
    </div>
  );
}

export default FinalizarAsesoramiento;
