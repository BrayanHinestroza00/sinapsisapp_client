import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { headerStyled } from "src/assets/styles/Header.style";

import logo from "src/assets/images/header/sinapsis.png";
import exit from "src/assets/images/header/exit.svg";
import user from "src/assets/images/header/emprendedor/emprendedor_header.png";
import SeleccionarProyectoPage from "src/components/emprendedor/SeleccionarProyectoModal";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";

function EmprendedorHeader() {
  let navigate = useNavigate();
  const { userData, loadingContext } = useContext(EmprendedorContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingContext && userData) {
      setLoading(false);
    }
  }, [loadingContext, userData]);

  const cerrarSesion = () => {
    navigate("/Logout");
  };

  const redirectToHome = () => {
    navigate("/Emprendedor");
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
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
              <span>{userData.username.toUpperCase()}</span>
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
              {userData.proyectosEmprendimiento?.length > 0 && (
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
      <SeleccionarProyectoPage />
    </>
  );
}

export default EmprendedorHeader;
