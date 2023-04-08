import { useState } from "react";
import { Card } from "react-bootstrap";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import AnuncioModal from "src/components/AnuncioModal";
import ListadoAnuncios from "src/components/ListadoAnuncios";

function GestionAnunciosPage() {
  const [showModal, setShowModal] = useState({ show: false });

  const onClicCrearAnuncio = () => {
    setShowModal({ show: true });
  };

  const onClicHideCrearAnuncio = () => {
    setShowModal({ show: false });
  };

  return (
    <Card>
      <Titulo>Gestion de Anuncios </Titulo>
      <div className="container">
        <div className="row col-md-2">
          <button className="btn btn-primary mb-4" onClick={onClicCrearAnuncio}>
            Crear Anuncio
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ListadoAnuncios />
          </div>
        </div>
      </div>

      {showModal.show && (
        <AnuncioModal show={showModal.show} onHide={onClicHideCrearAnuncio} />
      )}
    </Card>
  );
}

export default GestionAnunciosPage;
