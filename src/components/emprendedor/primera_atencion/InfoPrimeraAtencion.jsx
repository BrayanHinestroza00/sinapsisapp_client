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
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { getCurrentDate } from "src/utils/functions";

function InfoPrimeraAtencion(props) {
  const [error, setError] = useState({});

  const validaciones = (valores) => {
    const errors = {};
    const { celular, ciudad, direccion, genero, vinculoConU, fechaNacimiento } =
      valores;

    if (!fechaNacimiento) {
      errors.fechaNacimiento = "Campo Obligatorio";
    }
    if (!ciudad) {
      errors.ciudad = "Campo Obligatorio";
    }
    if (!direccion) {
      errors.direccion = "Campo Obligatorio";
    }
    if (!celular) {
      errors.celular = "Campo Obligatorio";
    } else {
      const RegExp = /^\D*\d{1,10}$/;
      if (!RegExp.test(celular)) {
        errors.celular = "Solo se permiten números y máximo 10 dígitos";
      }
    }
    if (!genero) {
      errors.genero = "Campo Obligatorio";
    }
    if (!vinculoConU) {
      errors.vinculoConU = "Campo Obligatorio";
    } else {
      switch (vinculoConU) {
        case "Estudiante":
          const { codigoEstudiantil, tipoEstudiante, programaAcademico } =
            valores;
          if (!codigoEstudiantil) {
            errors.codigoEstudiantil = "Campo Obligatorio";
          }
          if (!tipoEstudiante) {
            errors.tipoEstudiante = "Campo Obligatorio";
          }
          if (!programaAcademico) {
            errors.programaAcademico = "Campo Obligatorio";
          }

          break;
        case "Egresado":
          const { profesionEgresado } = valores;
          if (!profesionEgresado) {
            errors.profesionEgresado = "Campo Obligatorio";
          }
          break;
        default:
          break;
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validaciones(props.datos);
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
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreProducto"
            name="nombreProducto"
            value={props.datos.nombreProducto || ""}
            onChange={(e) => props.handleChange(e)}
          />
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
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="evidenciaProducto" className="form-label">
            ¿Cual es la evidencia de su producto/servicio?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="evidenciaProducto"
            name="evidenciaProducto"
            value={props.datos.evidenciaProducto || ""}
            onChange={(e) => props.handleChange(e)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="obtencionMateriasPrimas" className="form-label">
            ¿Donde consigue la materia prima?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="obtencionMateriasPrimas"
            name="obtencionMateriasPrimas"
            value={props.datos.obtencionMateriasPrimas || ""}
            onChange={(e) => props.handleChange(e)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="equipoTrabajo" className="form-label">
            ¿Tiene equipo de trabajo?
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
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
        </div>

        {props.datos.equipoTrabajo == "SI" ? (
          <div className="col-md-6 mb-3">
            <Label htmlFor="cualEquipoTrabajo" className="form-label">
              ¿Cual es su equipo de trabajo?
            </Label>
            <Input
              type="text"
              className="form-control"
              id="cualEquipoTrabajo"
              name="cualEquipoTrabajo"
              value={props.datos.cualEquipoTrabajo || ""}
              onChange={(e) => props.handleChange(e)}
            />
          </div>
        ) : (
          <div className="col-md-6 mb-3"></div>
        )}

        <div className="col-md-6">
          <Label htmlFor="dedicacion" className="form-label">
            ¿A qué se dedica?
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
            ¿Desde cuando lleva ejecutando la idea?
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
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="horasSemanales" className="form-label">
            Número de horas dedicas a la semana
          </Label>
          <Input
            type="text"
            className="form-control"
            id="horasSemanales"
            name="horasSemanales"
            value={props.datos.horasSemanales || ""}
            onChange={(e) => props.handleChange(e)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="motivacion" className="form-label">
            ¿Cuál es su motivación?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="motivacion"
            name="motivacion"
            value={props.datos.motivacion || ""}
            onChange={(e) => props.handleChange(e)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="descubrioSinapsis" className="form-label">
            ¿Cómo se enteró de los servicios de SINAPSIS UAO?
          </Label>
          <SelectMultiple
            className="form-select"
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
                    ¿Cuál fue el Otro Medio?
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="cualOtroDescubrioSinapsis"
                    name="cualOtroDescubrioSinapsis"
                    value={props.datos.cualOtroDescubrioSinapsis || ""}
                    onChange={(e) => props.handleChange(e)}
                  />
                </div>
              );
            }
          })}
        <div className="col-12 d-flex flex-row-reverse">
          <BotonSiguiente
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              props.nextStep();
            }}
          >
            Siguiente
          </BotonSiguiente>
          <Boton
            type="button"
            className="btn btn-outline-primary"
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
