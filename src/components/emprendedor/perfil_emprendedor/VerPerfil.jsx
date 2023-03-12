import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ASIGNATURAS,
} from "src/utils/apiConstants";
import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_PROGRAMAS_OTRO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
} from "src/utils/constants";

function VerPerfil({ preloadData }) {
  const { data: dataAsignaturas } = useFetch({
    URL: URL_OBTENER_ASIGNATURAS,
    requestOptions: {
      method: HTTP_METHOD_GET,
    },
  });

  return (
    <form className="row g-3 mt-1">
      <div className="col-md-6">
        <Label htmlFor="nombreCompleto" className="form-label">
          Nombre Completo
        </Label>
        <Input
          type="text"
          className="form-control"
          id="nombreCompleto"
          value={`${preloadData.nombres} ${preloadData.apellidos}`}
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
          value={`${preloadData.acronimoTipoDocumento} - ${preloadData.numeroDocumento}`}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="fechaNacimiento" className="form-label">
          Fecha de Nacimiento
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="fechaNacimiento"
          value={preloadData.fechaNacimiento ? preloadData.fechaNacimiento : ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="genero" className="form-label">
          Género
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="genero"
          value={preloadData.genero || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="correoPersonal" className="form-label">
          Correo Personal
        </Label>
        <Input
          type="text"
          className="form-control"
          id="correoPersonal"
          value={preloadData.correoPersonal || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="celular" className="form-label">
          Número Celular
        </Label>
        <Input
          type="text"
          className="form-control"
          id="celular"
          value={preloadData.telefonoContacto || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="departamento" className="form-label">
          Departamento de Residencia
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="departamento"
          value={preloadData.departamento || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="municipio" className="form-label">
          Municipio de Residencia
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="municipio"
          value={preloadData.municipio || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="direccion" className="form-label">
          Direccion de Residencia
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="direccion"
          value={preloadData.direccion || ""}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="vinculoConU" className="form-label">
          Vinculo con la Universidad
          <span> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          id="vinculoConU"
          value={preloadData.tipoContacto || ""}
          disabled
        />
      </div>
      {preloadData.tipoContacto === T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE ? (
        <>
          <div className="col-md-6">
            <Label htmlFor="codigoEstudiantil" className="form-label">
              Codigo Estudiantil
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="codigoEstudiantil"
              value={preloadData.codigoEstudiantil || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <Label htmlFor="nivelAcademico" className="form-label">
              Tipo de estudiante
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="nivelAcademico"
              value={preloadData.nivelAcademico || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <Label htmlFor="programaAcademico" className="form-label">
              Programa Academico
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="programaAcademico"
              value={
                preloadData.programaAcademicoId == T_SINAPSIS_PROGRAMAS_OTRO
                  ? preloadData.cualOtroProgramaAcademico
                  : preloadData.programaAcademico || ""
              }
              disabled
            />
          </div>

          {preloadData?.nivelAcademico ===
          T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO ? (
            <>
              <div className="col-md-6">
                <Label className="form-label">
                  Modalidad de Emprendimiento como Trabajo de Grado
                  <span> (*)</span>
                </Label>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="modTrabajoGradoTrue"
                    value={1}
                    checked={preloadData?.modalidadTrabajoGrado == 1}
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
                    id="modTrabajoGradoFalse"
                    value={0}
                    checked={preloadData?.modalidadTrabajoGrado == 0}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="modTrabajoGradoFalse"
                  >
                    NO
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <Label htmlFor="cursosEmprendimiento" className="form-label">
                  Asignaturas de Emprendimiento Cursadas
                  <span> (*)</span>
                </Label>
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
                              value={asignatura.codigo}
                              checked={preloadData.asignaturasEmprendedor.includes(
                                asignatura.codigo
                              )}
                              disabled
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
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : preloadData.tipoContacto === T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR ? (
        <>
          <div className="col-md-6">
            <Label htmlFor="cargoColaborador" className="form-label">
              Cargo de Colaborador
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="cargoColaborador"
              value={preloadData.cargo || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <Label htmlFor="dependenciaColaborador" className="form-label">
              Dependencia
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="dependenciaColaborador"
              value={preloadData.dependencia || ""}
              disabled
            />
          </div>
        </>
      ) : preloadData.tipoContacto === T_SINAPSIS_TIPOS_CONTACTO_EGRESADO ? (
        <>
          <div className="col-md-6">
            <Label htmlFor="tipoEstudianteEgresado" className="form-label">
              Tipo de estudiante
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="tipoEstudianteEgresado"
              value={preloadData.nivelAcademico || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <Label htmlFor="profesionEgresado" className="form-label">
              Profesión
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="profesionEgresado"
              value={
                preloadData.programaAcademicoId == T_SINAPSIS_PROGRAMAS_OTRO
                  ? preloadData.cualOtroProgramaAcademico
                  : preloadData.programaAcademico || ""
              }
              disabled
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}

export default VerPerfil;
