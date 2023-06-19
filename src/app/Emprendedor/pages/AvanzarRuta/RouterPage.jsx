import { Route, Routes } from "react-router-dom";

import SonarPage from "./EtapasRuta/SonarPage";
import HomePage from "./HomePage";
import PensarPage from "./EtapasRuta/PensarPage";
import TestearPage from "./EtapasRuta/TestearPage";
import ArrancarPage from "./EtapasRuta/ArrancarPage";

function RouterPage() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/Soñar" element={<SonarPage />} />
      <Route path="/Pensar" element={<PensarPage />} />
      <Route path="/Testear" element={<TestearPage />} />
      <Route path="/Arrancar" element={<ArrancarPage />} />
    </Routes>
  );
}

export default RouterPage;
