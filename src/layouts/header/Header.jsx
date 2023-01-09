import { useEffect, useState } from "react";
import {
  SINAPSIS_APP_ADM_ROLE_ID,
  SINAPSIS_APP_EMP_ROLE_ID,
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_MNT_ROLE_ID,
} from "src/utils/constants";
import { getFromLocalStorage } from "src/utils/functions";
import AdministradorHeader from "./AdministradorHeader";
import EmprendedorHeader from "./EmprendedorHeader";
import MentorHeader from "./MentorHeader";

function Header() {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const { roles } = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );
    setUserRoles(roles);
  }, []);

  if (userRoles.includes(SINAPSIS_APP_ADM_ROLE_ID)) {
    return <AdministradorHeader />;
  } else if (userRoles.includes(SINAPSIS_APP_MNT_ROLE_ID)) {
    return <MentorHeader />;
  } else if (userRoles.includes(SINAPSIS_APP_EMP_ROLE_ID)) {
    return <EmprendedorHeader />;
  } else {
    return <p>SIN ROL ASIGNADO</p>;
  }
}

export default Header;
