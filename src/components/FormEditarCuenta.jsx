import {
  BotonSiguiente,
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

import LogoSinapsis from "src/assets/images/Logo_Sinapsis.png";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import showPasswordIcon from "src/assets/images/showPassword.png";
import hidePasswordIcon from "src/assets/images/hidePassword.png";
import { validarActualizacionContrasena } from "src/utils/validaciones";
import {
  HTTP_METHOD_POST,
  URL_ACTUALIZAR_CONTRASENA,
} from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/utils/alerts/MessageAlert";

function FormEditarCuenta({ idUsuario }) {
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({});
  const [error, setError] = useState({});
  const [show, setShow] = useState({
    showOld: false,
    showNew: false,
    showNewC: false,
  });

  // Custom Hooks
  const { message: messageAPI, error: errorAPI, fetchAPI } = useFetch();

  const onHandleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validarActualizacionContrasena(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      setLoading(true);
      fetchAPI({
        URL: URL_ACTUALIZAR_CONTRASENA,
        requestOptions: {
          method: HTTP_METHOD_POST,
          data: {
            idUsuario: idUsuario,
            oldPassword: datos.oldPassword,
            newPassword: datos.newPassword,
          },
        },
      });
    }
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
      setDatos({});
      setShow({
        showOld: false,
        showNew: false,
        showNewC: false,
      });
      messageAlertWithoutText({
        title: "Contraseña Actualizada",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
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
    <Form onSubmit={onHandleSubmit} className="container mb-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <SubTitulo className="m-0">Actualizar Contraseña</SubTitulo>
          </div>

          <div className="d-flex">
            <div className="row g-3 p-3">
              <p className="text-muted">
                Los campos marcados con
                <span className="text-danger"> (*)</span> son obligatorios
              </p>
              <Form.Group className="col-md-12">
                <Form.Label htmlFor="oldPassword" className="form-label">
                  Contraseña Antigua
                  <span> (*)</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show.showOld ? "text" : "password"}
                    className="form-control"
                    name="oldPassword"
                    id="oldPassword"
                    value={datos.oldPassword || ""}
                    onChange={(e) => onHandleChange(e)}
                  />
                  <InputGroup.Text className="p-0">
                    <Button
                      style={{ width: "100%" }}
                      onClick={() =>
                        setShow({ ...show, showOld: !show.showOld })
                      }
                    >
                      <img
                        style={{ width: "2rem" }}
                        src={show.showOld ? showPasswordIcon : hidePasswordIcon}
                      />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
                {error.oldPassword && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.oldPassword}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="col-md-12">
                <Form.Label htmlFor="newPassword" className="form-label">
                  Contraseña Nueva
                  <span> (*)</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show.showNew ? "text" : "password"}
                    className="form-control"
                    name="newPassword"
                    id="newPassword"
                    value={datos.newPassword || ""}
                    onChange={(e) => onHandleChange(e)}
                  />
                  <InputGroup.Text className="p-0">
                    <Button
                      style={{ width: "100%" }}
                      onClick={() =>
                        setShow({ ...show, showNew: !show.showNew })
                      }
                    >
                      <img
                        style={{ width: "2rem" }}
                        src={show.showNew ? showPasswordIcon : hidePasswordIcon}
                      />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
                {error.newPassword && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.newPassword}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="col-md-12">
                <Form.Label htmlFor="newPasswordConfirm" className="form-label">
                  Confirmación Contraseña Nueva
                  <span> (*)</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show.showNewC ? "text" : "password"}
                    className="form-control"
                    name="newPasswordConfirm"
                    id="newPasswordConfirm"
                    value={datos.newPasswordConfirm || ""}
                    onChange={(e) => onHandleChange(e)}
                  />
                  <InputGroup.Text className="p-0">
                    <Button
                      style={{ width: "100%" }}
                      onClick={() =>
                        setShow({ ...show, showNewC: !show.showNewC })
                      }
                    >
                      <img
                        style={{ width: "2rem" }}
                        src={
                          show.showNewC ? showPasswordIcon : hidePasswordIcon
                        }
                      />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
                {error.newPasswordConfirm && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.newPasswordConfirm}
                  </small>
                )}
              </Form.Group>

              <div className="col-md-12 text-center">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  style={{ height: "auto" }}
                >
                  Actualizar
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={LogoSinapsis}
                alt="Logo SINAPSIS UAO"
                className="logo_sinapsis"
                style={{
                  width: "20vw",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default FormEditarCuenta;
