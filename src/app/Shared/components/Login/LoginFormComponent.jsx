import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useFetch } from "../../services/hooks/useFetch.js";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_TIPOS_DOCUMENTO,
} from "../../utils/apiConstants.js";

import {
  LoginErrorAPI,
  LoginForm,
  LoginFormButton,
  LoginFormButtonContainer,
  LoginFormContainer,
  LoginFormDescription,
  LoginFormFieldError,
  LoginFormImageContainer,
  LoginFormImageElement,
  LoginFormTitulo,
} from "./styled.js";

import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { validacionesLogin } from "../../services/validation/validateLogin.js";

const INITIAL_LOGIN_FORM_DATA = {
  tipoDocumento: 1,
};

function LoginFormComponent({ onSubmit }) {
  const [datos, setDatos] = useState(INITIAL_LOGIN_FORM_DATA);
  const [error, setError] = useState({});

  const onHandleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesLogin(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      onSubmit(datos);
    }
  };

  // Custom Hooks
  const {
    data: tiposDocumentoData,
    message: tiposDocumentoMessage,
    error: tiposDocumentoError,
    loading: tiposDocumentoLoading,
    fetchAPI: fetchApiTiposDocumento,
  } = useFetch();

  useEffect(() => {
    fetchApiTiposDocumento({
      URL: URL_OBTENER_TIPOS_DOCUMENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  return (
    <LoginForm>
      <LoginFormImageContainer>
        <LoginFormImageElement src={logoSinapsis} alt="Logo SINAPSIS UAO" />
      </LoginFormImageContainer>
      <LoginFormTitulo className="mb-1">
        Inicia sesión en SINAPSIS UAO
      </LoginFormTitulo>

      <LoginFormDescription className="text-muted mb-3">
        Los campos marcados con
        <span className="text-danger"> (*)</span> son obligatorios
      </LoginFormDescription>

      <LoginFormContainer>
        <Form onSubmit={onHandleSubmit}>
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
                  <LoginErrorAPI>{tiposDocumentoError}</LoginErrorAPI>
                )}

                {tiposDocumentoMessage && (
                  <LoginErrorAPI>{tiposDocumentoMessage}</LoginErrorAPI>
                )}
              </>
            ) : (
              <>
                {tiposDocumentoData && tiposDocumentoData.length > 0 && (
                  <Form.Select
                    name="tipoDocumento"
                    id="tipoDocumento"
                    value={datos.tipoDocumento}
                    onChange={(e) => onHandleChange(e)}
                  >
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
              <LoginFormFieldError className="text-danger">
                {error.tipoDocumento}
              </LoginFormFieldError>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="numeroDocumento">
              Número de documento
              <span className="text-danger"> (*)</span>
            </Form.Label>
            <Form.Control
              id="numeroDocumento"
              name="numeroDocumento"
              type="number"
              onChange={(e) => onHandleChange(e)}
            />
            {error.numeroDocumento && (
              <LoginFormFieldError className="text-danger">
                {error.numeroDocumento}
              </LoginFormFieldError>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">
              Contraseña
              <span className="text-danger"> (*)</span>
            </Form.Label>
            <Form.Control
              id="password"
              name="password"
              onChange={(e) => onHandleChange(e)}
            />
            {error.password && (
              <LoginFormFieldError className="text-danger">
                {error.password}
              </LoginFormFieldError>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <LoginFormButtonContainer>
              <LoginFormButton className="btn btn-primary mb-2" type="submit">
                Iniciar sesión
              </LoginFormButton>
              <p className="titulolinkL">
                ¿No tienes una cuenta? <Link to="/Signup">Regístrate</Link>
              </p>
            </LoginFormButtonContainer>
          </Form.Group>
        </Form>
      </LoginFormContainer>
    </LoginForm>
  );
}

export default LoginFormComponent;
