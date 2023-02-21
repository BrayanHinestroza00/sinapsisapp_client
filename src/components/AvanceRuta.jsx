function AvanceRuta() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Actividades</h3>
          <div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">
                Conectar y potencializar tu perfil como emprendedor{" "}
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">PLAN DE NEGOCIOS </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">POR DONDE COMENZAR </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">
                CONTENIDO DEL PLAN DE NEGOCIOS{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h3>Herramientas</h3>
          <div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">
                Perfil del emprendedor{" "}
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">
                Guía para hacer un diagnóstico en la etapa de creación de
                empresa
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type={"checkbox"} />
              <label className="form-check-label">
                Diagnostico - plan de acción{" "}
              </label>
            </div>
          </div>
          <div className="form-check">
            <input className="form-check-input" type={"checkbox"} />
            <label className="form-check-label">
              Matriz de Redacción "Plan de Negocios"
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvanceRuta;
