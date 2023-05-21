import { useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import {
  HTTP_METHOD_GET,
  URL_OBTENER_INFO_SESION_EMPRENDEDOR,
} from "src/app/Shared/utils/apiConstants";
import {
  MENU_EMPRENDEDOR_INICIO,
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
  SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT,
} from "src/app/Shared/utils/constants";
import {
  getFromLocalStorage,
  insertIntoLocalStorage,
} from "src/app/Shared/utils/localStorage";
import { useFetch } from "src/app/Shared/services/hooks/useFetch.js";
import { useLocalStorage } from "src/app/Shared/services/hooks/useLocalStorage";

const EmprendedorContext = createContext();

function EmprendedorContextProvider({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuItemActive, setMenuItemActive] = useState(MENU_EMPRENDEDOR_INICIO);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProjectValue, setSelectedProjectValue] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Custom Hooks
  const { data: userInitialData, loading: loadingUserInitialData } =
    useLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

  const { data: preloadData, loadingPreLoadData, fetchAPI } = useFetch();

  useEffect(() => {
    if (!loadingUserInitialData && userInitialData) {
      fetchAPI({
        URL: URL_OBTENER_INFO_SESION_EMPRENDEDOR,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idUsuario: userInitialData.id,
          },
        },
      });
    }
  }, [userInitialData, loadingUserInitialData, location.key]);

  /**
   * Obtiene informacion del usuario y los proyectos asociados a el
   */
  useEffect(() => {
    if (!loadingPreLoadData && preloadData) {
      setUserData({
        ...userInitialData,
        esPrimeraVez: preloadData.primeraVez,
        proyectosEmprendimiento: preloadData.proyectosEmprendimiento,
      });
    }
  }, [loadingPreLoadData, preloadData]);

  /**
   * Obtiene el proyecto seleccionado como principal
   */
  useEffect(() => {
    if (userData && userData.proyectosEmprendimiento.length > 0) {
      const storageSelectedProject = getFromLocalStorage(
        SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT
      );

      if (storageSelectedProject) {
        setSelectedProjectValue(storageSelectedProject);
      } else {
        const defaultProject =
          userData.proyectosEmprendimiento[0].idProyectoEmprendimiento;
        insertIntoLocalStorage(
          SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT,
          defaultProject
        );
        setSelectedProjectValue(defaultProject);
      }
      getIndexSelectedProject(userData.proyectosEmprendimiento);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      getIndexSelectedProject(userData.proyectosEmprendimiento);
    }
  }, [selectedProjectValue, userData]);

  const getIndexSelectedProject = (proyectosEmprendimiento) => {
    const index = proyectosEmprendimiento.findIndex(
      (proyectoEmprendimiento) =>
        proyectoEmprendimiento.idProyectoEmprendimiento == selectedProjectValue
    );
    if (index != -1) {
      setSelectedProjectIndex(index);
    }
    setLoading(false);
  };

  if (loading || !userData) {
    return <></>;
  }

  return (
    <EmprendedorContext.Provider
      value={{
        userData,
        selectedProjectValue,
        selectedProjectIndex,
        loading,
        showSidebar,
        menuItemActive,
        setMenuItemActive,
        setShowSidebar,
        setSelectedProjectValue,
      }}
    >
      {children}
    </EmprendedorContext.Provider>
  );
}

export { EmprendedorContextProvider, EmprendedorContext };
