import { useNavigate } from "react-router-dom";
import SignUpComponent from "../../components/SignUp/SignUp";

function SignUp() {
  let navigate = useNavigate();
  const onClickBtnComunidadUAO = () => {
    navigate("/Signup/ComunidadUAO");
  };

  const onClickBtnExterno = () => {
    navigate("/Signup/Externo");
  };

  return (
    <SignUpComponent
      onClickBtnComunidadUAO={onClickBtnComunidadUAO}
      onClickBtnExterno={onClickBtnExterno}
    />
  );
}

export default SignUp;
