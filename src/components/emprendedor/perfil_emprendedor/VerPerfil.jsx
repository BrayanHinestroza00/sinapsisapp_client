import { useEffect, useState } from "react";
import {
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO } from "src/utils/constants";
import {
  getDepartamentoByIdMunicipio,
  getFromLocalStorage,
  getInformacionEmprendedor,
  getMunicipioById,
  obtenerAcronimoTipoDocumento,
  obtenerGenero,
} from "src/utils/functions";

function VerPerfil(props) {
  const [predata, setPredata] = useState({});
  const [estudiante, setEstudiante] = useState({ show: false });
  const [emprendedor, setEmprendedor] = useState({});
  const [departamentos, setDepartamentos] = useState(null);
  const [municipios, setMunicipios] = useState(null);

  useEffect(() => {
    const userData = getFromLocalStorage(
      SINAPSIS_APP_LOCALSTORAGE_INFO_USUARIO
    );

    getInformacionEmprendedor(userData.id)
      .then((data) => {
        getAcronimoTipoDocumento(data.tipoDocumentoId);
        getDepartamento(data.municipioId);
        getMunicipio(data.municipioId);
        setEmprendedor(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const getDepartamento = (idMunicipio) => {
    getDepartamentoByIdMunicipio(idMunicipio)
      .then((dataResponse) => {
        setDepartamentos(dataResponse[0].nombre);
      })
      .catch((error) => console.log(error));
  };

  const getMunicipio = (idMunicipio) => {
    getMunicipioById(idMunicipio)
      .then((dataResponse) => {
        setMunicipios(dataResponse[0].nombre);
      })
      .catch((error) => console.log(error));
  };

  const getAcronimoTipoDocumento = (tipoDocumento) => {
    obtenerAcronimoTipoDocumento(tipoDocumento)
      .then((dataResponse) => {
        setPredata({ ...predata, tipoDocumento: dataResponse[0].nombre });
      })
      .catch((error) => console.log(error));
  };

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
          value={`${emprendedor.nombres} ${emprendedor.apellidos}`}
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
          value={
            emprendedor.tipoDocumento != null
              ? `${predata.tipoDocumento} - ${emprendedor.numeroDocumento}`
              : ""
          }
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
          value={
            emprendedor.fechaNacimiento != null
              ? emprendedor.fechaNacimiento
              : ""
          }
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
          value={obtenerGenero(emprendedor.genero)}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="telefono" className="form-label">
          Número Teléfono
        </Label>
        <Input
          type="text"
          className="form-control"
          id="telefono"
          value={emprendedor.telefono != null ? emprendedor.telefono : ""}
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
          value={emprendedor.celular != null ? emprendedor.celular : ""}
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
          value={departamentos != null ? departamentos : ""}
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
          value={municipios != null ? municipios : ""}
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
          value={emprendedor.direccion != null ? emprendedor.direccion : ""}
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
          value={emprendedor.vinculoConU != null ? emprendedor.vinculoConU : ""}
          disabled
        />
      </div>
      {emprendedor.vinculoConU === "Estudiante" ? (
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
              value={
                emprendedor.codigoEstudiantil != null
                  ? emprendedor.codigoEstudiantil
                  : ""
              }
              disabled
            />
          </div>

          <div className="col-md-6">
            <Label htmlFor="tipoEstudiante" className="form-label">
              Tipo de estudiante
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="tipoEstudiante"
              value={
                emprendedor.tipoEstudiante != null
                  ? emprendedor.tipoEstudiante
                  : ""
              }
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
                emprendedor.programaAcademicoId != 0
                  ? emprendedor.programaAcademicoId
                  : ""
              }
              disabled
            />
          </div>

          {estudiante?.tipoEstudiante === "PREGRADO" ? (
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
                    name="modTrabajoGrado"
                    id="modTrabajoGradoTrue"
                    value={1}
                    checked={estudiante?.modTrabajoGrado == 1}
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
                    value={0}
                    checked={estudiante?.modTrabajoGrado == 0}
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
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cursosEmprendimiento1"
                      name="cursosEmprendimiento"
                      defaultValue="1"
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
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cursosEmprendimiento4"
                    >
                      IDEAS Y OPORTUNIDAD DE NEGOCIO
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : emprendedor.vinculoConU === "Colaborador" ? (
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
              value={emprendedor.cargo != null ? emprendedor.cargo : ""}
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
              value={
                emprendedor.dependencia != null ? emprendedor.dependencia : ""
              }
              disabled
            />
          </div>
        </>
      ) : emprendedor.vinculoConU === "Egresado" ? (
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
              value={
                emprendedor.tipoEstudianteEgresado != null
                  ? emprendedor.tipoEstudianteEgresado
                  : ""
              }
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
                emprendedor.profesionEgresadoId != 0
                  ? emprendedor.profesionEgresadoId
                  : ""
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
