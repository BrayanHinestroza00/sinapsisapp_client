import { createContext, useState } from "react";

const AdminEmprendedorContext = createContext();

function AdminEmprendedorContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    cedulaEmprendedor: 12345,
    nombre: "Prueba",
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
