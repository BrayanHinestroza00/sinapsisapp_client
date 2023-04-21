import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validacionesSignUp } from "src/utils/validaciones";
import { signUpStyled } from "../../assets/styles/StyleComponent";

import imagen from "../../assets/images/Sinapsis-LR.png";
import LogoSinapsis from "../../assets/images/Logo_Sinapsis.png";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_OBTENER_TIPOS_DOCUMENTO,
  URL_REGISTRAR_EMPRENDEDOR_EXTERNO,
} from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";
import { messageAlert } from "src/utils/alerts/MessageAlert";
import { confirmAlert } from "src/utils/alerts/ConfirmAlert";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

function SignupForm() {
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
    <signUpStyled.Grid_Layout>
      <signUpStyled.ImagenRegistro src={imagen} alt="SINAPSIS UAO" />
      <signUpStyled.Contenedor_Derecho>
        <signUpStyled.Card>
          <signUpStyled.Contenedor_Formulario
            className="contenedor_formulario_registro"
            onSubmit={(e) => handleSubmit(e)}
          >
            <signUpStyled.Figura>
              <signUpStyled.Logo_Sinapsis_Registro
                src={LogoSinapsis}
                alt="Logo SINAPSIS UAO"
                width="228"
              />
            </signUpStyled.Figura>

            <signUpStyled.Titulo>
              Regístrate en Sinapsis UAO
            </signUpStyled.Titulo>

            {tiposDocumentoLoading ? (
              <>Loading...</>
            ) : tiposDocumentoError || tiposDocumentoMessage ? (
              <>
                {tiposDocumentoError && <Titulo>{tiposDocumentoError}</Titulo>}

                {tiposDocumentoMessage && (
                  <Titulo>{tiposDocumentoMessage}</Titulo>
                )}
              </>
            ) : (
              <>
                <p className="text-muted">
                  Recuerda:
                  <span> Todos los campos son obligatorios</span>
                </p>

                <signUpStyled.Formulario>
                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="nombres">
                      Nombre(s) <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="nombres"
                        placeholder="Nombres"
                        type="text"
                        id="nombres"
                        autoFocus
                        onChange={(e) => handleChange(e)}
                        value={datos.nombres}
                      />{" "}
                      <br />
                      {error.nombres && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.nombres}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="apellidos">
                      Apellido(s) <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="apellidos"
                        placeholder="Apellidos"
                        type="text"
                        id="apellidos"
                        autoFocus
                        onChange={(e) => handleChange(e)}
                        value={datos.apellidos}
                      />{" "}
                      <br />
                      {error.apellidos && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.apellidos}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="tipoDocumento">
                      Tipo de documento{" "}
                      <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.InputSelect
                        name="tipoDocumento"
                        type="text"
                        id="tipoDocumento"
                        onChange={(e) => handleChange(e)}
                        value={datos.tipoDocumento || "-1"}
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
                      </signUpStyled.InputSelect>{" "}
                      <br />
                      {error.tipoDocumento && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.tipoDocumento}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="numeroDocumento">
                      Numero de documento{" "}
                      <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="numeroDocumento"
                        placeholder="Numero de documento"
                        type="text"
                        id="numeroDocumento"
                        onChange={(e) => handleChange(e)}
                        value={datos.numeroDocumento}
                      />{" "}
                      <br />
                      {error.numeroDocumento && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger error-class">
                          {error.numeroDocumento}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="correo">
                      Correo electrónico{" "}
                      <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="correo"
                        placeholder="Correo"
                        type="text"
                        id="correo"
                        onChange={(e) => handleChange(e)}
                        value={datos.correo}
                      />{" "}
                      <br />
                      {error.correo && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.correo}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  {datos.tipoUsuario === "Mentor" && (
                    <div className="form-controls">
                      <signUpStyled.Label htmlFor="especialidadMentor">
                        Especialidad del mentor{" "}
                        <span className="text-danger"> (*)</span>
                      </signUpStyled.Label>
                      <signUpStyled.InputContainerRegistro>
                        <signUpStyled.InputSelect
                          name="especialidadMentor"
                          placeholder="Especialidad"
                          type="text"
                          id="especialidadMentor"
                          autoFocus
                          onChange={(e) => handleChange(e)}
                          value={datos.especialidadMentor}
                        >
                          <option value="-1" disabled selected>
                            Seleccione su especialidad
                          </option>
                          <option value="Contabilidad">Contabilidad</option>
                          <option value="Tecnologia">Tecnología</option>
                          <option value="Negocios internacionales">
                            Negocios internacionales
                          </option>
                        </signUpStyled.InputSelect>{" "}
                        <br />
                        {error.especialidadMentor && (
                          <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                            {error.especialidadMentor}
                          </signUpStyled.SmallError>
                        )}
                      </signUpStyled.InputContainerRegistro>
                    </div>
                  )}

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="contrasena">
                      Contraseña <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="contrasena"
                        placeholder="Contraseña"
                        type="password"
                        id="contrasena"
                        onChange={(e) => handleChange(e)}
                        value={datos.contrasena}
                      />{" "}
                      <br />
                      {error.contrasena && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.contrasena}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.Label htmlFor="confirmContrasena">
                      Confirmar contraseña{" "}
                      <span className="text-danger"> (*)</span>
                    </signUpStyled.Label>
                    <signUpStyled.InputContainerRegistro>
                      <signUpStyled.Input
                        name="confirmContrasena"
                        placeholder="Confirmar contraseña"
                        type="password"
                        id="confirmContrasena"
                        onChange={(e) => handleChange(e)}
                        value={datos.confirmContrasena}
                      />{" "}
                      <br />
                      {error.confirmContrasena && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.confirmContrasena}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <div className="form-controls">
                    <signUpStyled.InputContainerRegistro>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={true}
                          onChange={(e) => handleChange(e)}
                          name="aceptoTratamientoDatos"
                          id="aceptoTratamientoDatos"
                        />
                        <label
                          className="form-check-label"
                          for="aceptoTratamientoDatos"
                        >
                          Acepto los términos y condiciones
                        </label>
                      </div>
                      <br />
                      {error.aceptoTratamientoDatos && (
                        <signUpStyled.SmallError className="form-text font-weight-bold text-danger">
                          {error.aceptoTratamientoDatos}
                        </signUpStyled.SmallError>
                      )}
                    </signUpStyled.InputContainerRegistro>
                  </div>

                  <signUpStyled.BotonesContainer>
                    <signUpStyled.Boton
                      className="btn btn-primary"
                      type=" submit"
                    >
                      {" "}
                      Registrarse{" "}
                    </signUpStyled.Boton>
                    <p>
                      ¿Eres comunidad UAO?{" "}
                      <Link to="/Signup/ComunidadUAO">Registrarte aquí</Link>
                    </p>
                    <p>
                      ¿Ya tienes una cuenta?{" "}
                      <Link to="/Login">Iniciar sesión</Link>
                    </p>
                  </signUpStyled.BotonesContainer>
                </signUpStyled.Formulario>
              </>
            )}
          </signUpStyled.Contenedor_Formulario>
        </signUpStyled.Card>
      </signUpStyled.Contenedor_Derecho>
    </signUpStyled.Grid_Layout>
  );
}

export default SignupForm;
