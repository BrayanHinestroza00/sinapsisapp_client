import moment from "moment";
import { useEffect, useState } from "react";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import {
  BotonSiguiente,
  Circulo,
  Contenido,
  Input,
  Label,
  Paso,
  TituloStepByStep,
} from "./styled";

import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ASIGNATURAS,
  URL_OBTENER_INFO_EMPRENDEDOR,
  URL_OBTENER_PROGRAMAS_ACADEMICOS,
} from "src/app/Shared/utils/apiConstants";
import {
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_FORMATO_FECHA_INPUT,
  T_SINAPSIS_MOD_TRABAJO_GRADO_NO,
  T_SINAPSIS_MOD_TRABAJO_GRADO_SI,
  T_SINAPSIS_NIVEL_ACADEMICO_EDUCACION_CONTINUA,
  T_SINAPSIS_NIVEL_ACADEMICO_POSTGRADO,
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_NIVEL_ACADEMICO_TECNICO,
  T_SINAPSIS_PROGRAMAS_OTRO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
} from "src/app/Shared/utils/constants";
import {
  getCurrentDateForBirth,
  getDepartamentos,
  getMunicipios,
} from "src/app/Shared/utils/utilityFunctions";
import { validacionesPrimeraAtencionUsuario } from "src/app/Shared/services/validation/validatePrimeraAtencion";

