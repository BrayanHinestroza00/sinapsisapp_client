import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AccordionItemSidebar, EtiquetaSidebar, Sidebar } from "./styled.js";
import {
  SIDEBAR_ADMINISTRADOR_EMPRENDEDOR,
  SIDEBAR_ADMINISTRADOR_EMPRENDEDORES_ITEM,
  SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTO,
  SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM,
  SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO,
  SIDEBAR_ADMINISTRADOR_GESTION_EMPRENDEDORES,
  SIDEBAR_ADMINISTRADOR_GESTION_MENTORES,
  SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM,
  SIDEBAR_ADMINISTRADOR_MENTOR,
  SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION,
  SIDEBAR_ADMINISTRADOR_REPORTES_FORMACION,
  SIDEBAR_ADMINISTRADOR_REPORTES_GESTION,
  SIDEBAR_ADMINISTRADOR_REPORTES_ITEM,
  SIDEBAR_ADMINISTRADOR_USUARIOS_ITEM,
} from "src/app/Shared/utils/constants";

import solicitudPAIcon from "src/app/Shared/assets/images/sidebar/administrador_solicitudes_pa.png";
import usuariosIcon from "src/app/Shared/assets/images/sidebar/administrador_usuarios.png";
import reportesIcon from "src/app/Shared/assets/images/sidebar/administrador_reportes.png";
import reportesFormacionIcon from "src/app/Shared/assets/images/sidebar/administrador_reportes_formacion.png";
import reportesGestionIcon from "src/app/Shared/assets/images/sidebar/administrador_reportes_gestion.png";
import listadoEmprendimientosIcon from "src/app/Shared/assets/images/sidebar/administrador_listado_emprendimientos.png";
import emprendimientosIcon from "src/app/Shared/assets/images/sidebar/administrador_emprendimientos.png";
import emprendedoresIcon from "src/app/Shared/assets/images/sidebar/emprendedores.png";
import mentoresIcon from "src/app/Shared/assets/images/sidebar/mentores.png";
import consultoriaIcon from "src/app/Shared/assets/images/sidebar/consultoria.png";
import consultoriaEspIcon from "src/app/Shared/assets/images/sidebar/consultoria_especializada.png";

