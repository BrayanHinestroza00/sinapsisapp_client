import { Link, useNavigate } from "react-router-dom";

import { headerStyled } from "src/assets/styles/Header.style";

import logo from "../../assets/images/header/emprendedor/sinapsis.png";
import exit from "../../assets/images/header/emprendedor/exit.svg";
import user from "../../assets/images/header/emprendedor/emprendedor_header.png";
import Modal from "src/components/emprendedor/Modal";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "src/utils/functions";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";

function EmprendedorHeader() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [proyectos, setProyectos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    setUserName(userData.username);
    setProyectos(userData.proyectosEmprendimiento);
    setLoading(false);
  }, []);

  const cerrarSesion = () => {
    navigate("/Logout");
  };

  const redirectToHome = () => {
    navigate("/Emprendedor");
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
              {proyectos?.length > 1 && (
                <>
                  <li>
                    <h6 className="dropdown-header">Elige tu proyecto</h6>
                  </li>
                  <li>
                    <span
                      id="label_select_project"
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <span className="mx-2">Seleccionar Proyecto</span>
                    </span>
                  </li>
                </>
              )}
              <li>
                <h6 className="dropdown-header">Configuraciones</h6>
              </li>
              <li>
                <Link className="dropdown-item" to="/Emprendedor/Editar_Cuenta">
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
      <Modal />
    </>
  );
}

export default EmprendedorHeader;
