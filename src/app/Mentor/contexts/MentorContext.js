import { createContext, useState } from "react";

import { useLocalStorage } from "src/app/Shared/services/hooks/useLocalStorage";
import {
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
} from "src/app/Shared/utils/constants";

const MentorContext = createContext();
function MentorContextProvider({ children }) {
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
    <MentorContext.Provider
      value={{
        userData,
        loadingUserData,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
}

export { MentorContextProvider, MentorContext };
