import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  MENU_EMPRENDEDOR_INICIO,
  MENU_EMPRENDEDOR_PERFIL,
  MENU_EMPRENDEDOR_PRIMERA_ATENCION,
  MENU_EMPRENDEDOR_RUTA,
  SIDEBAR_EMPRENDEDOR,
  SIDEBAR_EMPRENDEDOR_ESTADO_RUTA,
  SIDEBAR_EMPRENDEDOR_RUTA_ITEM,
  SIDEBAR_EMPRENDEDOR_SUBMENU,
} from "src/app/Shared/utils/constants";
import { EmprendedorContext } from "../../contexts/EmprendedorContext";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

function EmprendedorNavbar() {
  const {
    userData,
    selectedProjectIndex,
    setShowSidebar,
    menuItemActive,
    setMenuItemActive,
    loading: loadingContext,
  } = useContext(EmprendedorContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingContext && userData) {
      setLoading(false);
    }
  }, [loadingContext]);

  const onChangeMenu = (event_key) => {
    setMenuItemActive(event_key);
    if (event_key === MENU_EMPRENDEDOR_RUTA) {
      localStorage.setItem(SIDEBAR_EMPRENDEDOR, SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
      localStorage.setItem(
        SIDEBAR_EMPRENDEDOR_SUBMENU,
        SIDEBAR_EMPRENDEDOR_ESTADO_RUTA
      );
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  };

  if (loading) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  return (
    <nav
      id="header_emprendedor"
      className="navbar fixed-top navbar-expand-md navbar-dark "
      style={{ backgroundColor: "#752A88", marginTop: "4.5rem" }}
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar10"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar10">
          <ul className="navbar-nav nav-fill w-100">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  menuItemActive == MENU_EMPRENDEDOR_INICIO && "active"
                }`}
                onClick={() => onChangeMenu(MENU_EMPRENDEDOR_INICIO)}
                to="/Emprendedor"
              >
                INICIO
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  menuItemActive == MENU_EMPRENDEDOR_PERFIL && "active"
                }`}
                onClick={() => onChangeMenu(MENU_EMPRENDEDOR_PERFIL)}
                to={"/Emprendedor/Perfil"}
              >
                MI PERFIL
              </Link>
            </li>
            {userData.esPrimeraVez == 1 ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    menuItemActive == MENU_EMPRENDEDOR_PRIMERA_ATENCION &&
                    "active"
                  }`}
                  onClick={() =>
                    onChangeMenu(MENU_EMPRENDEDOR_PRIMERA_ATENCION)
                  }
                  to="/Emprendedor/primeraAtencion"
                >
                  PRIMERA ATENCIÓN
                </Link>
              </li>
            ) : (
              <>
                {userData.proyectosEmprendimiento[selectedProjectIndex]
                  ?.estadoEmprendimiento != "PENDIENTE" && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        menuItemActive == MENU_EMPRENDEDOR_RUTA && "active"
                      }`}
                      onClick={() => onChangeMenu(MENU_EMPRENDEDOR_RUTA)}
                      to="/Emprendedor/Ruta"
                    >
                      MI RUTA
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default EmprendedorNavbar;
