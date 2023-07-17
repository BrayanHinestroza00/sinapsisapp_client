import { useContext, useEffect } from "react";

import Anuncios from "src/app/Shared/pages/Anuncios";

import { MentorContext } from "src/app/Mentor/contexts/MentorContext";

function AnunciosPage() {
  const { setShowSidebar } = useContext(MentorContext);

  useEffect(() => {
    setShowSidebar(true);
  }, []);

  return <Anuncios />;
}

export default AnunciosPage;
