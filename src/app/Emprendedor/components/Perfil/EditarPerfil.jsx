import moment from "moment";
import { useEffect, useState } from "react";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import { Boton, BotonSiguiente, Input, Label } from "./styled";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_ACTUALIZAR_PERFIL_EMPRENDEDOR,
  URL_OBTENER_ASIGNATURAS,
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
import { validacionesEditarPerfil } from "src/app/Shared/services/validation/validatePerfil";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function EditarPerfil({ preloadData, allowEdit, setAllowEdit }) {
  const [error, setError] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const { data: dataProgramasAcademicos, fetchAPI: fetchApiPrograma } =
    useFetch();

  const { data: dataAsignaturas, fetchAPI: fetchApiAsignaturas } = useFetch();

  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
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

      setDatos({
        idEmprendedor: preloadData.id,
        nombres: preloadData.nombres,
        apellidos: preloadData.apellidos,
        tipoDocumento: preloadData.acronimoTipoDocumento,
        numeroDocumento: preloadData.numeroDocumento,
        fechaNacimiento: moment(
          preloadData.fechaNacimiento,
          SINAPSIS_APP_FORMATO_FECHA
        ).format(SINAPSIS_APP_FORMATO_FECHA_INPUT),
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
        .catch((error) => console.log(error));
    }
  }, [preloadData]);

  useEffect(() => {
    if (preloadData && datos.departamento != null) {
      getMunicipios(datos.departamentoId)
        .then((data) => {
          setMunicipios(data);
        })
        .catch((error) => console.log(error));
    }
  }, [datos.departamento]);

  const onHandleChange = (event) => {
    if (!("target" in event)) {
      setDatos({ ...datos, descubrioSinapsis: event });
      return;
    }

    if (event.target.name === "cursosEmprendimiento") {
      const arrTmp = datos.cursosEmprendimiento
        ? [...datos.cursosEmprendimiento]
        : [];
      const index = arrTmp.indexOf(event.target.value);

      if (index !== -1) {
        arrTmp.splice(index, 1);
      } else {
        if (event.target.checked) {
          arrTmp.push(event.target.value);
        }
      }
      setDatos({ ...datos, [event.target.name]: arrTmp });
      return;
    }

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesEditarPerfil(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estas seguro que deseas actualizar tu perfil?",
        text: "La información se puede modificar en cualquier momento",
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        onConfirm: () => onSubmit(),
      });
    }
  };

  const onSubmit = () => {
    const form = new FormData();

    for (let index = 0; index < Object.values(datos).length; index++) {
      if (
        Object.values(datos)[index] != null ||
        Object.values(datos)[index] != undefined
      ) {
        if (Object.keys(datos)[index] == "fotoPerfil") {
          form.append("fotoPerfil", Object.values(datos)[index][0]);
        }
        if (Object.keys(datos)[index] == "fechaNacimiento") {
          const fechaNacimiento = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("fechaNacimiento", fechaNacimiento);
        } else {
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
        }
      }
    }

    setLoading(true);
    fetchAPI({
      URL: URL_ACTUALIZAR_PERFIL_EMPRENDEDOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: form,
      },
    });
  };

  const onGetFiles = (fotoPerfil) => {
    setDatos({
      ...datos,
      fotoPerfil,
    });
  };

  if (loading && errorAPI) {
    messageAlert({
      title: "Algo ha fallado",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Perfil actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => setAllowEdit(!allowEdit),
      });
    } else {
      messageAlertWithoutText({
        title: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={onHandleSubmit}
      encType="multipart/form-data"
      className="row g-3"
    >
      <div className="col-md-6">
        <Label htmlFor="nombreCompleto" className="form-label">
          Nombre Completo
        </Label>
        <Input
          type="text"
          className="form-control"
          id="nombreCompleto"
          value={`${datos.nombres} ${datos.apellidos}`}
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
          value={`${datos.tipoDocumento} - ${datos.numeroDocumento}`}
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
          value={datos.fechaNacimiento != null ? datos.fechaNacimiento : ""}
          onChange={(e) => onHandleChange(e)}
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
          value={datos.genero != null ? datos.genero : "-1"}
          onChange={(e) => onHandleChange(e)}
        >
          <option value={"-1"} disabled>
            Selecciona un género
          </option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
          <option value="OTRO">Otro</option>
        </select>
        {error.genero && (
          <small className="form-text font-weight-bold text-danger">
            {error.genero}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="correoPersonal" className="form-label">
          Correo Personal
        </Label>
        <Input
          type="text"
          className="form-control"
          name="correoPersonal"
          id="correoPersonal"
          value={datos.correoPersonal ? datos.correoPersonal : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.correoPersonal && (
          <small className="form-text font-weight-bold text-danger">
            {error.correoPersonal}
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
          value={datos.celular != null ? datos.celular : ""}
          onChange={(e) => onHandleChange(e)}
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
          value={datos.departamento || "-1"}
          disabled={datos.municipio != null}
          onChange={(e) => onHandleChange(e)}
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
          Municipio de Residencia
          <span> (*)</span>
        </Label>
        <select
          id="municipioId"
          className="form-select"
          name="municipioId"
          value={datos.municipioId ? datos.municipioId : 0}
          onChange={(e) => onHandleChange(e)}
        >
          <option value={0} disabled>
            Selecciona un municipio...
          </option>

          {datos.departamento &&
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
          Direccion de Residencia
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          name="direccion"
          id="direccion"
          value={datos.direccion ? datos.direccion : ""}
          onChange={(e) => onHandleChange(e)}
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
          value={datos.vinculoConU ? datos.vinculoConU : "-1"}
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
          <option value="4">Externo</option>
        </select>
        {error.vinculoConU && (
          <small className="form-text font-weight-bold text-danger">
            {error.vinculoConU}
          </small>
        )}
      </div>
      {datos?.vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE ? (
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
              value={datos.codigoEstudiantil || null}
              onChange={(e) => onHandleChange(e)}
            />
            {error.codigoEstudiantil && (
              <small className="form-text font-weight-bold text-danger">
                {error.codigoEstudiantil}
              </small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="tipoEstudiante" className="form-label nombreInput">
              Tipo de estudiante
              <span> (*)</span>
            </label>
            <select
              id="tipoEstudiante"
              className="form-select"
              name="tipoEstudiante"
              value={datos.tipoEstudiante || "-1"}
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
              Programa Académico
              <span> (*)</span>
            </label>
            <select
              id="programaAcademico"
              className="form-select"
              name="programaAcademico"
              value={datos.programaAcademico || "-1"}
              onChange={(e) => onHandleChange(e)}
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
                    programaAcademico?.nivelAcademico === datos?.tipoEstudiante
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

          {datos?.programaAcademico == T_SINAPSIS_PROGRAMAS_OTRO && (
            <div className="col-md-6">
              <Label htmlFor="cualOtroProgramaAcademico" className="form-label">
                ¿Cuál Otro?
                <span> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                name="cualOtroProgramaAcademico"
                id="cualOtroProgramaAcademico"
                value={
                  datos.cualOtroProgramaAcademico
                    ? datos.cualOtroProgramaAcademico
                    : ""
                }
                onChange={(e) => onHandleChange(e)}
              />
              {error.cualOtroProgramaAcademico && (
                <small className="form-text font-weight-bold text-danger">
                  {error.cualOtroProgramaAcademico}
                </small>
              )}
            </div>
          )}

          {datos?.tipoEstudiante === T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO ? (
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
                    onChange={(e) => onHandleChange(e)}
                    value={1}
                    checked={
                      datos.modTrabajoGrado === T_SINAPSIS_MOD_TRABAJO_GRADO_SI
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
                    onChange={(e) => onHandleChange(e)}
                    value={0}
                    checked={
                      datos.modTrabajoGrado === T_SINAPSIS_MOD_TRABAJO_GRADO_NO
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
                  Asignaturas de Emprendimiento Cursadas
                  <span> (*)</span>
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    {dataAsignaturas &&
                      dataAsignaturas.length > 0 &&
                      dataAsignaturas.map((asignatura, index) => {
                        {
                          /* {
                          console.log(
                            datos?.cursosEmprendimiento.includes(
                              asignatura.codigo
                            )
                          );
                        } */
                        }
                        return (
                          <div key={index}>
                            <input
                              key={index}
                              className="form-check-input"
                              type="checkbox"
                              id={`cursosEmprendimiento${asignatura.id}`}
                              name="cursosEmprendimiento"
                              value={asignatura.codigo}
                              checked={datos?.cursosEmprendimiento.includes(
                                asignatura.codigo
                              )}
                              onChange={(e) => onHandleChange(e)}
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
      ) : datos?.vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR ? (
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
              value={datos.cargoColaborador || null}
              onChange={(e) => onHandleChange(e)}
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
              value={datos.dependenciaColaborador || null}
              onChange={(e) => onHandleChange(e)}
            />
            {error.dependenciaColaborador && (
              <small className="form-text font-weight-bold text-danger">
                {error.dependenciaColaborador}
              </small>
            )}
          </div>
        </>
      ) : datos?.vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_EGRESADO ? (
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
              value={datos.tipoEstudianteEgresado || "-1"}
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
              <span> (*)</span>
            </Label>
            <select
              id="profesionEgresado"
              className="form-select"
              name="profesionEgresado"
              value={datos.profesionEgresado || "-1"}
              onChange={(e) => onHandleChange(e)}
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
                    datos?.tipoEstudianteEgresado
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

          {datos?.profesionEgresado == T_SINAPSIS_PROGRAMAS_OTRO && (
            <div className="col-md-6">
              <Label htmlFor="cualOtroprofesionEgresado" className="form-label">
                ¿Cuál Otro?
                <span> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                name="cualOtroprofesionEgresado"
                id="cualOtroprofesionEgresado"
                value={
                  datos.cualOtroprofesionEgresado
                    ? datos.cualOtroprofesionEgresado
                    : ""
                }
                onChange={(e) => onHandleChange(e)}
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
          Foto de Perfil
        </Label>

        <DropZoneComponent
          upFiles={onGetFiles}
          files={datos?.fotoPerfil}
          filesUrl={datos?.fotoUrl}
        />

        {error.fotoPerfil && (
          <small className="form-text font-weight-bold text-danger">
            {error.fotoPerfil}
          </small>
        )}
      </div>

      <div className="col-12 d-flex flex-row-reverse">
        <BotonSiguiente
          type="submit"
          style={{ height: "auto" }}
          className="btn btn-primary"
        >
          Actualizar Datos
        </BotonSiguiente>

        <Boton
          type="button"
          style={{ height: "auto" }}
          className="btn btn-secondary"
          onClick={(e) => {
            setAllowEdit(!allowEdit);
          }}
        >
          Cancelar
        </Boton>
      </div>
    </form>
  );
}

export default EditarPerfil;
