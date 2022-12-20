import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectToEstado() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/Emprendedor/Ruta/Estado");
  }, []);

  return <div>RedirectToEstado</div>;
}

export default RedirectToEstado;
