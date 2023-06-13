import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/Login");
  }, []);

  return <div>LogoutPage</div>;
}

export default LogoutPage;
