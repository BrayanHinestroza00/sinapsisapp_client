import { Navigate, Route, Routes } from "react-router-dom";

import Login from "src/app/Shared/pages/Login.jsx";
import Error404 from "../Shared/pages/error/Error404/Error404";
// import SignUp from "../pages/SignUpPage";
// import LogoutPage from "../pages/LogoutPage";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={"/Login"} />} />
      <Route exact path="/Login" element={<Login />} />
      {/* <Route exact path="/Logout" element={<LogoutPage />} />
      <Route path="/SignUp/*" element={<SignUp />} /> */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default AppRoutes;
