import React from "react";
import {
  Input,
  Label,
  TextArea,
} from "src/assets/styles/emprendedor/primeraAtencion.style";

function ProyectoEmprendimiento({ datos }) {
  return (
    <form>
      <div className="mb-3">
        <Label htmlFor="nombreEmprendimiento" className="form-label">
          Nombre del emprendimiento
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="nombreEmprendimiento"
          name="nombreEmprendimiento"
          placeholder="Nombre del emprendimiento"
          value={datos.nombreEmprendimiento}
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="descripcionEmprendimiento" className="form-label">
          Descripción del emprendimiento<span> (*)</span>
        </Label>
        <TextArea
          type="text"
          className="form-control"
          id="descripcionEmprendimiento"
          name="descripcionEmprendimiento"
          placeholder="Descripción del emprendimiento"
          value={datos.descripcionEmprendimiento}
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="necedidadEmprendimiento" className="form-label">
          Necesidad o problema que soluciona<span> (*)</span>
        </Label>
        <TextArea
          type="text"
          className="form-control"
          id="necedidadEmprendimiento"
          name="necedidadEmprendimiento"
          placeholder="Necesidad o problema que soluciona"
          value={datos.necedidadEmprendimiento}
        />
      </div>

      <div className="mb-3">
        <Label htmlFor="clienteEmprendimiento" className="form-label">
          Principal cliente o usuario<span> (*)</span>
        </Label>
        <TextArea
          type="text"
          className="form-control"
          id="clienteEmprendimiento"
          name="clienteEmprendimiento"
          placeholder="Principal cliente o usuario"
          value={datos.clienteEmprendimiento}
        />
      </div>

      <div className="mb-3">
        <Label htmlFor="validacionesEmprendimiento" className="form-label">
          Validaciones que ha realizado<span> (*)</span>
        </Label>
        <TextArea
          type="text"
          className="form-control"
          id="validacionesEmprendimiento"
          name="validacionesEmprendimiento"
          placeholder="Validaciones que ha realizado"
          value={datos.validacionesEmprendimiento}
        />
      </div>

      <div className="mb-3">
        <Label htmlFor="instrumentosValidacion" className="form-label">
          Instrumentos que ha utilizado para realizar las validaciones
          <span> (*)</span>
        </Label>
        <TextArea
          type="text"
          className="form-control"
          id="instrumentosValidacion"
          name="instrumentosValidacion"
          placeholder="Instrumentos para realizar las validaciones"
          value={datos.instrumentosValidacion}
        />
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <Label htmlFor="tipoEmprendimiento" className="form-label">
            Tipo de emprendimiento<span> (*)</span>
          </Label>
          <select
            id="tipoEmprendimiento"
            className="form-select"
            name="tipoEmprendimiento"
            value={datos.tipoEmprendimiento}
          >
            <option disabled selected>
              Selecciona el tipo de emprendimiento
            </option>
            <option value="Dinamico">Dinámico</option>
            <option value="Alto Impacto">Alto impacto</option>
          </select>
        </div>

        <div className="mb-3 col-md-6">
          <Label htmlFor="tipoEconomia" className="form-label">
            Tipo de economía<span> (*)</span>
          </Label>
          <select
            id="tipoEconomia"
            className="form-select"
            name="tipoEconomia"
            value={datos.tipoEconomia}
          >
            <option disabled selected>
              Selecciona el tipo de economía
            </option>
            <option value="Digital">Digital</option>
            <option value="Creativo y Cultural">Creativo y cultural</option>
            <option value="Verde">Verde</option>
            <option value="Social y Solidario">Social y solidario</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default ProyectoEmprendimiento;
