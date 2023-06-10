import React from "react";
import { Card } from "react-bootstrap";

function SeccionRuta({ children }) {
  return (
    <Card>
      <div className="container d-flex justify-content-center p-3">
        <div style={{ maxWidth: "50vw" }}>{children}</div>
      </div>
    </Card>
  );
}

export default SeccionRuta;
