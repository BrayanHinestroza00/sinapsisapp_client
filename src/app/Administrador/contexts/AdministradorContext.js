import { createContext, useState } from "react";
import {
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
} from "src/app/Shared/utils/constants";
import { useLocalStorage } from "src/app/Shared/services/hooks/useLocalStorage";

const AdministradorContext = createContext();

function AdministradorContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  // Custom Hooks
  const { data: userData, loading: loadingUserData } = useLocalStorage(
    SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
    SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
  );

  if (loadingUserData || !userData) {
    return <></>;
  }

  return (
    <AdministradorContext.Provider
      value={{
        userData,
        loadingUserData,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </AdministradorContext.Provider>
  );
}

export { AdministradorContextProvider, AdministradorContext };
