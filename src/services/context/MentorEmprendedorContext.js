import { createContext, useState } from "react";

const MentorEmprendedorContext = createContext();

function MentorEmprendedorContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    cedulaEmprendedor: 12345,
    nombre: "Prueba",
  });

  return (
    <MentorEmprendedorContext.Provider
      value={{
        userData,
        loading,
      }}
    >
      {children}
    </MentorEmprendedorContext.Provider>
  );
}

export { MentorEmprendedorContextProvider, MentorEmprendedorContext };
