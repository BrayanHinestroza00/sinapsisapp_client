import { useState } from "react";

import EtapaSonar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Sonar";
import EtapaPensar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Pensar";
import EtapaTestear from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Testear";
import EtapaArrancar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Arrancar";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [iniciar, setIniciar] = useState(false);
  const { state } = useLocation();

  /**
   * 1. Consultar etapa del proyecto actual - tener en cuenta info del localstorage
   * 2. Si la etapa no ha iniciado, mostrar el botón con texto "INICIAR", sino "CONTINUAR PROGRESO"
   * 3. Realizar enrutamiento de aplicativo a sub etapas de la ruta
   */

  return (
    <>
      <EtapaSonar showButton={true} stateButton={state} />
      <EtapaPensar showButton={false} />
      <EtapaTestear showButton={false} />
      <EtapaArrancar showButton={false} />
    </>
  );
}

export default HomePage;
