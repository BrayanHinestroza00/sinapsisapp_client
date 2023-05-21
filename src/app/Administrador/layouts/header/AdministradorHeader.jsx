import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { headerStyled } from "./styled.js";

import logo from "src/app/Shared/assets/images/header/sinapsis.png";
import exit from "src/app/Shared/assets/images/header/exit.svg";
import user from "src/app/Shared/assets/images/header/administrador_header.png";
import imagenActiva from "src/app/Shared/assets/images/tmp/notificacion_active.png";
import imagenInactiva from "src/app/Shared/assets/images/tmp/notificacion_inactive.png";

import { getFromLocalStorage } from "src/app/Shared/utils/localStorage";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/app/Shared/utils/constants";

const notificacion = false;

function AdministradorHeader() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    setUserName(userData.username.toUpperCase());
    setLoading(false);
  }, []);

  const cerrarSesion = () => {
    navigate("/Logout");
  };

  const redirectToHome = () => {
    navigate("/Administrador");
  };

  return loading ? (
    <></>
  ) : (
    <>
      <headerStyled.PanelSuperior>
        <headerStyled.LogoSinapsisContainer onClick={() => redirectToHome()}>
          <headerStyled.LogoSinapsis src={logo} alt="Logo sinapsis UAO" />
        </headerStyled.LogoSinapsisContainer>
        <headerStyled.ContenedorControlesUsuario>
          <img
            src={notificacion ? imagenActiva : imagenInactiva}
            height="100%"
          />
          <div id="dropdown_emprendedor" className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
              data-bs-display="static"
            >
              <span>{userName}</span>
              <headerStyled.IconoHeader
                className="mx-2"
                src={user}
                alt="Icono Perfil"
              />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <h6 className="dropdown-header">Configuraciones</h6>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/Administrador/Editar_Cuenta"
                >
                  <span className="mx-2">Editar Cuenta</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/Logout">
                  <headerStyled.IconoHeader
                    src={exit}
                    alt=""
                    onClick={() => cerrarSesion()}
                  />
                  <span className="mx-2">Cerrar Sesion</span>
                </Link>
              </li>
            </ul>
          </div>
        </headerStyled.ContenedorControlesUsuario>
      </headerStyled.PanelSuperior>
    </>
  );
}

export default AdministradorHeader;
