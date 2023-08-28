import { Button, Container, Modal } from "react-bootstrap";

import VerPerfilComponent from "src/app/Shared/components/PerfilUsuario/VerPerfil";

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
          <Subtitulo style={{ color: "#FFF" }}>Perfil de Mentor</Subtitulo>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fbf6fc" }}>
        <Container>
          <VerPerfilComponent datos={datos} />
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <Button variant="primary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerPerfil;
