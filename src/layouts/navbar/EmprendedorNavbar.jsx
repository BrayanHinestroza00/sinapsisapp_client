import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  MENU_EMPRENDEDOR,
  MENU_EMPRENDEDOR_INICIO,
  MENU_EMPRENDEDOR_PERFIL,
  MENU_EMPRENDEDOR_PRIMERA_ATENCION,
  MENU_EMPRENDEDOR_RUTA,
  SIDEBAR_EMPRENDEDOR,
  SIDEBAR_EMPRENDEDOR_ESTADO_RUTA,
  SIDEBAR_EMPRENDEDOR_RUTA_ITEM,
  SIDEBAR_EMPRENDEDOR_SUBMENU,
} from "../../utils/constants";

import { EmprendedorContext } from "src/services/context/EmprendedorContext";

function EmprendedorNavbar() {
  const { userData, selectedProjectIndex, loading } =
    useContext(EmprendedorContext);

  const [menuActive, setMenuActive] = useState("");

  useEffect(() => {
    try {
      const menu_item_active = localStorage.getItem(MENU_EMPRENDEDOR);
      if (menu_item_active === null) {
        localStorage.setItem(MENU_EMPRENDEDOR, MENU_EMPRENDEDOR_INICIO);
        setMenuActive(MENU_EMPRENDEDOR_INICIO);
      } else {
        setMenuActive(menu_item_active);
      }
    } catch (error) {
      console.log("Error al leer el localStorage - EmprendedorNavbar.jsx");
    }
  }, []);

  const onChangeMenu = (event_key) => {
    localStorage.setItem(MENU_EMPRENDEDOR, event_key);
    setMenuActive(event_key);
    if (event_key === MENU_EMPRENDEDOR_RUTA) {
      localStorage.setItem(SIDEBAR_EMPRENDEDOR, SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
      localStorage.setItem(
        SIDEBAR_EMPRENDEDOR_SUBMENU,
        SIDEBAR_EMPRENDEDOR_ESTADO_RUTA
      );
    }
  };

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
                  menuActive == MENU_EMPRENDEDOR_INICIO && "active"
                }`}
                onClick={() => onChangeMenu(MENU_EMPRENDEDOR_INICIO)}
                to="/Emprendedor"
              >
                INICIO
              </Link>
            </li>
            {userData?.esPrimeraVez ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    menuActive == MENU_EMPRENDEDOR_PRIMERA_ATENCION && "active"
                  }`}
                  onClick={() =>
                    onChangeMenu(MENU_EMPRENDEDOR_PRIMERA_ATENCION)
                  }
                  to="/Emprendedor/primeraAtencion"
                >
                  {" "}
                  PRIMERA ATENCIÓN
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      menuActive == MENU_EMPRENDEDOR_PERFIL && "active"
                    }`}
                    onClick={() => onChangeMenu(MENU_EMPRENDEDOR_PERFIL)}
                    to={"/Emprendedor/Perfil"}
                  >
                    MI PERFIL
                  </Link>
                </li>
                {userData?.proyectosEmprendimiento[selectedProjectIndex]
                  ?.estadoEmprendimiento != "PENDIENTE" && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        menuActive == MENU_EMPRENDEDOR_RUTA && "active"
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
