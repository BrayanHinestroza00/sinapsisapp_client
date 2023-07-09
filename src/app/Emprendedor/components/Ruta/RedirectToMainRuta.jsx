import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { EmprendedorContext } from "../../contexts/EmprendedorContext";

function RedirectToMainRuta() {
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (
      userData.proyectosEmprendimiento[selectedProjectIndex]
        .estadoEmprendimiento == "TERMINADO"
    ) {
      navigate("/Emprendedor/Ruta/Estado");
    } else {
      navigate("/Emprendedor/Ruta/Avanzar");
    }
  }, []);

  return <div>RedirectToMainRuta</div>;
}

export default RedirectToMainRuta;
