import { useContext, useEffect } from "react";

import Anuncios from "src/app/Shared/pages/Anuncios";

import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";

function AnunciosPage() {
  const { setShowSidebar } = useContext(EmprendedorContext);

  useEffect(() => {
    setShowSidebar(false);
  }, []);

  return <Anuncios />;
}

export default AnunciosPage;
