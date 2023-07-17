import { useContext, useEffect } from "react";

import Anuncios from "src/app/Shared/pages/Anuncios";

import { AdministradorContext } from "src/app/Administrador/contexts/AdministradorContext";

function AnunciosPage() {
  const { setShowSidebar } = useContext(AdministradorContext);

  useEffect(() => {
    setShowSidebar(true);
  }, []);

  return <Anuncios />;
}

export default AnunciosPage;
