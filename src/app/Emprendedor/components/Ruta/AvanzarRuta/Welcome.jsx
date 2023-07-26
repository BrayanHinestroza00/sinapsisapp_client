import { Modal } from "react-bootstrap";
import logoSinapsis from "src/app/Shared/assets/images/logo_sinapsis.png";

function Welcome(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header
        style={{
          color: "#FFF",
          backgroundColor: "#752a88",
          fontWeight: "bold",
        }}
        closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{ color: "#FFF" }}>Bienvenido a SINAPSIS UAO</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#fbf6fc",
        }}
      >
        <div className="container text-center p-4" style={{ fontSize: "2rem" }}>
          <img
            className="mb-2"
            src={logoSinapsis}
            style={{ maxHeight: "10vh" }}
          />
          <p className="mb-4">
            ¡Bienvenidos a nuestra plataforma web dedicada a conectar y
            potencializar tu perfil como emprendedor! Si eres una mente
            creativa, llena de ideas y ambiciones, has llegado al lugar
            indicado. Aquí encontrarás una comunidad vibrante y un conjunto de
            herramientas diseñadas para ayudarte a impulsar tus proyectos y
            hacer crecer tu emprendimiento de forma significativa.
          </p>
          <p className="mb-4">
            Nos emociona ser parte de tu trayectoria como emprendedor, y estamos
            comprometidos a brindarte los recursos y el apoyo que necesitas para
            alcanzar tus metas. En este espacio, descubrirás oportunidades para
            expandir tu red de contactos, aprender de expertos en el campo,
            acceder a cursos y contenidos exclusivos, y encontrar inspiración
            para superar cualquier obstáculo en tu camino hacia el éxito.
          </p>

          <p className="mb-4">
            El emprendimiento es un camino emocionante y desafiante, pero no
            estás solo. Nuestra plataforma está aquí para unir fuerzas contigo y
            proporcionarte las herramientas necesarias para que alcances todo tu
            potencial como emprendedor. ¡Juntos construiremos un futuro lleno de
            logros y realizaciones! Así que, sin más preámbulos, ¡comencemos
            esta emocionante travesía hacia el éxito!
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#fbf6fc" }}>
        <button className="btn btn-primary" onClick={props.onHide}>
          Ir a la ruta
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Welcome;
