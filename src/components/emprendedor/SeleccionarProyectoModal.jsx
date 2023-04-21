import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import {
  MENU_EMPRENDEDOR_INICIO,
  SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT,
} from "src/utils/constants";
import { insertIntoLocalStorage } from "src/utils/functions";

function SeleccionarProyectoModal() {
  let navigate = useNavigate();

  const {
    userData,
    selectedProjectValue,
    loading,
    setSelectedProjectValue,
    setShowSidebar,
    setMenuItemActive,
  } = useContext(EmprendedorContext);

  const onSetMainProject = (idProject) => {
    setSelectedProjectValue(idProject);
    insertIntoLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT,
      idProject
    );

    setMenuItemActive(MENU_EMPRENDEDOR_INICIO);
    setShowSidebar(false);
    navigate("/Emprendedor");
  };

  const onCreateNewProject = () => {
    navigate("/Emprendedor/primeraAtencion");
  };

  if (loading) {
    return <h1>LOADING...</h1>;
  }

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
            {userData.proyectosEmprendimiento.length > 0 &&
              userData.proyectosEmprendimiento.map((proyecto, index) => {
                return (
                  <button
                    data-bs-dismiss="modal"
                    key={index}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "#9164a0 solid 1px",
                      marginBottom: "0.5rem",
                    }}
                    onClick={() =>
                      onSetMainProject(proyecto.idProyectoEmprendimiento)
                    }
                  >
                    <span>
                      {proyecto.nombreEmprendimiento}
                      <span className="text-muted d-block">
                        {proyecto.estadoEmprendimiento}
                        {proyecto.idProyectoEmprendimiento ==
                          selectedProjectValue && (
                          <span className="d-block text-success">
                            Seleccionado
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            <Button
              className="btn btn-primary"
              style={{
                display: "flex",
                alignSelf: "center",
                padding: "1rem",
                border: "#9164a0 solid 1px",
                marginBottom: "0.5rem",
                marginTop: "0.5rem",
                marginRight: "auto",
                marginLeft: "auto",
                color: "#FFF",
                borderRadius: "1rem",
              }}
              data-bs-dismiss="modal"
              onClick={() => onCreateNewProject()}
            >
              <span>CREAR NUEVO PROYECTO DE EMPRENDIMIENTO</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeleccionarProyectoModal;
