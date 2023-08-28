import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AccordionItemSidebar, EtiquetaSidebar, Sidebar } from "./styled.js";
import {
  SIDEBAR_EMPRENDEDOR,
  SIDEBAR_EMPRENDEDOR_AVANCE_RUTA,
  SIDEBAR_EMPRENDEDOR_CONSULTORIAS,
  SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ESPECIALIZADAS,
  SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM,
  SIDEBAR_EMPRENDEDOR_ESTADO_RUTA,
  SIDEBAR_EMPRENDEDOR_HISTORIAL_CONSULTORIAS,
  SIDEBAR_EMPRENDEDOR_MENTORES,
  SIDEBAR_EMPRENDEDOR_PROYECTO,
  SIDEBAR_EMPRENDEDOR_RUTA_ITEM,
  SIDEBAR_EMPRENDEDOR_TAREAS,
} from "src/app/Shared/utils/constants";
import { EmprendedorContext } from "../../contexts/EmprendedorContext";

import estadoIcon from "src/app/Shared/assets/images/sidebar/estado_ruta.png";
import avanzarIcon from "src/app/Shared/assets/images/sidebar/avanzar_ruta.png";
import mentoresIcon from "src/app/Shared/assets/images/sidebar/mentor.png";
import tareasIcon from "src/app/Shared/assets/images/sidebar/tareas.png";
import proyectoIcon from "src/app/Shared/assets/images/sidebar/project.png";
import consultoriaMenuIcon from "src/app/Shared/assets/images/sidebar/consultoria_main.png";
import consultoriaIcon from "src/app/Shared/assets/images/sidebar/consultoria.png";
import consultoriaEspIcon from "src/app/Shared/assets/images/sidebar/consultoria_especializada.png";
import historialConsultoriaIcon from "src/app/Shared/assets/images/sidebar/historial_consultoria.png";
import emprendimientosIcon from "src/app/Shared/assets/images/sidebar/administrador_emprendimientos.png";

