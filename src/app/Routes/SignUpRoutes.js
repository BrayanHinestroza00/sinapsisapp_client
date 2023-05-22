import { Route, Routes } from "react-router-dom";

import SignUp from "../Shared/pages/SignUp/SignUp";
import SignUpExterno from "../Shared/pages/SignUp/SignUpExterno";
import SignUpIntegration from "../Shared/pages/SignUp/SignUpIntegration";
import Error404 from "../Shared/pages/error/Error404/Error404";

function SignUpRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<SignUp />} />
      <Route exact path="/Externo" element={<SignUpExterno />} />
      <Route exact path="/ComunidadUAO" element={<SignUpIntegration />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export default SignUpRoutes;