function InfoUsuario({ userData, ...props }) {
  const [error, setError] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  // Custom Hooks
  const {
    data: preloadData,
    error: errorFetch,
    loading: loadingFetch,
    fetchAPI: fetchApiInfoEmprendedor,
  } = useFetch();

  const { data: dataProgramasAcademicos, fetchAPI: fetchApiPrograma } =
    useFetch();

  const { data: dataAsignaturas, fetchAPI: fetchApiAsignaturas } = useFetch();

  useEffect(() => {
    fetchApiInfoEmprendedor({
      URL: URL_OBTENER_INFO_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idUsuario: userData.id,
        },
      },
    });
    fetchApiPrograma({
      URL: URL_OBTENER_PROGRAMAS_ACADEMICOS,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
    fetchApiAsignaturas({
      URL: URL_OBTENER_ASIGNATURAS,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    if (preloadData) {
      let asignaturasEmprendedor = [];
      if (
        preloadData.asignaturasEmprendedor &&
        preloadData.asignaturasEmprendedor.length > 0
      ) {
        preloadData.asignaturasEmprendedor.forEach((asignaturaEmprendedor) => {
          asignaturasEmprendedor.push(
            `${asignaturaEmprendedor.id.asignaturaId}`
          );
        });
      }

      props.setDatos({
        idEmprendedor: preloadData.id,
        nombres: preloadData.nombres,
        apellidos: preloadData.apellidos,
        tipoDocumento: preloadData.acronimoTipoDocumento,
        numeroDocumento: preloadData.numeroDocumento,
        fechaNacimiento: preloadData.fechaNacimiento
          ? moment(
              preloadData.fechaNacimiento,
              SINAPSIS_APP_FORMATO_FECHA
            ).format(SINAPSIS_APP_FORMATO_FECHA_INPUT)
          : null,
        genero: preloadData.genero,
        correoPersonal: preloadData.correoPersonal,
        celular: preloadData.telefonoContacto,
        departamento: preloadData.departamentosId,
        municipioId: preloadData.municipioId,
        direccion: preloadData.direccion,
        vinculoConU: preloadData.tipoContactoId,
        codigoEstudiantil: preloadData.codigoEstudiantil,
        tipoEstudiante: preloadData.nivelAcademico,
        programaAcademico: preloadData.programaAcademicoId,
        modTrabajoGrado: preloadData.modalidadTrabajoGrado,
        cargoColaborador: preloadData.cargo,
        dependenciaColaborador: preloadData.dependencia,
        tipoEstudianteEgresado: preloadData.nivelAcademico,
        profesionEgresado: preloadData.programaAcademicoId,
        cursosEmprendimiento: asignaturasEmprendedor,
        fotoUrl: preloadData.fotoUrl,
      });
    }
  }, [preloadData]);

  useEffect(() => {
    if (preloadData && preloadData.departamentoId == null) {
      getDepartamentos()
        .then((data) => {
          setDepartamentos(data);
        })
        .catch((error) => console.error(error));
    }
  }, [preloadData]);

  useEffect(() => {
    if (preloadData && props.datos.departamento != null) {
      const idDepartamento = props.datos.departamento;
      getMunicipios(idDepartamento)
        .then((data) => {
          setMunicipios(data);
        })
        .catch((error) => console.error(error));
    }
  }, [props.datos.departamento, preloadData]);

  const onHandleChange = (event) => {
    props.handleChange(event);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionUsuario(
      props.datos,
      error
    );
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  const onGetFiles = (files) => {
    delete error.fotoPerfil;
    props.getFotoPerfilFile(files);
  };

  const getFilesRejected = (mensajeError) => {
    setError({ ...error, fotoPerfil: mensajeError });
  };

  if (loadingFetch || !preloadData) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (errorFetch) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{errorFetch}</p>
      </>
    );
  }

  return (
    <Contenido
      className="container"
      style={{ backgroundColor: "#FFF", padding: "1rem 10rem" }}
    >
      <div className="text-center">
        <Circulo>
          <Paso>1</Paso>
        </Circulo>
        <TituloStepByStep>Información básica del Usuario</TituloStepByStep>
      </div>

      <form className="row g-3">
        <div className="col-md-6">
          <Label htmlFor="nombreCompleto" className="form-label">
            Nombre completo
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreCompleto"
            value={`${props.datos.nombres} ${props.datos.apellidos}`}
            disabled
          />
        </div>

        <div className="col-md-6">
          <Label htmlFor="docIdentificacion" className="form-label">
            Documento de identificación
          </Label>
          <Input
            type="text"
            className="form-control"
            id="docIdentificacion"
            value={`${props.datos.tipoDocumento} - ${props.datos.numeroDocumento}`}
            disabled
          />
        </div>

        <div className="col-md-6">
          <Label htmlFor="fechaNacimiento" className="form-label">
            Fecha de nacimiento
            <span className="text-danger"> (*)</span>
          </Label>
          <Input
            type="date"
            className="form-control"
            name="fechaNacimiento"
            id="fechaNacimiento"
            max={getCurrentDateForBirth()}
            value={
              props.datos.fechaNacimiento ? props.datos.fechaNacimiento : ""
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
            <span className="text-danger"> (*)</span>
          </Label>
          <select
            id="genero"
            className="form-select"
            name="genero"
            value={props.datos.genero ? props.datos.genero : "-1"}
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Selecciona un género
            </option>
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
            <option value="OTRO">OTRO</option>
          </select>
          {error.genero && (
            <small className="form-text font-weight-bold text-danger">
              {error.genero}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="correoPersonal" className="form-label">
            Correo personal
            <span className="text-danger"> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            name="correoPersonal"
            id="correoPersonal"
            value={props.datos.correoPersonal ? props.datos.correoPersonal : ""}
            onChange={(e) => props.handleChange(e)}
          />
          {error.correoPersonal && (
            <small className="form-text font-weight-bold text-danger">
              {error.correoPersonal}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="celular" className="form-label">
            Teléfono de contacto
          </Label>
          <Input
            type="text"
            className="form-control inputDiag"
            name="celular"
            id="celular"
            value={props.datos.celular ? props.datos.celular : ""}
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
            Departamento de residencia
            <span className="text-danger"> (*)</span>
          </Label>
          <select
            id="departamento"
            className="form-select"
            name="departamento"
            value={props.datos.departamento || "-1"}
            disabled={props.datos.municipio != null}
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
          <Label htmlFor="municipioId" className="form-label">
            Municipio de residencia
            <span className="text-danger"> (*)</span>
          </Label>
          <select
            id="municipioId"
            className="form-select"
            name="municipioId"
            value={props.datos.municipioId ? props.datos.municipioId : 0}
            onChange={(e) => props.handleChange(e)}
          >
            <option value={0} disabled>
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
          {error.municipioId && (
            <small className="form-text font-weight-bold text-danger">
              {error.municipioId}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="direccion" className="form-label">
            Dirección de residencia
            <span className="text-danger"> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            name="direccion"
            id="direccion"
            value={props.datos.direccion ? props.datos.direccion : ""}
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
            Vinculo con la universidad
            <span className="text-danger"> (*)</span>
          </Label>
          <select
            id="vinculoConU"
            name="vinculoConU"
            className="form-select"
            value={props.datos.vinculoConU ? props.datos.vinculoConU : "-1"}
            disabled={
              props.datos.vinculoConU && props.datos.vinculoConU == "4"
                ? true
                : false
            }
            onChange={(e) => {
              onHandleChange(e);
            }}
          >
            <option value={"-1"} disabled>
              Selecciona el vinculo con la universidad
            </option>
            <option value="1">Estudiante</option>
            <option value="2">Egresado</option>
            <option value="3">Colaborador</option>
            <option
              value="4"
              disabled={
                props.datos.vinculoConU && props.datos.vinculoConU != "4"
                  ? true
                  : false
              }
            >
              Externo
            </option>
          </select>
          {error.vinculoConU && (
            <small className="form-text font-weight-bold text-danger">
              {error.vinculoConU}
            </small>
          )}
        </div>
        {props.datos?.vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE ? (
          <>
            <div className="col-md-6">
              <label
                htmlFor="codigoEstudiantil"
                className="form-label nombreInput"
              >
                Código estudiantil
                <span className="text-danger"> (*)</span>
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
                <span className="text-danger"> (*)</span>
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
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO}>
                  Pregrado
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_POSTGRADO}>
                  Postgrado
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_TECNICO}>
                  Técnico laboral
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_EDUCACION_CONTINUA}>
                  Educación continua
                </option>
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
                Programa académico
                <span className="text-danger"> (*)</span>
              </label>
              <select
                id="programaAcademico"
                className="form-select"
                name="programaAcademico"
                value={props.datos.programaAcademico || "-1"}
                onChange={(e) => props.handleChange(e)}
              >
                <option value={"-1"} disabled>
                  Selecciona tu programa
                </option>

                {dataProgramasAcademicos &&
                  dataProgramasAcademicos.length > 0 &&
                  dataProgramasAcademicos.map((programaAcademico, index) => {
                    if (programaAcademico?.nivelAcademico === null) {
                      return (
                        <option key={index} value={programaAcademico.id}>
                          {programaAcademico.nombre}
                        </option>
                      );
                    } else if (
                      programaAcademico?.nivelAcademico ===
                      props.datos?.tipoEstudiante
                    ) {
                      return (
                        <option key={index} value={programaAcademico.id}>
                          {programaAcademico.nombre}
                        </option>
                      );
                    }
                  })}
              </select>
              {error.programaAcademico && (
                <small className="form-text font-weight-bold text-danger">
                  {error.programaAcademico}
                </small>
              )}
            </div>

            {props.datos?.programaAcademico == T_SINAPSIS_PROGRAMAS_OTRO && (
              <div className="col-md-6">
                <Label
                  htmlFor="cualOtroProgramaAcademico"
                  className="form-label"
                >
                  ¿Cuál otro?
                  <span className="text-danger"> (*)</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="cualOtroProgramaAcademico"
                  id="cualOtroProgramaAcademico"
                  value={
                    props.datos.cualOtroProgramaAcademico
                      ? props.datos.cualOtroProgramaAcademico
                      : ""
                  }
                  onChange={(e) => props.handleChange(e)}
                />
                {error.cualOtroProgramaAcademico && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.cualOtroProgramaAcademico}
                  </small>
                )}
              </div>
            )}

            {props.datos?.tipoEstudiante ===
            T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO ? (
              <>
                <div className="col-md-6">
                  <label className="form-label nombreInput">
                    Modalidad de emprendimiento como trabajo de grado
                    <span className="text-danger"> (*)</span>
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modTrabajoGrado"
                      id="modTrabajoGradoTrue"
                      onChange={(e) => props.handleChange(e)}
                      value={1}
                      checked={
                        props.datos.modTrabajoGrado ==
                        T_SINAPSIS_MOD_TRABAJO_GRADO_SI
                      }
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
                      checked={
                        props.datos.modTrabajoGrado ==
                        T_SINAPSIS_MOD_TRABAJO_GRADO_NO
                      }
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
                    Asignaturas de emprendimiento cursadas
                    <span className="text-danger"> (*)</span>
                  </label>
                  <div>
                    <div className="form-check form-check-inline">
                      {dataAsignaturas &&
                        dataAsignaturas.length > 0 &&
                        dataAsignaturas.map((asignatura, index) => {
                          return (
                            <div key={index}>
                              <input
                                key={index}
                                className="form-check-input"
                                type="checkbox"
                                id={`cursosEmprendimiento${asignatura.id}`}
                                name="cursosEmprendimiento"
                                value={asignatura.codigo}
                                checked={props.datos?.cursosEmprendimiento.includes(
                                  asignatura.codigo
                                )}
                                onChange={(e) => props.handleChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`cursosEmprendimiento${asignatura.id}`}
                              >
                                {asignatura.nombre}
                              </label>
                            </div>
                          );
                        })}
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
        ) : props.datos?.vinculoConU ==
          T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR ? (
          <>
            <div className="col-md-6">
              <Label htmlFor="cargoColaborador" className="form-label">
                Cargo de Colaborador
                <span className="text-danger"> (*)</span>
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
                <span className="text-danger"> (*)</span>
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
        ) : props.datos?.vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_EGRESADO ? (
          <>
            <div className="col-md-6">
              <Label htmlFor="tipoEstudianteEgresado" className="form-label">
                Tipo de estudiante
                <span className="text-danger"> (*)</span>
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
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO}>
                  Pregrado
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_POSTGRADO}>
                  Postgrado
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_TECNICO}>
                  Técnico laboral
                </option>
                <option value={T_SINAPSIS_NIVEL_ACADEMICO_EDUCACION_CONTINUA}>
                  Educación continua
                </option>
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
                <span className="text-danger"> (*)</span>
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

                {dataProgramasAcademicos &&
                  dataProgramasAcademicos.length > 0 &&
                  dataProgramasAcademicos.map((programaAcademico, index) => {
                    if (programaAcademico?.nivelAcademico === null) {
                      return (
                        <option key={index} value={programaAcademico.id}>
                          {programaAcademico.nombre}
                        </option>
                      );
                    } else if (
                      programaAcademico?.nivelAcademico ===
                      props.datos?.tipoEstudianteEgresado
                    ) {
                      return (
                        <option key={index} value={programaAcademico.id}>
                          {programaAcademico.nombre}
                        </option>
                      );
                    }
                  })}
              </select>
              {error.profesionEgresado && (
                <small className="form-text font-weight-bold text-danger">
                  {error.profesionEgresado}
                </small>
              )}
            </div>

            {props.datos?.profesionEgresado == T_SINAPSIS_PROGRAMAS_OTRO && (
              <div className="col-md-6">
                <Label
                  htmlFor="cualOtroprofesionEgresado"
                  className="form-label"
                >
                  ¿Cuál Otro?
                  <span className="text-danger"> (*)</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="cualOtroprofesionEgresado"
                  id="cualOtroprofesionEgresado"
                  value={
                    props.datos.cualOtroprofesionEgresado
                      ? props.datos.cualOtroprofesionEgresado
                      : ""
                  }
                  onChange={(e) => props.handleChange(e)}
                />
                {error.cualOtroprofesionEgresado && (
                  <small className="form-text font-weight-bold text-danger">
                    {error.cualOtroprofesionEgresado}
                  </small>
                )}
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        <div className="col-md-12">
          <Label htmlFor="fotoPerfil" className="form-label nombreInput">
            Foto de perfil
          </Label>
          <DropZoneComponent
            upFiles={onGetFiles}
            upFilesRejected={getFilesRejected}
            files={props.datos?.fotoPerfil}
            filesUrl={props.datos.fotoUrl}
            accept={{
              "image/jpeg": [],
              "image/png": [],
            }}
          />

          {error.fotoPerfil && (
            <small className="form-text font-weight-bold text-danger">
              {error.fotoPerfil}
            </small>
          )}
        </div>

        <div className="col-12 d-flex flex-row-reverse">
          <BotonSiguiente
            type="button"
            style={{ height: "auto" }}
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

export default InfoUsuario;
