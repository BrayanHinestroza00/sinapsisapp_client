import { Route, Routes } from "react-router-dom";
import SignsUp from "src/components/signup/SignsUp";
import SignupForm from "src/components/signup/SignupForm";
import SignUpIntegration from "src/components/signup/SignUpIntegration";
import PageNotFound from "./PageNotFound";


function SignUpPage() {
  return (
    <Routes>
      <Route exact path="/" element={<SignsUp />} />
      <Route exact path="/Externo" element={<SignupForm />} />
      <Route exact path="/ComunidadUAO" element={<SignUpIntegration />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default SignUpPage