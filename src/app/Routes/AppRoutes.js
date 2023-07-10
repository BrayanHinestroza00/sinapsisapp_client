import { Navigate, Route, Routes } from "react-router-dom";

import Login from "src/app/Shared/pages/Login.jsx";
import Error404 from "../Shared/pages/error/Error404/Error404";
import Logout from "../Shared/pages/Logout";
import SignUpRoutes from "./SignUpRoutes";
import SelectRole from "../Shared/pages/SelectRole";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={"/Login"} />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/SelectRole" element={<SelectRole />} />
      <Route exact path="/Logout" element={<Logout />} />
      <Route path="/SignUp/*" element={<SignUpRoutes />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default AppRoutes;
