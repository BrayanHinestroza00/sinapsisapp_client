import Axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  HOST,
  MENU_EMPRENDEDOR_INICIO,
  SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO,
  SINAPSIS_APP_LOCALSTORAGE_SELECTED_PROJECT,
} from "src/utils/constants";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  insertIntoLocalStorage,
} from "src/utils/functions";

const EmprendedorContext = createContext();

function EmprendedorContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuItemActive, setMenuItemActive] = useState(MENU_EMPRENDEDOR_INICIO);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProjectValue, setSelectedProjectValue] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  /**
   * Obtiene informacion del usuario y los proyectos asociados a el
   */
  useEffect(() => {
    if (!userData) {
      const userInitialData = getFromLocalStorage(
        SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
      );

      Axios.get(`${HOST}/app/preload/emprendedor`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        params: {
          idUsuario: userInitialData.id,
        },
      })
        .then(({ data }) => {
          deleteFromLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO);
          insertIntoLocalStorage(SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO, {
            ...userInitialData,
            esPrimeraVez: data.response.primeraVez,
            proyectosEmprendimiento: data.response.proyectosEmprendimiento,
          });

          setUserData({
            ...userInitialData,
            esPrimeraVez: data.response.primeraVez,
            proyectosEmprendimiento: data.response.proyectosEmprendimiento,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

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
        const defaultProject = userData.proyectosEmprendimiento[0].id;
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
      setLoading(false);
    }
  }, [selectedProjectValue]);

  const getIndexSelectedProject = (proyectosEmprendimiento) => {
    const index = proyectosEmprendimiento.findIndex(
      (proyectoEmprendimiento) =>
        proyectoEmprendimiento.id == selectedProjectValue
    );
    if (index != -1) {
      setSelectedProjectIndex(index);
    }
  };

  /**
   * Determina si se debe renderizar el sidebar
   */

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
