import { createContext } from "react";
import {
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
} from "src/utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AdministradorContext = createContext();

function AdministradorContextProvider({ children }) {
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
      }}
    >
      {children}
    </AdministradorContext.Provider>
  );
}

export { AdministradorContextProvider, AdministradorContext };
