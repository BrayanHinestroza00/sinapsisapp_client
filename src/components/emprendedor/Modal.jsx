import { useEffect, useState } from "react";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";
import { getFromLocalStorage } from "src/utils/functions";

function Modal() {
  const [loading, setLoading] = useState(true);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    console.log(userData.proyectosEmprendimiento);

    setProyectos(userData.proyectosEmprendimiento);
    setLoading(false);
  }, []);

  const onSetMainProject = (idProject) => {
    console.log(idProject);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Elige tu proyecto de emprendimiento
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {loading == false &&
              proyectos.length > 0 &&
              proyectos.map((proyecto, index) => {
                return (
                  <button
                    key={index}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "#9164a0 solid 1px",
                      marginBottom: "0.5rem",
                    }}
                    onClick={() => onSetMainProject(proyecto.id)}
                  >
                    <span>{proyecto.estadoEmprendimiento}</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
