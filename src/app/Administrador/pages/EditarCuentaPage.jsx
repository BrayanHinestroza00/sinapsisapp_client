import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormEditarCuenta from "src/app/Shared/components/FormEditarCuenta";

import { Titulo } from "src/app/Shared/assets/styles/Common";
import { AdministradorContext } from "../contexts/AdministradorContext";

function EditarCuentaPage() {
  const { userData, setShowSidebar } = useContext(AdministradorContext);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  const onHandleBack = () => {
    setShowSidebar(true);
    navigate("/Administrador");
  };

  return (
    <>
      <button
        style={{ display: "block", width: "10rem", marginTop: "1rem" }}
        className="btn btn-primary"
        onClick={onHandleBack}
      >
        Volver al inicio
      </button>
      <Titulo>Configuración de la Cuenta</Titulo>
      <FormEditarCuenta idUsuario={userData.id} />
    </>
  );
}

export default EditarCuentaPage;
