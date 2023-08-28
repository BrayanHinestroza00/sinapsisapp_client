import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { MentorContext } from "src/app/Mentor/contexts/MentorContext.js";

function EditarCuenta() {
  const navigate = useNavigate();
  const { userData, setShowSidebar } = useContext(MentorContext);

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  const onHandleBack = () => {
    setShowSidebar(true);
    navigate("/Mentor");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column">
        <button
          style={{ display: "block", width: "10rem", marginTop: "1rem" }}
          className="btn btn-primary"
          onClick={onHandleBack}
        >
          Volver al inicio
        </button>
        <>
          <Titulo>Configuración de la Cuenta</Titulo>
          <FormEditarCuenta idUsuario={userData.id} />
        </>
      </div>
    </div>
  );
}

export default EditarCuenta;
