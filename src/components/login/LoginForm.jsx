import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { validacionesLogin } from "../../utils/validaciones";
import { loginStyled } from "../../assets/styles/StyleComponent";

import imagen from "../../assets/images/Sinapsis-LR.png";
import LogoSinapsis from "../../assets/images/Logo_Sinapsis.png";
import { simpleRequest } from "src/services/get";
import { useAPI_GET } from "src/services/hooks/useAPI";

const INITIAL_LOGIN_FORM_DATA = {
  tipoDocumento: 1,
  numeroDocumento: "",
  password: "",
};

function LoginForm({ onSubmit }) {
  const [datos, setDatos] = useState(INITIAL_LOGIN_FORM_DATA);
  const [loadingAPI, dataAPI, errorAPI] = useAPI_GET("/app/tipoDocumento");
  const [error, setError] = useState({});
  const [saveSession, setSaveSession] = useState(true);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesLogin(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      onSubmit(datos);
    }
  };

  if (loadingAPI) {
    <></>;
  }

  if (errorAPI) {
    console.log(errorAPI);
  }

  return !dataAPI ? (
    <>Loading...</>
  ) : (
    <loginStyled.Grid_Layout>
      <loginStyled.Imagen src={imagen} alt="Sinapsis" />
      <loginStyled.Contenedor_Derecho>
        <loginStyled.Card>
          <loginStyled.Contenedor_Formulario onSubmit={(e) => handleSubmit(e)}>
            <loginStyled.Figura>
              <img
                src={LogoSinapsis}
                alt="Logo Sinapsis"
                className="logo_sinapsis_login"
              />
            </loginStyled.Figura>

            <loginStyled.Titulo>
              Inicia sesión en Sinapsis UAO
            </loginStyled.Titulo>

            <p className="text-muted">
              Los campos marcados con
              <span className="text-danger"> (*)</span> son obligatorios
            </p>

            <loginStyled.Formulario>
              <div className="form-controls">
                <loginStyled.Label htmlFor="tipoDocumento">
                  Tipo de documento <span className="text-danger"> (*)</span>
                </loginStyled.Label>
                <loginStyled.InputContainer className="w-100">
                  <loginStyled.InputSelect
                    className="w-100"
                    name="tipoDocumento"
                    placeholder="Tipo de documento"
                    type="select"
                    id="tipoDocumento"
                    onChange={(e) => handleChange(e)}
                    value={datos.tipoDocumento}
                  >
                    {dataAPI.map((tipoDocumento, index) => {
                      return (
                        <option key={index} value={tipoDocumento.id}>
                          {tipoDocumento.nombre}
                        </option>
                      );
                    })}
                  </loginStyled.InputSelect>

                  <br />
                  {error.tipoDocumento && (
                    <loginStyled.SmallError className="text-danger">
                      {error.tipoDocumento}
                    </loginStyled.SmallError>
                  )}
                </loginStyled.InputContainer>
              </div>

              <div className="form-controls">
                <loginStyled.Label htmlFor="numeroDocumento">
                  Número de documento <span className="text-danger"> (*)</span>
                </loginStyled.Label>
                <loginStyled.InputContainer className="w-100">
                  <loginStyled.Input
                    className="w-100"
                    name="numeroDocumento"
                    placeholder="Número de documento"
                    type="text"
                    id="numeroDocumento"
                    onChange={(e) => handleChange(e)}
                    value={datos.numeroDocumento}
                  />{" "}
                  <br />
                  {error.numeroDocumento && (
                    <loginStyled.SmallError className="text-danger">
                      {error.numeroDocumento}
                    </loginStyled.SmallError>
                  )}
                </loginStyled.InputContainer>
              </div>

              <div className="form-controls">
                <loginStyled.Label htmlFor="password">
                  Contraseña <span className="text-danger"> (*)</span>
                </loginStyled.Label>
                <loginStyled.InputContainer className="w-100">
                  <loginStyled.Input
                    className="w-100"
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    id="password"
                    onChange={(e) => handleChange(e)}
                    value={datos.password}
                  />{" "}
                  <br />
                  {error.password && (
                    <loginStyled.SmallError className="text-danger">
                      {error.password}
                    </loginStyled.SmallError>
                  )}
                </loginStyled.InputContainer>
              </div>

              <div className="form-controls botones_login">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input mb-3"
                    type="checkbox"
                    id="saveSesion"
                    defaultChecked={saveSession}
                    onChange={(e) => setSaveSession(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    name="saveSession"
                    htmlFor="saveSesion"
                  >
                    Mantener la sesión iniciada
                  </label>
                </div>
              </div>
            </loginStyled.Formulario>

            <loginStyled.BotonesContainer>
              <loginStyled.Boton className="btn btn-primary" type="submit">
                Iniciar sesión
              </loginStyled.Boton>
              <p className="titulolinkL">
                ¿No tienes una cuenta? <Link to="/Signup">Regístrate</Link>
              </p>
            </loginStyled.BotonesContainer>
          </loginStyled.Contenedor_Formulario>
        </loginStyled.Card>
      </loginStyled.Contenedor_Derecho>
    </loginStyled.Grid_Layout>
  );
}

export default LoginForm;
