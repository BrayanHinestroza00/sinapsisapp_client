import { Route, Routes } from "react-router-dom";

import SonarPage from "./EtapasRuta/SonarPage";
import HomePage from "./HomePage";

function RouterPage() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/Soñar" element={<SonarPage />} />
      <Route path="/Pensar" element={<SonarPage />} />
      <Route path="/Testear" element={<SonarPage />} />
      <Route path="/Arrancar" element={<SonarPage />} />
    </Routes>
  );
}

export default RouterPage;