function AdministradorSidebar() {
  const location = useLocation();

  const [menuActive, setMenuActive] = useState("");
  const [menuSubActive, setSubMenuActive] = useState("");

  useEffect(() => {
    const arrayPath = location.pathname.toLowerCase().split("/");
    arrayPath.shift();

    let pathRoute = `${arrayPath[0]}_${arrayPath[1]}${
      arrayPath[2]
        ? arrayPath[1] == "emprendimientos" ||
          arrayPath[1] == "solicitudes" ||
          arrayPath[1] == "emprendedores" ||
          arrayPath[1] == "mentores"
          ? ""
          : "_" + arrayPath[2]
        : ""
    }`.toLowerCase();

    switch (pathRoute) {
      case "administrador_emprendimientos":
        setMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTO);
        break;
      case "administrador_solicitudes":
        setMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION);
        break;
      case "administrador_emprendedores":
        setMenuActive(SIDEBAR_ADMINISTRADOR_USUARIOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDEDOR);
        break;
      case "administrador_mentores":
        setMenuActive(SIDEBAR_ADMINISTRADOR_USUARIOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_MENTOR);
        break;
      case "administrador_reportes_formacion":
        setMenuActive(SIDEBAR_ADMINISTRADOR_REPORTES_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_REPORTES_FORMACION);
        break;
      case "administrador_reportes_gestion":
        setMenuActive(SIDEBAR_ADMINISTRADOR_REPORTES_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_REPORTES_GESTION);
        break;
      case "administrador_gestion_emprendedores":
        setMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_EMPRENDEDORES);
        break;
      case "administrador_gestion_mentores":
        setMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_MENTORES);
        break;
      case "administrador_gestion_anuncios":
        setMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO);
        break;

      default:
        setMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM);
        setSubMenuActive(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTO);
        break;
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   try {
  //     const menu_item_active = localStorage.getItem(SIDEBAR_ADMINISTRADOR);
  //     if (menu_item_active === null) {
  //       localStorage.setItem(
  //         SIDEBAR_ADMINISTRADOR,
  //         SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM
  //       );
  //       setMenuActive(SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM);
  //     } else {
  //       setMenuActive(menu_item_active);
  //     }
  //   } catch (error) {
  //     console.error("Error al leer el localStorage - AdministradorNavbar.jsx");
  //   }
  // }, []);

  const onChangeMenu = (event_key) => {
    // localStorage.setItem(SIDEBAR_ADMINISTRADOR, event_key);
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
                  menuActive !== SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM &&
                  "collapsed"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={
                  menuActive === SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM
                    ? "true"
                    : "false"
                }
                aria-controls="collapseOne"
                onClick={() =>
                  onChangeMenu(SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM)
                }
              >
                <img
                  src={emprendimientosIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                />
                Emprendimientos
              </AccordionItemSidebar>
            </h2>

            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTOS_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Administrador/Emprendimientos"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_EMPRENDIMIENTO &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={listadoEmprendimientosIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  Listado de Emprendimientos
                </Link>

                <Link
                  to={"/Administrador/Solicitudes"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={solicitudPAIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  Solicitudes Primera Atención
                </Link>
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
                  src={usuariosIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                />
                Usuarios En Ruta de I&E
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_ADMINISTRADOR_USUARIOS_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
              onClick={() => onChangeMenu(SIDEBAR_ADMINISTRADOR_USUARIOS_ITEM)}
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Administrador/Emprendedores"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_EMPRENDEDOR &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={emprendedoresIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  Listado de Emprendedores
                </Link>

                <Link
                  to={"/Administrador/Mentores"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_MENTOR &&
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
                  />
                  Listado de Mentores
                </Link>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header  m-0" id="headingThree">
              <AccordionItemSidebar
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <img
                  src={reportesIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                />
                Reportes
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_ADMINISTRADOR_REPORTES_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
              onClick={() => onChangeMenu(SIDEBAR_ADMINISTRADOR_REPORTES_ITEM)}
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Administrador/Reportes/Formacion"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_REPORTES_FORMACION &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={reportesFormacionIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  De Indicadores Formación
                </Link>

                <Link
                  to={"/Administrador/Reportes/Gestion"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_REPORTES_GESTION &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={reportesGestionIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  De Indicadores Gestión
                </Link>
              </div>
            </div>
          </div>
        </div>

        <EtiquetaSidebar>Administración APP</EtiquetaSidebar>

        <div className="accordion accordion-flush w-100" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header  m-0" id="headingFour">
              <AccordionItemSidebar
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                <img
                  src={consultoriaEspIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                />
                Gestión de Usuarios
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseFour"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
              onClick={() =>
                onChangeMenu(SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM)
              }
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Administrador/Gestion/Emprendedores"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive ==
                      SIDEBAR_ADMINISTRADOR_GESTION_EMPRENDEDORES &&
                    "activeSubItem"
                  }`}
                  style={{
                    textAlign: "left",
                    height: "72px",
                    paddingLeft: "1rem",
                  }}
                >
                  <img
                    src={emprendedoresIcon}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline",
                      marginRight: "1rem",
                    }}
                  />
                  De Emprendedores
                </Link>

                <Link
                  to={"/Administrador/Gestion/Mentores"}
                  className={`btn d-flex align-items-center ${
                    menuSubActive == SIDEBAR_ADMINISTRADOR_GESTION_MENTORES &&
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
                  />
                  De Mentores
                </Link>
              </div>
            </div>
          </div>

          <Link
            to={"/Administrador/Gestion/Anuncios"}
            className={`w-100 ${
              menuSubActive == SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO &&
              "activeSubItem"
            }`}
            style={{
              textAlign: "left",
              color: "#FFF",
              fontWeight: "bolder",
              textDecoration: "none",
            }}
            onClick={() => onChangeMenu(SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO)}
          >
            <AccordionItemSidebar
              className={`accordion-button accordion-collapse-without-draw ${
                menuActive === SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIO
                  ? ""
                  : "collapsed"
              }
               `}
              type="button"
            >
              <img
                src={consultoriaIcon}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline",
                  marginRight: "1rem",
                }}
              />
              Gestión de Anuncios
            </AccordionItemSidebar>
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}

export default AdministradorSidebar;
