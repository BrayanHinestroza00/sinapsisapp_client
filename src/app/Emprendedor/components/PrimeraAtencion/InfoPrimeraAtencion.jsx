import { useState } from "react";
import SelectMultiple from "react-select";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Input,
  Label,
  Paso,
  TituloStepByStep,
} from "./styled";
import { getCurrentDate } from "src/app/Shared/utils/utilityFunctions";
import { validacionesPrimeraAtencionPA } from "src/app/Shared/services/validation/validatePrimeraAtencion";

function InfoPrimeraAtencion(props) {
  const [error, setError] = useState({});

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionPA(props.datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  return (
    <Contenido
      className="container"
      style={{ backgroundColor: "#FFF", padding: "1rem 10rem" }}
    >
      <div className="text-center">
        <Circulo>
          <Paso>3</Paso>
        </Circulo>
        <TituloStepByStep>Información de Primera atención</TituloStepByStep>
      </div>

      <form className="row g-3">
        <div className="col-md-6 mb-3">
          <Label htmlFor="nombreProducto" className="form-label">
            Producto o Servicio
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreProducto"
            name="nombreProducto"
            value={props.datos.nombreProducto || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.nombreProducto && (
            <small className="form-text font-weight-bold text-danger">
              {error.nombreProducto}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="promedioVentas" className="form-label">
            Promedio de ventas
          </Label>
          <Input
            type="text"
            className="form-control"
            id="promedioVentas"
            name="promedioVentas"
            value={props.datos.promedioVentas || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.promedioVentas && (
            <small className="form-text font-weight-bold text-danger">
              {error.promedioVentas}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="evidenciaProducto" className="form-label">
            ¿Cuál es la evidencia de su producto/servicio?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="evidenciaProducto"
            name="evidenciaProducto"
            value={props.datos.evidenciaProducto || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.evidenciaProducto && (
            <small className="form-text font-weight-bold text-danger">
              {error.evidenciaProducto}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="obtencionMateriasPrimas" className="form-label">
            ¿Dónde consigue la materia prima?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="obtencionMateriasPrimas"
            name="obtencionMateriasPrimas"
            value={props.datos.obtencionMateriasPrimas || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.obtencionMateriasPrimas && (
            <small className="form-text font-weight-bold text-danger">
              {error.obtencionMateriasPrimas}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="equipoTrabajo" className="form-label">
            ¿Tiene equipo de trabajo?
            <span> (*)</span>
          </Label>
          <select
            className="form-select"
            id="equipoTrabajo"
            name="equipoTrabajo"
            value={props.datos.equipoTrabajo || "-1"}
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Seleccione...
            </option>
            <option value="S">SÍ</option>
            <option value="N">NO</option>
          </select>
          {error.equipoTrabajo && (
            <small className="form-text font-weight-bold text-danger">
              {error.equipoTrabajo}
            </small>
          )}
        </div>

        {props.datos.equipoTrabajo == "S" ? (
          <div className="col-md-6 mb-3">
            <Label htmlFor="cualEquipoTrabajo" className="form-label">
              ¿Cuál es su equipo de trabajo?
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="cualEquipoTrabajo"
              name="cualEquipoTrabajo"
              value={props.datos.cualEquipoTrabajo || ""}
              onChange={(e) => props.handleChange(e)}
            />
            {error.cualEquipoTrabajo && (
              <small className="form-text font-weight-bold text-danger">
                {error.cualEquipoTrabajo}
              </small>
            )}
          </div>
        ) : (
          <div className="col-md-6 mb-3"></div>
        )}

        <div className="col-md-6">
          <Label htmlFor="dedicacion" className="form-label">
            ¿A qué se dedica?
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="dedicacion"
            name="dedicacion"
            value={props.datos.dedicacion || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.dedicacion && (
            <small className="form-text font-weight-bold text-danger">
              {error.dedicacion}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="desdeFechaEjecucion" className="form-label">
            ¿Desde cuándo lleva ejecutando la idea?
          </Label>
          <Input
            type="date"
            className="form-control"
            id="desdeFechaEjecucion"
            name="desdeFechaEjecucion"
            max={getCurrentDate()}
            value={props.datos.desdeFechaEjecucion || undefined}
            onChange={(e) => props.handleChange(e)}
          />
          {error.desdeFechaEjecucion && (
            <small className="form-text font-weight-bold text-danger">
              {error.desdeFechaEjecucion}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="horasSemanales" className="form-label">
            Número de horas dedicadas a la semana
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="horasSemanales"
            name="horasSemanales"
            value={props.datos.horasSemanales || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.horasSemanales && (
            <small className="form-text font-weight-bold text-danger">
              {error.horasSemanales}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="motivacion" className="form-label">
            ¿Cuál es su motivación?
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="motivacion"
            name="motivacion"
            value={props.datos.motivacion || ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.motivacion && (
            <small className="form-text font-weight-bold text-danger">
              {error.motivacion}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="descubrioSinapsis" className="form-label">
            ¿Cómo se enteró de los servicios de SINAPSIS UAO?
            <span> (*)</span>
          </Label>
          <SelectMultiple
            // className="form-select"
            id="descubrioSinapsis"
            name="descubrioSinapsis"
            value={props.datos.descubrioSinapsis}
            onChange={(e) => props.handleChange(e)}
            options={[
              { value: "REDES_SOCIALES", label: "REDES SOCIALES" },
              { value: "ASIGNATURAS", label: "ASIGNATURAS" },
              { value: "RECORRIDO_CAMPUS", label: "RECORRIDO CAMPUS" },
              { value: "OTRO", label: "OTRO MEDIO" },
            ]}
            isMulti
          />
          {error.descubrioSinapsis && (
            <small className="form-text font-weight-bold text-danger">
              {error.descubrioSinapsis}
            </small>
          )}
        </div>

        {props.datos.descubrioSinapsis &&
          props.datos.descubrioSinapsis.length > 0 &&
          props.datos.descubrioSinapsis.map((metodoDescubrio, index) => {
            if (metodoDescubrio.value == "OTRO") {
              return (
                <div key={index} className="col-md-6 mb-3">
                  <Label
                    htmlFor="cualOtroDescubrioSinapsis"
                    className="form-label"
                  >
                    ¿Cuál fue el otro medio?
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="cualOtroDescubrioSinapsis"
                    name="cualOtroDescubrioSinapsis"
                    value={props.datos.cualOtroDescubrioSinapsis || ""}
                    onChange={(e) => props.handleChange(e)}
                  />
                  {error.cualOtroDescubrioSinapsis && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.cualOtroDescubrioSinapsis}
                    </small>
                  )}
                </div>
              );
            }
          })}
        <div className="col-12 d-flex flex-row-reverse">
          <BotonSiguiente
            type="button"
            className="btn btn-primary"
            style={{ height: "auto" }}
            onClick={onHandleSubmit}
          >
            Siguiente
          </BotonSiguiente>
          <Boton
            type="button"
            className="btn btn-outline-primary"
            style={{ height: "auto" }}
            onClick={() => {
              props.prevStep();
            }}
          >
            Volver
          </Boton>
        </div>
      </form>
    </Contenido>
  );
}

export default InfoPrimeraAtencion;
