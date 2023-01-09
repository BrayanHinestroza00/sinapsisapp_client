import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import {
  Ruta,
  SubTitulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { getCurrentDate } from "src/utils/functions";

function HistorialConsultoria() {
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Card>
      <SubTitulo>Filtros</SubTitulo>
      <Ruta
        style={{
          padding: "0rem 2rem 1rem 2rem",
          marginTop: "0rem",
          marginLeft: "0rem",
        }}
      >
        <form onSubmit={onHandleSubmit} className="row g-3">
          {/* Fecha de inicio */}
          <div className="col-md-6">
            <Label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio
            </Label>
            <Input
              type="date"
              className="form-control inputDiag"
              name="fechaInicio"
              id="fechaInicio"
              max={getCurrentDate()}
              value={datos.fechaInicio != null ? datos.fechaInicio : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaInicio && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaInicio}
              </small>
            )}
          </div>

          {/* Fecha de finalización */}
          <div className="col-md-6">
            <Label htmlFor="fechaFin" className="form-label">
              Fecha de Finalización
            </Label>
            <Input
              type="date"
              className="form-control inputDiag"
              name="fechaFin"
              id="fechaFin"
              max={getCurrentDate()}
              value={datos.fechaFin != null ? datos.fechaFin : ""}
              onChange={(e) => onHandleChange(e)}
            />
            {error.fechaFin && (
              <small className="form-text font-weight-bold text-danger">
                {error.fechaFin}
              </small>
            )}
          </div>

          <div>
            <button className="btn btn-primary">Generar Historial</button>
          </div>
        </form>
      </Ruta>
    </Card>
  );
}

export default HistorialConsultoria;
