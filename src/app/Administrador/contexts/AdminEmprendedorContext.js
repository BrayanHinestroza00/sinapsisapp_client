import { createContext, useState } from "react";

const AdminEmprendedorContext = createContext();

function AdminEmprendedorContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    idEmprendedor: 12345,
    idProyectoEmprendimiento: 123,
  });

  return (
    <AdminEmprendedorContext.Provider
      value={{
        userData,
        loading,
      }}
    >
      {children}
    </AdminEmprendedorContext.Provider>
  );
}

export { AdminEmprendedorContextProvider, AdminEmprendedorContext };
