import { useState } from "react";
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
import { getCurrentDateForBirth } from "src/utils/functions";

function InfoPrimeraAtencion(props) {
  const [error, setError] = useState({});
  const [estudiante, setEstudiante] = useState(false);
  const [colaborador, setColaborador] = useState(false);
  const [egresado, setEgresado] = useState(false);
  const [emprendedor, setEmprendedor] = useState(false);

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

  const changeForm = (event) => {
    const valor = event.target.value;
    props.handleChange(event);
    if (valor == "Estudiante") {
      setEstudiante(true);
      setEgresado(false);
      setColaborador(false);
    } else {
      if (valor == "Egresado") {
        setEstudiante(false);
        setEgresado(true);
        setColaborador(false);
      } else {
        setEstudiante(false);
        setColaborador(true);
        setEgresado(false);
      }
    }
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
    <Contenido className="container">
      <div className="text-center">
        <Circulo>
          <Paso>3</Paso>
        </Circulo>
        <TituloStepByStep>Información de Primera atención</TituloStepByStep>
      </div>

      <form className="row g-3">
        <div className="col-md-6 mb-3">
          <Label htmlFor="descripcionProducto" className="form-label">
            Producto o Servicio
          </Label>
          <Input
            type="text"
            className="form-control"
            id="descripcionProducto"
            value={
              props.datos.descripcionProducto ||
              emprendedor.descripcionProducto != null
                ? emprendedor.descripcionProducto
                : ""
            }
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
            value={
              props.datos.promedioVentas || emprendedor.promedioVentas != null
                ? emprendedor.promedioVentas
                : ""
            }
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
            value={
              props.datos.evidenciaProducto ||
              emprendedor.evidenciaProducto != null
                ? emprendedor.evidenciaProducto
                : ""
            }
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
            value={
              props.datos.evidenciaProducto ||
              emprendedor.evidenciaProducto != null
                ? emprendedor.evidenciaProducto
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="necesidadEmprendimiento" className="form-label">
            Necesidades del emprendimiento
          </Label>
          <Input
            type="text"
            className="form-control"
            id="necesidadEmprendimiento"
            value={
              props.datos.necesidadEmprendimiento ||
              emprendedor.necesidadEmprendimiento != null
                ? emprendedor.necesidadEmprendimiento
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="obtieneMateriasPrimas" className="form-label">
            ¿Donde consigue la materia prima?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="obtieneMateriasPrimas"
            value={
              props.datos.obtieneMateriasPrimas ||
              emprendedor.obtieneMateriasPrimas != null
                ? emprendedor.obtieneMateriasPrimas
                : ""
            }
          />
        </div>

        <div className="col-md-6">
          <Label htmlFor="dedicacion" className="form-label">
            ¿A qué se dedica?
            {/* <span> (*)</span> */}
          </Label>
          <Input
            type="text"
            className="form-control"
            name="dedicacion"
            id="dedicacion"
            value={props.datos.dedicacion || emprendedor.dedicacion}
            onChange={(e) => props.handleChange(e)}
          />
          {error.dedicacion && (
            <small className="form-text font-weight-bold text-danger">
              {error.dedicacion}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="equipoTrabajo" className="form-label">
            ¿Tiene equipo de trabajo?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="equipoTrabajo"
            value={
              props.datos.equipoTrabajo || emprendedor.equipoTrabajo != null
                ? emprendedor.equipoTrabajo
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="tiempoEmprendimiento" className="form-label">
            ¿Cuantos meses lleva ejecutando la idea?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="tiempoEmprendimiento"
            value={
              props.datos.tiempoEmprendimiento ||
              emprendedor.tiempoEmprendimiento != null
                ? emprendedor.tiempoEmprendimiento
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="horasDedicadas" className="form-label">
            Número de horas dedicas a la semana
          </Label>
          <Input
            type="text"
            className="form-control"
            id="horasDedicadas"
            value={
              props.datos.horasDedicadas || emprendedor.horasDedicadas != null
                ? emprendedor.horasDedicadas
                : ""
            }
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
            value={
              props.datos.motivacion || emprendedor.motivacion != null
                ? emprendedor.motivacion
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="clientes" className="form-label">
            ¿Cuales son los clientes?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="clientes"
            value={
              props.datos.clientes || emprendedor.clientes != null
                ? emprendedor.clientes
                : ""
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="medioServiciosSinapsis" className="form-label">
            ¿Cómo se enteró de los servicios de SINAPSIS UAO?
          </Label>
          <Input
            type="text"
            className="form-control"
            id="medioServiciosSinapsis"
            value={
              props.datos.medioServiciosSinapsis ||
              emprendedor.medioServiciosSinapsis != null
                ? emprendedor.medioServiciosSinapsis
                : ""
            }
          />
        </div>
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
