import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validacionesSignUpComunidadUAO } from "src/app/Shared/services/validation/validationSignUp";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_TIPOS_DOCUMENTO,
  URL_REGISTRAR_EMPRENDEDOR_INTEGRACION,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { messageAlert } from "src/app/Shared/utils/messageAlerts";
import { confirmAlert } from "src/app/Shared/utils/confirmAlerts";

import imagen from "src/app/Shared/assets/images/panel_lateral.png";
import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";

import {
  SignUpIntegrationCard,
  SignUpIntegrationContainer,
  SignUpIntegrationErrorAPI,
  SignUpIntegrationForm,
  SignUpIntegrationFormButton,
  SignUpIntegrationFormButtonContainer,
  SignUpIntegrationFormContainer,
  SignUpIntegrationFormContainers,
  SignUpIntegrationFormDescription,
  SignUpIntegrationFormFieldError,
  SignUpIntegrationFormImageContainer,
  SignUpIntegrationFormImageElement,
  SignUpIntegrationFormTitulo,
  SignUpIntegrationLeftPanelImage,
  SignUpIntegrationRightPanelContainer,
} from "./styled";

function SignUpIntegration() {
  const navigate = useNavigate();
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

  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  useEffect(() => {
    fetchApiTiposDocumento({
      URL: URL_OBTENER_TIPOS_DOCUMENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesSignUpComunidadUAO(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlert({
        title: "¿Estás seguro que deseas registrarte en SINAPSIS UAO?",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitSignUpIntegration(),
      });
    }
  };

  const submitSignUpIntegration = () => {
    setLoading(true);
    const { confirmContrasena, contrasena, ...datosRegistro } = datos;
    fetchAPI({
      URL: URL_REGISTRAR_EMPRENDEDOR_INTEGRACION,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          ...datosRegistro,
          password: contrasena,
        },
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
      messageAlert({
        title: "Registro Completado Exitosamente",
        text: "Ya puedes acceder a los servicios de SINAPSIS UAO",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => navigate("/"),
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
    <SignUpIntegrationContainer>
      <SignUpIntegrationLeftPanelImage src={imagen} alt="SINAPSIS UAO" />
      <SignUpIntegrationRightPanelContainer>
        <SignUpIntegrationCard>
          <SignUpIntegrationForm onSubmit={(e) => handleSubmit(e)}>
            <SignUpIntegrationFormImageContainer>
              <SignUpIntegrationFormImageElement
                src={logoSinapsis}
                alt="Logo SINAPSIS UAO"
                width="228"
              />
            </SignUpIntegrationFormImageContainer>

            <SignUpIntegrationFormTitulo className="text-center">
              Regístrate en Sinapsis UAO
            </SignUpIntegrationFormTitulo>

            <SignUpIntegrationFormDescription className="text-muted text-center mb-3">
              <span className="mb-2">
                Bienvenido al formulario de registro de la comunidad UAO.
              </span>
              <br />
              <span className="mb-2">
                Utilizamos su usuario universitario para el registro.
              </span>
              <br />
              <span className="mb-4">
                <span style={{ fontWeight: "bold" }}>IMPORTANTE.</span> Todos
                los campos son obligatorios
              </span>
            </SignUpIntegrationFormDescription>

            <SignUpIntegrationFormContainer>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="usuario">
                    Usuario Universitario
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="usuario"
                    placeholder="Usuario Universitario"
                    type="text"
                    id="usuario"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    value={datos.usuario}
                  />
                  {error.usuario && (
                    <SignUpIntegrationFormFieldError className="text-danger">
                      {error.usuario}
                    </SignUpIntegrationFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="tipoDocumento">
                    Tipo de documento
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  {tiposDocumentoLoading ? (
                    <LoadingSpinner width="25px" height="25px" />
                  ) : tiposDocumentoError || tiposDocumentoMessage ? (
                    <>
                      {tiposDocumentoError && (
                        <SignUpIntegrationErrorAPI>
                          {tiposDocumentoError}
                        </SignUpIntegrationErrorAPI>
                      )}

                      {tiposDocumentoMessage && (
                        <SignUpIntegrationErrorAPI>
                          {tiposDocumentoMessage}
                        </SignUpIntegrationErrorAPI>
                      )}
                    </>
                  ) : (
                    <>
                      {tiposDocumentoData && tiposDocumentoData.length > 0 && (
                        <Form.Select
                          name="tipoDocumento"
                          type="text"
                          id="tipoDocumento"
                          onChange={(e) => handleChange(e)}
                          value={datos.tipoDocumento || "-1"}
                        >
                          <option value={"-1"} disabled>
                            Seleccione...
                          </option>
                          {tiposDocumentoData.map((tipoDocumento, index) => {
                            return (
                              <option key={index} value={tipoDocumento.id}>
                                {tipoDocumento.nombre}
                              </option>
                            );
                          })}
                        </Form.Select>
                      )}
                    </>
                  )}
                  {error.tipoDocumento && (
                    <SignUpIntegrationFormFieldError className="text-danger">
                      {error.tipoDocumento}
                    </SignUpIntegrationFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="numeroDocumento">
                    Número de documento
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="numeroDocumento"
                    placeholder="Número de documento"
                    type="text"
                    id="numeroDocumento"
                    onChange={(e) => handleChange(e)}
                    value={datos.numeroDocumento}
                  />
                  {error.numeroDocumento && (
                    <SignUpIntegrationFormFieldError className="text-danger">
                      {error.numeroDocumento}
                    </SignUpIntegrationFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="contrasena">
                    Contraseña
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="contrasena"
                    placeholder="Contraseña"
                    type="password"
                    id="contrasena"
                    onChange={(e) => handleChange(e)}
                    value={datos.contrasena}
                  />
                  {error.contrasena && (
                    <SignUpIntegrationFormFieldError className="text-danger">
                      {error.contrasena}
                    </SignUpIntegrationFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="confirmContrasena">
                    Confirmar contraseña
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="confirmContrasena"
                    placeholder="Confirmar contraseña"
                    type="password"
                    id="confirmContrasena"
                    onChange={(e) => handleChange(e)}
                    value={datos.confirmContrasena}
                  />
                  {error.confirmContrasena && (
                    <SignUpIntegrationFormFieldError className="text-danger">
                      {error.confirmContrasena}
                    </SignUpIntegrationFormFieldError>
                  )}
                </Form.Group>

                <SignUpIntegrationFormContainers>
                  <Form.Group>
                    <SignUpIntegrationFormButtonContainer>
                      <SignUpIntegrationFormButton
                        className="btn btn-primary mb-2"
                        type="submit"
                      >
                        Registrarse
                      </SignUpIntegrationFormButton>
                      <p className="mb-2">
                        ¿Eres externo de la UAO?
                        <Link className="m-3" to="/Signup/Externo">
                          Registrarte aquí
                        </Link>
                      </p>
                      <p className="mb-2">
                        ¿Ya tienes una cuenta?
                        <Link className="m-3" to="/Login">
                          Iniciar sesión
                        </Link>
                      </p>
                    </SignUpIntegrationFormButtonContainer>
                  </Form.Group>
                </SignUpIntegrationFormContainers>
              </Form>
            </SignUpIntegrationFormContainer>
          </SignUpIntegrationForm>
        </SignUpIntegrationCard>
      </SignUpIntegrationRightPanelContainer>
    </SignUpIntegrationContainer>
  );
}

export default SignUpIntegration;
