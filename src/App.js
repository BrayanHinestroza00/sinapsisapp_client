import { BrowserRouter, Route, Routes } from "react-router-dom";

import EmprendedorRoutes from "./routes/EmprendedorRoutes";
import MentorRoutes from "./routes/MentorRoutes";
import AdministradorRoutes from "./routes/AdministradorRoutes";
import AppRoutes from "./routes/AppRoutes";

import "./assets/styles/css/App.css";
import "./assets/styles/css/react-flexy-table.css";
import "./assets/styles/css/bootstrap.css";
import "./assets/styles/css/modal-editar-disponibilidad.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Emprendedor/*" element={<EmprendedorRoutes />} />
        <Route path="/Administrador/*" element={<AdministradorRoutes />} />
        <Route path="/Mentor/*" element={<MentorRoutes />} />
        <Route path="*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
