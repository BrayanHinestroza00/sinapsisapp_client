import { useState } from "react";
import { getCurrentDateForBirth } from "src/utils/functions";

function InfoEmprendedor(props) {
  const [error, setError] = useState({});
  const [estudiante, setEstudiante] = useState(false);
  const [colaborador, setColaborador] = useState(false);
  const [egresado, setEgresado] = useState(false);

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
    <div className="container contenido">
      <div className="text-center">
        <div className="circulo">
          <span>2</span>
        </div>
        <div className="tituloStepByStep">Información de Emprendedor</div>
      </div>

      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombreCompleto" className="form-label nombreInput">
            Nombre Completo
            <span> (*)</span>
          </label>
          <input
            type="text"
            className="form-control inputDiag"
            id="nombreCompleto"
            value="Juan Gonzales"
            disabled
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="Cedula" className="form-label nombreInput">
            Cedula
            <span> (*)</span>
          </label>
          <input
            type="text"
            className="form-control inputDiag"
            id="Cedula"
            value="1270001"
            disabled
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="fechaNacimiento" className="form-label nombreInput">
            Fecha de Nacimiento
            <span> (*)</span>
          </label>
          <input
            type="date"
            className="form-control inputDiag"
            name="fechaNacimiento"
            id="fechaNacimiento"
            max={getCurrentDateForBirth()}
            onChange={(e) => props.handleChange(e)}
            value={props.datos.fechaNacimiento}
          />
          {error.fechaNacimiento && (
            <small class="form-text font-weight-bold text-danger">
              {error.fechaNacimiento}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="ciudad" className="form-label nombreInput">
            Ciudad de Residencia
            <span> (*)</span>
          </label>
          <input
            type="text"
            className="form-control inputDiag"
            name="ciudad"
            id="ciudad"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.ciudad}
          />
          {error.ciudad && (
            <small class="form-text font-weight-bold text-danger">
              {error.ciudad}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="celular" className="form-label nombreInput">
            Celular
            <span> (*)</span>
          </label>
          <input
            type="text"
            className="form-control inputDiag"
            name="celular"
            id="celular"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.celular}
          />
          {error.celular && (
            <small class="form-text font-weight-bold text-danger">
              {error.celular}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label nombreInput">
            Direccion
            <span> (*)</span>
          </label>
          <input
            type="text"
            className="form-control inputDiag"
            name="direccion"
            id="direccion"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.direccion}
          />
          {error.direccion && (
            <small class="form-text font-weight-bold text-danger">
              {error.direccion}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="genero" className="form-label nombreInput">
            Género
            <span> (*)</span>
          </label>
          <select
            id="genero"
            className="form-select"
            name="genero"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.genero}
          >
            <option disabled selected>
              Selecciona un género
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenimo</option>
            <option value="Otro">Otro</option>
          </select>
          {error.genero && (
            <small class="form-text font-weight-bold text-danger">
              {error.genero}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="vinculoConU" className="form-label nombreInput">
            Vinculo con la Universidad
            <span> (*)</span>
          </label>
          <select
            id="vinculoConU"
            name="vinculoConU"
            className="form-select"
            onChange={(e) => {
              changeForm(e);
            }}
            value={props.datos.vinculoConU}
          >
            <option disabled selected>
              Selecciona el vinculo con la universidad
            </option>
            <option value="Estudiante">Estudiante</option>
            <option value="Egresado">Egresado</option>
            <option value="Colaborador">Colaborador</option>
          </select>
          {error.vinculoConU && (
            <small class="form-text font-weight-bold text-danger">
              {error.vinculoConU}
            </small>
          )}
        </div>
        {estudiante ? (
          <>
            <div className="col-md-6">
              <label
                htmlFor="codigoEstudiantil"
                className="form-label nombreInput"
              >
                Codigo Estudiantil
                <span> (*)</span>
              </label>
              <input
                type="text"
                className="form-control inputDiag"
                name="codigoEstudiantil"
                id="codigoEstudiantil"
                onChange={(e) => props.handleChange(e)}
                value={props.datos.codigoEstudiantil}
              />
              {error.codigoEstudiantil && (
                <small class="form-text font-weight-bold text-danger">
                  {error.codigoEstudiantil}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label
                htmlFor="tipoEstudiante"
                className="form-label nombreInput"
              >
                Tipo de estudiante
                <span> (*)</span>
              </label>
              <select
                id="tipoEstudiante"
                className="form-select"
                name="tipoEstudiante"
                onChange={(e) => props.handleChange(e)}
              >
                <option disabled selected>
                  Selecciona el tipo de estudiante
                </option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Pregrado">Pregrado</option>
                <option value="Posgrado">Posgrado</option>
              </select>
              {error.tipoEstudiante && (
                <small class="form-text font-weight-bold text-danger">
                  {error.tipoEstudiante}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label
                htmlFor="programaAcademico"
                className="form-label nombreInput"
              >
                Programa Academico
                <span> (*)</span>
              </label>
              <select
                id="programaAcademico"
                className="form-select"
                name="programaAcademico"
                onChange={(e) => props.handleChange(e)}
              >
                <option disabled selected>
                  Selecciona tu programa
                </option>
                <option value="Ingeniera Ambiental">
                  Ingenieria Ambiental
                </option>
                <option value="Ingenieria Multimedia">
                  Ingenieria Multimedia
                </option>
                <option value="Ingenieria Informatica">
                  Ingenieria Informatica
                </option>
                <option value="Ingenieria Electronica">
                  Ingenieria Electronica
                </option>
              </select>
              {error.programaAcademico && (
                <small class="form-text font-weight-bold text-danger">
                  {error.programaAcademico}
                </small>
              )}
            </div>
          </>
        ) : colaborador ? (
          <div>colaborador</div>
        ) : egresado ? (
          <>
            <div className="col-md-6">
              <label
                htmlFor="profesionEgresado"
                className="form-label nombreInput"
              >
                Profesion
                <span> (*)</span>
              </label>
              <select
                id="profesionEgresado"
                className="form-select"
                name="profesionEgresado"
                onChange={(e) => props.handleChange(e)}
              >
                <option disabled selected>
                  Selecciona tu programa
                </option>
                <option value="Ingeniera Ambiental">
                  Ingenieria Ambiental
                </option>
                <option value="Ingenieria Multimedia">
                  Ingenieria Multimedia
                </option>
                <option value="Ingenieria Informatica">
                  Ingenieria Informatica
                </option>
                <option value="Ingenieria Electronica">
                  Ingenieria Electronica
                </option>
              </select>
              {error.profesionEgresado && (
                <small class="form-text font-weight-bold text-danger">
                  {error.profesionEgresado}
                </small>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="col-12 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-primary buttonDiag btnNext"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Siguente
          </button>
        </div>
      </form>
    </div>
  );
}

export default InfoEmprendedor;
