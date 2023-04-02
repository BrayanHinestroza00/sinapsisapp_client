import { createContext } from "react";
import {
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
} from "src/utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MentorContext = createContext();
function MentorContextProvider({ children }) {
  // Custom Hooks
  const { data: userData, loading: loadingUserData } = useLocalStorage(
    SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
    SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
  );

  if (loadingUserData || !userData) {
    return <></>;
  }

  return (
    <MentorContext.Provider
      value={{
        userData,
        loadingUserData,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
}

export { MentorContextProvider, MentorContext };
