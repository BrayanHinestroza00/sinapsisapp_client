import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AccordionItemSidebar, EtiquetaSidebar, Sidebar } from "./styled.js";
import {
  SIDEBAR_MENTOR,
  SIDEBAR_MENTOR_CONSULTORIAS_ITEM,
  SIDEBAR_MENTOR_EMPRENDEDORES_ITEM,
  SIDEBAR_MENTOR_REPORTES_ITEM,
} from "src/app/Shared/utils/constants";

import consultoriaMenuIcon from "src/app/Shared/assets/images/sidebar/consultoria_main.png";
import consultoriaIcon from "src/app/Shared/assets/images/sidebar/consultoria.png";
import consultoriaEspIcon from "src/app/Shared/assets/images/sidebar/consultoria_especializada.png";
import emprendimientosIcon from "src/app/Shared/assets/images/sidebar/administrador_emprendimientos.png";
import listadoEmprendimientosIcon from "src/app/Shared/assets/images/sidebar/administrador_listado_emprendimientos.png";
import reportesIcon from "src/app/Shared/assets/images/sidebar/administrador_reportes.png";

function MentorSidebar() {
  const [menuActive, setMenuActive] = useState("");

  useEffect(() => {
    try {
      const menu_item_active = localStorage.getItem(SIDEBAR_MENTOR);
      if (menu_item_active === null) {
        localStorage.setItem(SIDEBAR_MENTOR, SIDEBAR_MENTOR_EMPRENDEDORES_ITEM);
        setMenuActive(SIDEBAR_MENTOR_EMPRENDEDORES_ITEM);
      } else {
        setMenuActive(menu_item_active);
      }
    } catch (error) {
      console.error("Error al leer el localStorage - MentorNavbar.jsx");
    }
  }, []);

  const onChangeMenu = (event_key) => {
    localStorage.setItem(SIDEBAR_MENTOR, event_key);
    setMenuActive(event_key);
  };

  return (
    <Sidebar className="p-1 col-2">
      <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
        <EtiquetaSidebar>Ruta de Innovación y Emprendimiento</EtiquetaSidebar>

        <div className="accordion accordion-flush w-100" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header m-0" id="headingOne">
              <AccordionItemSidebar
                className={`accordion-button ${
                  menuActive !== SIDEBAR_MENTOR_EMPRENDEDORES_ITEM &&
                  "collapsed"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={
                  menuActive === SIDEBAR_MENTOR_EMPRENDEDORES_ITEM
                    ? "true"
                    : "false"
                }
                aria-controls="collapseOne"
                onClick={() => onChangeMenu(SIDEBAR_MENTOR_EMPRENDEDORES_ITEM)}
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
                Mis Emprendedores
              </AccordionItemSidebar>
            </h2>

            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_MENTOR_EMPRENDEDORES_ITEM &&
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
                  to={"/Mentor/Emprendedores"}
                  className="btn d-flex align-items-center"
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
                  Listado Emprendedores
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
                Mis Consultorías
              </AccordionItemSidebar>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${
                menuActive === SIDEBAR_MENTOR_CONSULTORIAS_ITEM && "show active"
              }`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
              onClick={() => onChangeMenu(SIDEBAR_MENTOR_CONSULTORIAS_ITEM)}
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Mentor/Consultorias"}
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
                  Consultorías Programadas
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
                menuActive === SIDEBAR_MENTOR_REPORTES_ITEM && "show active"
              }`}
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
              onClick={() => onChangeMenu(SIDEBAR_MENTOR_REPORTES_ITEM)}
            >
              <div
                className="btn-group-vertical w-100"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={"/Mentor/Reportes/Consultoria"}
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
                  De Consultorías
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default MentorSidebar;