function EmprendedorSidebar() {
  const location = useLocation();
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [menuActive, setMenuActive] = useState("");
  const [menuSubActive, setSubMenuActive] = useState("");

  useEffect(() => {
    const arrayPath = location.pathname.split("/");
    const pathRoute = arrayPath[arrayPath.length - 1].toLowerCase();

    switch (pathRoute) {
      case "avanzar":
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_AVANCE_RUTA);
        break;
      case "estado":
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_ESTADO_RUTA);
        break;
      case "mentores":
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_MENTORES);
        break;
      case "tareas":
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_TAREAS);
        break;
      case "proyecto":
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_PROYECTO);
        break;
      case "consultoria":
        setMenuActive(SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_CONSULTORIAS);
        break;
      case "consultoriaespecializada":
        setMenuActive(SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ESPECIALIZADAS);
        break;
      case "historial":
        setMenuActive(SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_HISTORIAL_CONSULTORIAS);
        break;

      default:
        setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
        setSubMenuActive(SIDEBAR_EMPRENDEDOR_AVANCE_RUTA);
        break;
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   try {
  //     const menu_item_active = localStorage.getItem(SIDEBAR_EMPRENDEDOR);
  //     if (menu_item_active === null) {
  //       if (
  //         userData.proyectosEmprendimiento[selectedProjectIndex]
  //           .estadoEmprendimiento == "TERMINADO"
  //       ) {
  //         localStorage.setItem(
  //           SIDEBAR_EMPRENDEDOR,
  //           SIDEBAR_EMPRENDEDOR_RUTA_ITEM
  //         );
  //         setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
  //       } else {
  //         localStorage.setItem(
  //           SIDEBAR_EMPRENDEDOR,
  //           SIDEBAR_EMPRENDEDOR_RUTA_ITEM
  //         );
  //         setMenuActive(SIDEBAR_EMPRENDEDOR_RUTA_ITEM);
  //       }
  //     } else {
  //       setMenuActive(menu_item_active);
  //     }
  //   } catch (error) {
  //     console.error("Error al leer el localStorage - EmprendedorNavbar.jsx");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const onChangeMenu = (event_key) => {
    // localStorage.setItem(SIDEBAR_EMPRENDEDOR, event_key);
    setMenuActive(event_key);
  };

  return (
    <Sidebar className="col-2">
      <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
        <EtiquetaSidebar>Ruta de Innovación y Emprendimiento</EtiquetaSidebar>

        <div className="accordion accordion-flush w-100" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header m-0" id="headingOne">
              <AccordionItemSidebar
                className={`accordion-button ${
                  menuActive !== SIDEBAR_EMPRENDEDOR_RUTA_ITEM && "collapsed"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={
                  menuActive === SIDEBAR_EMPRENDEDOR_RUTA_ITEM
                    ? "true"
                    : "false"
                }
                aria-controls="collapseOne"
                onClick={() => onChangeMenu(SIDEBAR_EMPRENDEDOR_RUTA_ITEM)}
              >
                <img
                  src={emprendimientosIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                  alt={""}
                />
                Mi Ruta
              </AccordionItemSidebar>
            </h2>

            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_EMPRENDEDOR_RUTA_ITEM && "show active"
              }`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                {userData.proyectosEmprendimiento[selectedProjectIndex]
                  .estadoEmprendimiento == "TERMINADO" ? (
                  <></>
                ) : (
                  <Link
                    to={"/Emprendedor/Ruta/Avanzar"}
                    className={`btn d-flex align-items-center ${
                      menuSubActive == SIDEBAR_EMPRENDEDOR_AVANCE_RUTA &&
                      "activeSubItem"
                    }`}
                    style={{
                      textAlign: "left",
                      height: "72px",
                      paddingLeft: "1rem",
                    }}
                  >
                    <img
                      src={avanzarIcon}
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "inline",
                        marginRight: "1rem",
                      }}
                      alt={""}
                    />
                    Avanzar en mi Ruta
                  </Link>
                )}

                <Link
                  to={"/Emprendedor/Ruta/Estado"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_EMPRENDEDOR_ESTADO_RUTA &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={estadoIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Estado de Ruta
                </Link>

                <Link
                  to={"/Emprendedor/Ruta/Mentores"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_EMPRENDEDOR_MENTORES &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={mentoresIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Mis Mentores
                </Link>

                <Link
                  to={"/Emprendedor/Ruta/Tareas"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_EMPRENDEDOR_TAREAS &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={tareasIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Mis Tareas
                </Link>

                <Link
                  to={"/Emprendedor/Ruta/Proyecto"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_EMPRENDEDOR_PROYECTO &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={proyectoIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Mi Proyecto
                </Link>

                {/* <Link
                  to={"/Emprendedor/Ruta/Material"}
                  className="btn d-flex align-items-center"
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={materialIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Material de Apoyo
                </Link> */}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header  m-0" id="headingTwo">
              <AccordionItemSidebar
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <img
                  src={consultoriaMenuIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                  alt={""}
                />
                Consultorías
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
              onClick={() =>
                onChangeMenu(SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ITEM)
              }
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Emprendedor/Ruta/Consultoria"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_EMPRENDEDOR_CONSULTORIAS &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={consultoriaIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Consultorías Normales
                </Link>
                <Link
                  to={"/Emprendedor/Ruta/ConsultoriaEspecializada"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive ==
                      SIDEBAR_EMPRENDEDOR_CONSULTORIAS_ESPECIALIZADAS &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={consultoriaEspIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Consultorías Especializadas
                </Link>
                <Link
                  to={"/Emprendedor/Ruta/Consultoria/Historial"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive ==
                      SIDEBAR_EMPRENDEDOR_HISTORIAL_CONSULTORIAS &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={historialConsultoriaIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                    alt={""}
                  />
                  Historial de Consultorías
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default EmprendedorSidebar;
