import { useEffect, useState } from "react";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import {
  BotonSiguiente,
  Circulo,
  Contenido,
  Input,
  Label,
  Paso,
  TituloStepByStep,
} from "src/assets/styles/emprendedor/primeraAtencion.style";

import DropZone from "src/components/DropZone";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";
import {
  getCurrentDateForBirth,
  getDepartamentos,
  getFromLocalStorage,
  getInformacionEmprendedor,
  getMunicipios,
  obtenerAcronimoTipoDocumento,
} from "src/utils/functions";
import { validacionesPrimeraAtencionUsuario } from "src/utils/validaciones";

function InfoUsuario(props) {
  const [predata, setPredata] = useState({});
  const [error, setError] = useState({});
  const [estudiante, setEstudiante] = useState({ show: false });
  const [colaborador, setColaborador] = useState({ show: false });
  const [egresado, setEgresado] = useState({ show: false });
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [emprendedor, setEmprendedor] = useState({});

  useEffect(() => {
    getDepartamentos()
      .then((data) => {
        setDepartamentos(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    getInformacionEmprendedor(userData.id)
      .then((data) => {
        getAcronimoTipoDocumento(data.tipoDocumento);
        props.setDatos({ ...props.datos, ...data });
        setEmprendedor(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getMunicipios(props.datos.departamento)
      .then((data) => {
        setMunicipios(data);
      })
      .catch((error) => console.log(error));
  }, [props.datos.departamento]);

  const onHandleChange = (event) => {
    const valor = event.target.value;
    props.handleChange(event);

    if (
      valor === "PREGRADO" ||
      valor === "POSTGRADO" ||
      valor === "TECNICO LABORAL" ||
      valor === "EDUCACION CONTINUA"
    ) {
      setEstudiante({ ...estudiante, tipoEstudiante: valor });
      return;
    }

    if (valor === "Estudiante") {
      setEstudiante({ ...estudiante, show: true });
      setEgresado({ ...egresado, show: false });
      setColaborador({ ...colaborador, show: false });
    } else {
      if (valor === "Egresado") {
        setEgresado({ ...egresado, show: true });
        setEstudiante({ ...estudiante, show: false });
        setColaborador({ ...colaborador, show: false });
      } else if (valor === "Colaborador") {
        setEstudiante({ ...estudiante, show: false });
        setColaborador({ ...colaborador, show: true });
        setEgresado({ ...egresado, show: false });
      } else {
        setEstudiante({ ...estudiante, show: false });
        setColaborador({ ...colaborador, show: false });
        setEgresado({ ...egresado, show: false });
      }
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionUsuario(props.datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  const onGetFiles = (files) => {
    props.getFotoPerfilFile(files);
  };

  const getAcronimoTipoDocumento = (tipoDocumento) => {
    obtenerAcronimoTipoDocumento(tipoDocumento)
      .then((dataResponse) => {
        setPredata({ ...predata, tipoDocumento: dataResponse[0].nombre });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Contenido className="container">
      <div className="text-center">
        <Circulo>
          <Paso>1</Paso>
        </Circulo>
        <TituloStepByStep>Información básica del Usuario</TituloStepByStep>
      </div>

      <form className="row g-3">
        <div className="col-md-6">
          <Label htmlFor="nombreCompleto" className="form-label">
            Nombre Completo
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreCompleto"
            value={`${props.datos.nombres || emprendedor.nombres} ${
              props.datos.apellidos || emprendedor.apellidos
            }`}
            disabled
          />
        </div>

        <div className="col-md-6">
          <Label htmlFor="docIdentificacion" className="form-label">
            Documento de Identificación
          </Label>
          <Input
            type="text"
            className="form-control"
            id="docIdentificacion"
            value={`${predata.tipoDocumento} - ${
              props.datos.numeroDocumento || emprendedor.numeroDocumento
            }`}
            disabled
          />
        </div>

        <div className="col-md-6">
          <Label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento
            <span> (*)</span>
          </Label>
          <Input
            type="date"
            className="form-control"
            name="fechaNacimiento"
            id="fechaNacimiento"
            max={getCurrentDateForBirth()}
            value={
              props.datos.fechaNacimiento || emprendedor.fechaNacimiento != null
                ? emprendedor.fechaNacimiento
                : ""
            }
            onChange={(e) => props.handleChange(e)}
          />
          {error.fechaNacimiento && (
            <small className="form-text font-weight-bold text-danger">
              {error.fechaNacimiento}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="genero" className="form-label">
            Género
            <span> (*)</span>
          </Label>
          <select
            id="genero"
            className="form-select"
            name="genero"
            value={
              props.datos.genero || emprendedor.genero != null
                ? emprendedor.genero
                : "-1"
            }
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Selecciona un género
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          {error.genero && (
            <small className="form-text font-weight-bold text-danger">
              {error.genero}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="telefono" className="form-label">
            Número Teléfono
          </Label>
          <Input
            type="text"
            className="form-control"
            name="telefono"
            id="telefono"
            value={
              props.datos.telefono || emprendedor.telefono != null
                ? emprendedor.telefono
                : ""
            }
            onChange={(e) => props.handleChange(e)}
          />
          {error.telefono && (
            <small className="form-text font-weight-bold text-danger">
              {error.telefono}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="celular" className="form-label">
            Número Celular
          </Label>
          <Input
            type="text"
            className="form-control inputDiag"
            name="celular"
            id="celular"
            value={
              props.datos.celular || emprendedor.celular != null
                ? emprendedor.celular
                : ""
            }
            onChange={(e) => props.handleChange(e)}
          />
          {error.celular && (
            <small className="form-text font-weight-bold text-danger">
              {error.celular}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="departamento" className="form-label">
            Departamento de Residencia
            <span> (*)</span>
          </Label>
          <select
            id="departamento"
            className="form-select"
            name="departamento"
            value={props.datos.departamento || "-1"}
            disabled={emprendedor.municipio != null}
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Selecciona un departamento...
            </option>
            {departamentos.map((departamento, index) => {
              return (
                <option key={index} value={departamento.id}>
                  {departamento.nombre}
                </option>
              );
            })}
          </select>
          {error.departamento && (
            <small className="form-text font-weight-bold text-danger">
              {error.departamento}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="municipio" className="form-label">
            Municipio de Residencia
            <span> (*)</span>
          </Label>
          <select
            id="municipio"
            className="form-select"
            name="municipio"
            value={
              props.datos.municipio || emprendedor.municipio != null
                ? emprendedor.municipio
                : "-1"
            }
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Selecciona un municipio...
            </option>

            {props.datos.departamento &&
              municipios.length > 0 &&
              municipios.map((municipio, index) => {
                return (
                  <option key={index} value={municipio.id}>
                    {municipio.nombre}
                  </option>
                );
              })}
          </select>
          {error.municipio && (
            <small className="form-text font-weight-bold text-danger">
              {error.municipio}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="direccion" className="form-label">
            Direccion de Residencia
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            name="direccion"
            id="direccion"
            value={props.datos.direccion || emprendedor.direccion}
            onChange={(e) => props.handleChange(e)}
          />
          {error.direccion && (
            <small className="form-text font-weight-bold text-danger">
              {error.direccion}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="vinculoConU" className="form-label">
            Vinculo con la Universidad
            <span> (*)</span>
          </Label>
          <select
            id="vinculoConU"
            name="vinculoConU"
            className="form-select"
            value={
              props.datos.vinculoConU || emprendedor.vinculoConU != null
                ? emprendedor.vinculoConU
                : "-1"
            }
            onChange={(e) => {
              onHandleChange(e);
            }}
          >
            <option value={"-1"} disabled>
              Selecciona el vinculo con la universidad
            </option>
            <option value="Estudiante">Estudiante</option>
            <option value="Egresado">Egresado</option>
            <option value="Colaborador">Colaborador</option>
            <option value="Externo">Externo</option>
          </select>
          {error.vinculoConU && (
            <small className="form-text font-weight-bold text-danger">
              {error.vinculoConU}
            </small>
          )}
        </div>
        {estudiante.show || props.datos?.vinculoConU === "Estudiante" ? (
          <>
            <div className="col-md-6">
              <label
                htmlFor="codigoEstudiantil"
                className="form-label nombreInput"
              >
                Código Estudiantil
                <span> (*)</span>
              </label>
              <input
                type="text"
                className="form-control inputDiag"
                name="codigoEstudiantil"
                id="codigoEstudiantil"
                value={props.datos.codigoEstudiantil || null}
                onChange={(e) => props.handleChange(e)}
              />
              {error.codigoEstudiantil && (
                <small className="form-text font-weight-bold text-danger">
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
                value={props.datos.tipoEstudiante || "-1"}
                onChange={(e) => onHandleChange(e)}
              >
                <option value={"-1"} disabled>
                  Selecciona el tipo de estudiante
                </option>
                <option value="PREGRADO">Pregrado</option>
                <option value="POSTGRADO">Postgrado</option>
                <option value="TECNICO LABORAL">Técnico laboral</option>
                <option value="EDUCACION CONTINUA">Educación continua</option>
              </select>
              {error.tipoEstudiante && (
                <small className="form-text font-weight-bold text-danger">
                  {error.tipoEstudiante}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label
                htmlFor="programaAcademico"
                className="form-label nombreInput"
              >
                Programa Académico
                <span> (*)</span>
              </label>
              <select
                id="programaAcademico"
                className="form-select"
                name="programaAcademico"
                value={props.datos.programaAcademico || "-1"}
                onChange={(e) => props.handleChange(e)}
                defaultValue={"-1"}
              >
                <option value={"-1"} disabled>
                  Selecciona tu programa
                </option>

                {props.datos?.tipoEstudiante === "PREGRADO" ? (
                  programasPrueba.pregrado.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudiante === "POSTGRADO" ? (
                  programasPrueba.postgrado.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudiante === "TECNICO LABORAL" ? (
                  programasPrueba.tecnico.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudiante === "EDUCACION CONTINUA" ? (
                  programasPrueba.educacion.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
              {error.programaAcademico && (
                <small className="form-text font-weight-bold text-danger">
                  {error.programaAcademico}
                </small>
              )}
            </div>

            {estudiante?.tipoEstudiante === "PREGRADO" ? (
              <>
                <div className="col-md-6">
                  <label className="form-label nombreInput">
                    Modalidad de Emprendimiento como Trabajo de Grado
                    <span> (*)</span>
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modTrabajoGrado"
                      id="modTrabajoGradoTrue"
                      onChange={(e) => props.handleChange(e)}
                      value={1}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="modTrabajoGradoTrue"
                    >
                      SI
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modTrabajoGrado"
                      id="modTrabajoGradoFalse"
                      onChange={(e) => props.handleChange(e)}
                      value={0}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="modTrabajoGradoFalse"
                    >
                      NO
                    </label>
                  </div>
                  {error.modTrabajoGrado && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.modTrabajoGrado}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="cursosEmprendimiento"
                    className="form-label nombreInput"
                  >
                    Asignaturas de Emprendimiento Cursadas
                    <span> (*)</span>
                  </label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cursosEmprendimiento1"
                        name="cursosEmprendimiento"
                        defaultValue="1"
                        onChange={(e) => props.handleChange(e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cursosEmprendimiento1"
                      >
                        EMPRENDIMIENTO
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cursosEmprendimiento2"
                        name="cursosEmprendimiento"
                        defaultValue="2"
                        onChange={(e) => props.handleChange(e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cursosEmprendimiento2"
                      >
                        EMPRENDIMIENTO E INICIATIVA EMPRESARIAL
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cursosEmprendimiento3"
                        name="cursosEmprendimiento"
                        defaultValue="3"
                        onChange={(e) => props.handleChange(e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cursosEmprendimiento3"
                      >
                        PLAN DE EMPRESA
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cursosEmprendimiento4"
                        name="cursosEmprendimiento"
                        defaultValue="4"
                        onChange={(e) => props.handleChange(e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cursosEmprendimiento4"
                      >
                        IDEAS Y OPORTUNIDAD DE NEGOCIO
                      </label>
                    </div>
                  </div>

                  {error.cursosEmprendimiento && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.cursosEmprendimiento}
                    </small>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : colaborador.show || props.datos?.vinculoConU === "Colaborador" ? (
          <>
            <div className="col-md-6">
              <Label htmlFor="cargoColaborador" className="form-label">
                Cargo de Colaborador
                <span> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                name="cargoColaborador"
                id="cargoColaborador"
                value={props.datos.cargoColaborador || null}
                onChange={(e) => props.handleChange(e)}
              />
              {error.cargoColaborador && (
                <small className="form-text font-weight-bold text-danger">
                  {error.cargoColaborador}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <Label htmlFor="dependenciaColaborador" className="form-label">
                Dependencia
                <span> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                name="dependenciaColaborador"
                id="dependenciaColaborador"
                value={props.datos.dependenciaColaborador || null}
                onChange={(e) => props.handleChange(e)}
              />
              {error.dependenciaColaborador && (
                <small className="form-text font-weight-bold text-danger">
                  {error.dependenciaColaborador}
                </small>
              )}
            </div>
          </>
        ) : egresado.show || props.datos?.vinculoConU === "Egresado" ? (
          <>
            <div className="col-md-6">
              <Label htmlFor="tipoEstudianteEgresado" className="form-label">
                Tipo de estudiante
                <span> (*)</span>
              </Label>
              <select
                id="tipoEstudianteEgresado"
                className="form-select"
                name="tipoEstudianteEgresado"
                value={props.datos.tipoEstudianteEgresado || "-1"}
                onChange={(e) => onHandleChange(e)}
              >
                <option value={"-1"} disabled>
                  Selecciona el tipo de estudiante
                </option>
                <option value="PREGRADO">Pregrado</option>
                <option value="POSTGRADO">Postgrado</option>
                <option value="TECNICO LABORAL">Técnico laboral</option>
                <option value="EDUCACION CONTINUA">Educación continua</option>
              </select>
              {error.tipoEstudianteEgresado && (
                <small className="form-text font-weight-bold text-danger">
                  {error.tipoEstudianteEgresado}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <Label htmlFor="profesionEgresado" className="form-label">
                Profesión
                <span> (*)</span>
              </Label>
              <select
                id="profesionEgresado"
                className="form-select"
                name="profesionEgresado"
                value={props.datos.profesionEgresado || "-1"}
                onChange={(e) => props.handleChange(e)}
              >
                <option value={"-1"} disabled>
                  Selecciona tu programa
                </option>

                {props.datos?.tipoEstudianteEgresado === "PREGRADO" ? (
                  programasPrueba.pregrado.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudianteEgresado === "POSTGRADO" ? (
                  programasPrueba.postgrado.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudianteEgresado ===
                  "TECNICO LABORAL" ? (
                  programasPrueba.tecnico.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : props.datos?.tipoEstudianteEgresado ===
                  "EDUCACION CONTINUA" ? (
                  programasPrueba.educacion.map((programa, index) => {
                    return (
                      <option key={index} value={programa.value}>
                        {programa.text}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
              {error.profesionEgresado && (
                <small className="form-text font-weight-bold text-danger">
                  {error.profesionEgresado}
                </small>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="col-md-12">
          <Label htmlFor="fotoPerfil" className="form-label nombreInput">
            Foto de Perfil
          </Label>
          <DropZone upFiles={onGetFiles} files={props?.files} />
          {props.datos.files && (
            <aside style={thumbsContainer}>
              <div style={thumb} key={props.datos?.files[0].name}>
                <div style={thumbInner}>
                  <img
                    src={URL.createObjectURL(props.datos?.files[0])}
                    style={img}
                    alt={props.datos?.files[0].name}
                  />
                </div>
              </div>
            </aside>
          )}
          {error.fotoPerfil && (
            <small className="form-text font-weight-bold text-danger">
              {error.fotoPerfil}
            </small>
          )}
        </div>

        <div className="col-12 d-flex flex-row-reverse">
          <BotonSiguiente
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              onHandleSubmit(e);
            }}
          >
            Siguiente
          </BotonSiguiente>
        </div>
      </form>
    </Contenido>
  );
}

const programasPrueba = {
  pregrado: [
    { value: 1, text: "Ingenieria Informatica" },
    { value: 2, text: "Ingenieria Multimedia" },
    { value: 3, text: "Ingenieria Biomedica" },
    { value: 4, text: "Ingenieria Electronica" },
  ],
  postgrado: [
    { value: 5, text: "Especializacion en Finanzas" },
    { value: 6, text: "Especializacion en Mercadeo" },
    { value: 7, text: "Maestria en Sistemas Energeticos" },
    { value: 8, text: "Doctorado en Ingenieria" },
  ],
  tecnico: [
    { value: 9, text: "Tecnico Laboral en Comerciante" },
    { value: 10, text: "Tecnico Laboral en Ventas y Publicidad" },
  ],
  educacion: [
    { value: 11, text: "Curso Frances" },
    { value: 12, text: "Curso Aleman" },
    { value: 13, text: "Seminario Basico de MathLab" },
    { value: 14, text: "Seminario Trading" },
  ],
};

const municipiosPrueba = {
  1: [
    { value: 126, text: "Leticia" },
    { value: 127, text: "Puerto Nariño" },
  ],
  2: [
    { value: 1, text: "Abejorral" },
    { value: 71, text: "Medellin" },
  ],
  3: [
    { value: 128, text: "Arauca" },
    { value: 132, text: "Saravena" },
  ],
};

export default InfoUsuario;
