import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { validacionesSignUp } from "src/app/Shared/services/validation/validationSignUp";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_TIPOS_DOCUMENTO,
  URL_REGISTRAR_EMPRENDEDOR_EXTERNO,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import { messageAlert } from "src/app/Shared/utils/messageAlerts";
import { confirmAlert } from "src/app/Shared/utils/confirmAlerts";

import imagen from "src/app/Shared/assets/images/panel_lateral.png";
import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";
import {
  SignUpExternoCard,
  SignUpExternoContainer,
  SignUpExternoErrorAPI,
  SignUpExternoForm,
  SignUpExternoFormButton,
  SignUpExternoFormButtonContainer,
  SignUpExternoFormContainer,
  SignUpExternoFormContainers,
  SignUpExternoFormDescription,
  SignUpExternoFormFieldError,
  SignUpExternoFormImageContainer,
  SignUpExternoFormImageElement,
  SignUpExternoFormTitulo,
  SignUpExternoLeftPanelImage,
  SignUpExternoRightPanelContainer,
} from "./styled";

function SignUpExterno() {
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
    if (e.target.name == "aceptoTratamientoDatos") {
      setDatos({
        ...datos,
        aceptoTratamientoDatos: e.target.checked,
      });
    } else {
      setDatos({
        ...datos,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesSignUp(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlert({
        title: "¿Estás seguro que deseas registrarte en SINAPSIS UAO?",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitSignUpExterno(),
      });
    }
  };

  const submitSignUpExterno = () => {
    setLoading(true);
    const { confirmContrasena, contrasena, ...datosRegistro } = datos;

    fetchAPI({
      URL: URL_REGISTRAR_EMPRENDEDOR_EXTERNO,
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
    <SignUpExternoContainer>
      <SignUpExternoLeftPanelImage src={imagen} alt="SINAPSIS UAO" />
      <SignUpExternoRightPanelContainer>
        <SignUpExternoCard>
          <SignUpExternoForm onSubmit={(e) => handleSubmit(e)}>
            <SignUpExternoFormImageContainer>
              <SignUpExternoFormImageElement
                src={logoSinapsis}
                alt="Logo SINAPSIS UAO"
                width="228"
              />
            </SignUpExternoFormImageContainer>

            <SignUpExternoFormTitulo>
              Regístrate en Sinapsis UAO
            </SignUpExternoFormTitulo>

            <SignUpExternoFormDescription className="text-muted mb-3">
              Recuerda:
              <span> Todos los campos son obligatorios</span>
            </SignUpExternoFormDescription>

            <SignUpExternoFormContainer>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nombres">
                    Nombre(s)
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="nombres"
                    placeholder="Nombres"
                    type="text"
                    id="nombres"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    value={datos.nombres}
                  />
                  {error.nombres && (
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.nombres}
                    </SignUpExternoFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="apellidos">
                    Apellido(s)
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="apellidos"
                    placeholder="Apellidos"
                    type="text"
                    id="apellidos"
                    onChange={(e) => handleChange(e)}
                    value={datos.apellidos}
                  />
                  {error.apellidos && (
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.apellidos}
                    </SignUpExternoFormFieldError>
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
                        <SignUpExternoErrorAPI>
                          {tiposDocumentoError}
                        </SignUpExternoErrorAPI>
                      )}

                      {tiposDocumentoMessage && (
                        <SignUpExternoErrorAPI>
                          {tiposDocumentoMessage}
                        </SignUpExternoErrorAPI>
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
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.tipoDocumento}
                    </SignUpExternoFormFieldError>
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
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.numeroDocumento}
                    </SignUpExternoFormFieldError>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="correo">
                    Correo electrónico
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    name="correo"
                    placeholder="Correo electrónico"
                    type="text"
                    id="correo"
                    onChange={(e) => handleChange(e)}
                    value={datos.correo}
                  />
                  {error.correo && (
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.correo}
                    </SignUpExternoFormFieldError>
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
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.contrasena}
                    </SignUpExternoFormFieldError>
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
                    <SignUpExternoFormFieldError className="text-danger">
                      {error.confirmContrasena}
                    </SignUpExternoFormFieldError>
                  )}
                </Form.Group>

                <SignUpExternoFormContainers>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      checked={datos.aceptoTratamientoDatos}
                      onChange={(e) => handleChange(e)}
                      name="aceptoTratamientoDatos"
                      id="aceptoTratamientoDatos"
                      label={"Acepto los términos y condiciones"}
                    />
                    {error.aceptoTratamientoDatos && (
                      <SignUpExternoFormFieldError className="text-danger">
                        {error.aceptoTratamientoDatos}
                      </SignUpExternoFormFieldError>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <SignUpExternoFormButtonContainer>
                      <SignUpExternoFormButton
                        className="btn btn-primary mb-2"
                        type="submit"
                      >
                        Registrarse
                      </SignUpExternoFormButton>
                      <p className="mb-2">
                        ¿Eres comunidad UAO?
                        <Link className="m-3" to="/Signup/ComunidadUAO">
                          Registrarte aquí
                        </Link>
                      </p>
                      <p className="mb-2">
                        ¿Ya tienes una cuenta?
                        <Link className="m-3" to="/Login">
                          Iniciar sesión
                        </Link>
                      </p>
                    </SignUpExternoFormButtonContainer>
                  </Form.Group>
                </SignUpExternoFormContainers>
              </Form>
            </SignUpExternoFormContainer>
          </SignUpExternoForm>
        </SignUpExternoCard>
      </SignUpExternoRightPanelContainer>
    </SignUpExternoContainer>
  );
}

export default SignUpExterno;
