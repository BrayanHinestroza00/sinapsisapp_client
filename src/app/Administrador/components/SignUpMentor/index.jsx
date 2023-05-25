import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

import { Subtitulo, Titulo } from "src/app/Shared/assets/styles/Common.js";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_TIPOS_DOCUMENTO,
  URL_REGISTRAR_MENTOR,
} from "src/app/Shared/utils/apiConstants";

import { validacionesSignUpMentor } from "src/app/Shared/services/validation/validationSignUp";
import { confirmAlert } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

import LogoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";

function RegistrarMentor({ show, onHide }) {
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: tiposDocumentoData,
    message: tiposDocumentoMessage,
    error: tiposDocumentoError,
    loading: tiposDocumentoLoading,
    fetchAPI: fetchApiTiposDocumento,
  } = useFetch();

  const {
    data: etapasRutaData,
    message: etapasRutaMessage,
    error: etapasRutaError,
    loading: etapasRutaLoading,
    fetchAPI: fetchApiEtapasRuta,
  } = useFetch();

  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    fetchApiTiposDocumento({
      URL: URL_OBTENER_TIPOS_DOCUMENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });

    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesSignUpMentor(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlert({
        title: "¿Estás seguro que deseas registrar el mentor en SINAPSIS UAO?",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitSignUpMentor(),
      });
    }
  };

  const submitSignUpMentor = () => {
    setLoading(true);

    fetchAPI({
      URL: URL_REGISTRAR_MENTOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: datos,
      },
    });
  };

  if (loading && errorAPI) {
    messageAlert({
      title: "Registro fallido",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Registro completado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => onHide(),
      });
    } else {
      messageAlert({
        title: "Registro fallido",
        text: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <Modal show={(show = true)} style={{ padding: "1rem" }} size="lg">
      <Modal.Header className="modalHeader">
        <Modal.Title>
          <Subtitulo>Registrar Mentor</Subtitulo>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Container>
          <Form>
            <figure
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={LogoSinapsis} alt="Logo SINAPSIS UAO" width="228" />
            </figure>
            {tiposDocumentoLoading || etapasRutaLoading ? (
              <>Loading...</>
            ) : tiposDocumentoError ||
              tiposDocumentoMessage ||
              etapasRutaMessage ||
              etapasRutaError ? (
              <>
                {tiposDocumentoError ||
                  (etapasRutaError && (
                    <Titulo>{tiposDocumentoError || etapasRutaError}</Titulo>
                  ))}

                {tiposDocumentoMessage ||
                  (etapasRutaMessage && (
                    <Titulo>
                      {tiposDocumentoMessage || etapasRutaMessage}
                    </Titulo>
                  ))}
              </>
            ) : (
              <>
                <p className="text-muted text-center">
                  <span>
                    Bienvenido al formulario de registro de los Mentores.
                  </span>
                  <br />
                  <span>
                    Utilizamos el usuario institucional del nuevo mentor para el
                    registro.
                  </span>
                  <br />
                  <span>
                    <span style={{ fontWeight: "bold" }}>IMPORTANTE.</span>{" "}
                    Todos los campos son obligatorios
                  </span>
                </p>

                <div>
                  <Form.Group className="col-md-12 mb-3">
                    <Form.Label htmlFor="usuario">
                      Usuario Institucional{" "}
                      <span className="text-danger"> (*)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control "
                      name="usuario"
                      id="usuario"
                      placeholder="Usuario Institucional"
                      autoFocus
                      value={datos.usuario || ""}
                      onChange={(e) => onHandleChange(e)}
                    />

                    {error.usuario && (
                      <small className="form-text font-weight-bold text-danger">
                        {error.usuario}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="col-md-12 mb-3">
                    <Form.Label htmlFor="tipoDocumento">
                      Tipo de documento
                      <span className="text-danger"> (*)</span>
                    </Form.Label>
                    <Form.Select
                      className="form-control"
                      name="tipoDocumento"
                      id="tipoDocumento"
                      value={datos.tipoDocumento || "-1"}
                      onChange={(e) => onHandleChange(e)}
                    >
                      <option value={"-1"} disabled>
                        Seleccione...
                      </option>
                      {tiposDocumentoData &&
                        tiposDocumentoData.length > 0 &&
                        tiposDocumentoData.map((tipoDocumento, index) => {
                          return (
                            <option key={index} value={tipoDocumento.id}>
                              {tipoDocumento.nombre}
                            </option>
                          );
                        })}
                    </Form.Select>
                    {error.tipoDocumento && (
                      <small className="form-text font-weight-bold text-danger">
                        {error.tipoDocumento}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="col-md-12 mb-3">
                    <Form.Label htmlFor="numeroDocumento">
                      Número de documento
                      <span className="text-danger"> (*)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control "
                      name="numeroDocumento"
                      id="numeroDocumento"
                      placeholder="Numero de documento"
                      value={datos.numeroDocumento || ""}
                      onChange={(e) => onHandleChange(e)}
                    />
                    {error.numeroDocumento && (
                      <small className="form-text font-weight-bold text-danger error-class">
                        {error.numeroDocumento}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="col-md-12 mb-3">
                    <Form.Label htmlFor="etapaRuta">
                      Etapa en la Ruta de I&E del Mentor{" "}
                      <span className="text-danger"> (*)</span>
                    </Form.Label>
                    <Form.Select
                      className="form-control "
                      name="etapaRuta"
                      id="etapaRuta"
                      value={datos.etapaRuta || "-1"}
                      onChange={(e) => onHandleChange(e)}
                    >
                      <option value={"-1"} disabled>
                        Seleccione...
                      </option>
                      {etapasRutaData &&
                        etapasRutaData.length > 0 &&
                        etapasRutaData.map((etapaRuta, index) => (
                          <option key={index} value={etapaRuta.id}>
                            {etapaRuta.nombre}
                          </option>
                        ))}
                    </Form.Select>

                    {error.etapaRuta && (
                      <small className="form-text font-weight-bold text-danger">
                        {error.etapaRuta}
                      </small>
                    )}
                  </Form.Group>
                </div>
              </>
            )}
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer className="modalFooter_revisarConsultoria">
        <Button className="btn btn-primary" onClick={onHandleSubmit}>
          Registrar
        </Button>

        <Button className="btn btn-secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegistrarMentor;
