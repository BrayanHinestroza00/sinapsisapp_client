import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/LoginPage";
import SignUp from "../pages/SignUpPage";
import LogoutPage from "../pages/LogoutPage";
import PageNotFound from "../pages/PageNotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={"/Login"} />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/Logout" element={<LogoutPage />} />
      <Route path="/SignUp/*" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
