import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectToMainRuta() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/Emprendedor/Ruta/Avanzar");
  }, []);

  return <div>RedirectToMainRuta</div>;
}

export default RedirectToMainRuta;
