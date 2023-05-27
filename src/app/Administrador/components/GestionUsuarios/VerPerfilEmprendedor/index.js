import { Button, Container, Modal } from "react-bootstrap";

import VerPerfilComponent from "src/app/Emprendedor/components/Perfil/VerPerfil";

import { Subtitulo } from "src/app/Shared/assets/styles/Common.js";

function VerPerfil({ show, datos, onHide }) {
  return (
    <Modal show={show} style={{ padding: "1rem" }} size="lg">
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
      >
        <Modal.Title>
          <Subtitulo style={{ color: "#FFF" }}>Perfil de Emprendedor</Subtitulo>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Container>
          <VerPerfilComponent preloadData={datos} />
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button className="btn btn-primary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerPerfil;
