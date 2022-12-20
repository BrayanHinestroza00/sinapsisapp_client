import React from "react";
import AdministradorHeader from "./AdministradorHeader";
import EmprendedorHeader from "./EmprendedorHeader";
import MentorHeader from "./MentorHeader";

function Header() {
  const userRole = "Emprendedor";

  if (userRole === "Administrador") {
    return <AdministradorHeader />;
  } else if (userRole === "Mentor") {
    return <MentorHeader />;
  } else if (userRole === "Emprendedor") {
    return <EmprendedorHeader />;
  } else {
    return <p>SIN ROL ASIGNADO</p>;
  }
}

export default Header;
