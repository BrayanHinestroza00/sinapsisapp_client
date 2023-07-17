import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { headerStyled } from "./styled.js";

import { getFromLocalStorage } from "src/app/Shared/utils/localStorage";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/app/Shared/utils/constants";

import logo from "src/app/Shared/assets/images/header/sinapsis.png";
import exit from "src/app/Shared/assets/images/header/exit.svg";
import user from "src/app/Shared/assets/images/header/emprendedor/emprendedor_header.png";

function MentorHeader() {
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
    navigate("/Mentor");
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
              <>
                <li>
                  <h6 className="dropdown-header">Mi Perfil</h6>
                </li>
                <li className="mb-2">
                  <Link className="dropdown-item" to="/Mentor/Perfil/Ver">
                    <span className="mx-2">Ver Perfil</span>
                  </Link>
                </li>
              </>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <h6 className="dropdown-header">Configuraciones</h6>
              </li>
              <li>
                <Link className="dropdown-item" to="/Mentor/Editar_Cuenta">
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

export default MentorHeader;
