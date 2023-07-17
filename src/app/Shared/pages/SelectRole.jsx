import { Link, useLocation } from "react-router-dom";

import { obtenerNombreRol } from "../utils/utilityFunctions";

import bgImage from "src/app/Shared/assets/images/bg-login.webp";

function SelectRole() {
  const { state } = useLocation();
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <h1>Bienvenido a SINAPSIS UAO</h1>
        <p className="font-weight-bold mb-3">
          A continuación... Elige el rol con el cual deseas iniciar sesión
        </p>

        <div className="d-flex">
          {state.roles.map((rol) => {
            const rolName = obtenerNombreRol(rol);

            return (
              <div
                className="card mx-3"
                style={{ width: "20vw", height: "10vh" }}
              >
                <div className="card-body p-0">
                  <Link
                    className="btn btn-primary w-100 h-100 d-flex justify-content-center align-items-center"
                    to={`/${rolName}`}
                  >
                    {rolName}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectRole;
