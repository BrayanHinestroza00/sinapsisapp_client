import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccordionItemSidebar, EtiquetaSidebar, Sidebar } from "./styled.js";

import rutaMenuIcon from "src/app/Shared/assets/images/sidebar/ruta_main.png";
import estadoIcon from "src/app/Shared/assets/images/sidebar/estado_ruta.png";
import consultoriaMenuIcon from "src/app/Shared/assets/images/sidebar/consultoria_main.png";
import consultoriaIcon from "src/app/Shared/assets/images/sidebar/consultoria.png";
import consultoriaEspIcon from "src/app/Shared/assets/images/sidebar/consultoria_especializada.png";
import {
  SIDEBAR_ADMINISTRADOR,
  SIDEBAR_ADMINISTRADOR_EMPRENDEDORES_ITEM,
  SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIOS_ITEM,
  SIDEBAR_ADMINISTRADOR_GESTION_USUARIOS_ITEM,
  SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM,
  SIDEBAR_ADMINISTRADOR_REPORTES_ITEM,
} from "src/app/Shared/utils/constants";

function AdministradorSidebar() {
  const [menuActive, setMenuActive] = useState("");

  useEffect(() => {
    try {
      const menu_item_active = localStorage.getItem(SIDEBAR_ADMINISTRADOR);
      if (menu_item_active === null) {
        localStorage.setItem(
          SIDEBAR_ADMINISTRADOR,
          SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM
        );
        setMenuActive(SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM);
      } else {
        setMenuActive(menu_item_active);
      }
    } catch (error) {
      console.log("Error al leer el localStorage - AdministradorNavbar.jsx");
    }
  }, []);

  const onChangeMenu = (event_key) => {
    localStorage.setItem(SIDEBAR_ADMINISTRADOR, event_key);
    setMenuActive(event_key);
  };

  return (
    <Sidebar>
      <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
        <EtiquetaSidebar>Ruta de Innovación y Emprendimiento</EtiquetaSidebar>

        <div className="accordion accordion-flush w-100" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header m-0" id="headingOne">
              <AccordionItemSidebar
                className={`accordion-button ${
                  menuActive !== SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM &&
                  "collapsed"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={
                  menuActive === SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM
                    ? "true"
                    : "false"
                }
                aria-controls="collapseOne"
                onClick={() =>
                  onChangeMenu(SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM)
                }
              >
                <img
                  src={rutaMenuIcon}
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
                menuActive === SIDEBAR_ADMINISTRADOR_PRIMERA_ATENCION_ITEM &&
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
                  className="btn d-flex align-items-center"
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
                  />
                  Listado de Emprendimientos
                </Link>

                <Link
                  to={"/Administrador/Solicitudes"}
                  className="btn d-flex align-items-center"
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
                  />
                  Solicitudes Primera Atencion
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
                  src={consultoriaMenuIcon}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline",
                    marginRight: "1rem",
                  }}
                />
                Usuarios
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_ADMINISTRADOR_EMPRENDEDORES_ITEM &&
                "show active"
              }`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
              onClick={() =>
                onChangeMenu(SIDEBAR_ADMINISTRADOR_EMPRENDEDORES_ITEM)
              }
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Administrador/Emprendedores"}
                  className="btn d-flex align-items-center"
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
                  />
                  Listado de Emprendedores
                </Link>

                <Link
                  to={"/Administrador/Mentores"}
                  className="btn d-flex align-items-center"
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
                  src={consultoriaMenuIcon}
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
                  className="btn d-flex align-items-center"
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
                  />
                  De Indicadores Formación
                </Link>

                <Link
                  to={"/Administrador/Reportes/Gestion"}
                  className="btn d-flex align-items-center"
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
                  src={consultoriaMenuIcon}
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
                  className="btn d-flex align-items-center"
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
                  />
                  De Emprendedores
                </Link>

                <Link
                  to={"/Administrador/Gestion/Mentores"}
                  className="btn d-flex align-items-center"
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
                  />
                  De Mentores
                </Link>
              </div>
            </div>
          </div>

          <Link
            to={"/Administrador/Gestion/Anuncios"}
            className="w-100"
            style={{
              textAlign: "left",
              color: "#FFF",
              fontWeight: "bolder",
              textDecoration: "none",
            }}
            onClick={() =>
              onChangeMenu(SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIOS_ITEM)
            }
          >
            <AccordionItemSidebar
              className={`accordion-button accordion-collapse-without-draw ${
                menuActive === SIDEBAR_ADMINISTRADOR_GESTION_ANUNCIOS_ITEM
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
