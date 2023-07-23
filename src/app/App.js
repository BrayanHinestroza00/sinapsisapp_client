import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "src/app/Shared/assets/styles/Theme/Global.js";
import { theme } from "src/app/Shared/assets/styles/Theme/Theme.js";

import "src/app/Shared/assets/styles/index.css";
import "react-flexy-table/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "src/app/Shared/assets/styles/react-flexy-table.css";
import "src/app/Shared/assets/styles/bootstrap.css";

import AppRoutes from "./Routes/AppRoutes";
import AuthMentor from "./Routes/ProtectRoutes/AuthMentor";
import AuthEmprendedor from "./Routes/ProtectRoutes/AuthEmprendedor";
import AuthAdministrador from "./Routes/ProtectRoutes/AuthAdministrador";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/Emprendedor/*" element={<AuthEmprendedor />} />
          <Route path="/Administrador/*" element={<AuthAdministrador />} />
          <Route path="/Mentor/*" element={<AuthMentor />} />
          <Route path="*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
