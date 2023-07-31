import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_PROGRAMAS_OTRO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
  T_SINAPSIS_TIPOS_CONTACTO_EXTERNO,
} from "../../utils/constants";
import {
  REGEX_PATTERN_CORREO_ELECTRONICO,
  REGEX_PATTERN_NUMERO_TELEFONO,
  REGEX_PATTERN_SOLO_NUMEROS,
} from "../../utils/regexPatterns";

export const validacionesPrimeraAtencionUsuario = (datos, error) => {
  const errors = {};
  const {
    fechaNacimiento,
    genero,
    correoPersonal,
    celular,
    departamento,
    municipioId,
    direccion,
    vinculoConU,
  } = datos;

  if (!fechaNacimiento) {
    errors.fechaNacimiento = "Campo Obligatorio";
  }
  if (!genero) {
    errors.genero = "Campo Obligatorio";
  }
  if (!correoPersonal) {
    errors.correoPersonal = "Campo obligatorio";
  } else {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(correoPersonal)) {
      errors.correo = "El correo no es válido";
    }
  }
  if (celular) {
    const RegExp = REGEX_PATTERN_NUMERO_TELEFONO;
    if (!RegExp.test(celular)) {
      errors.celular = "Solo se permiten números y máximo 10 dígitos";
    }
  }
  if (!departamento) {
    errors.departamento = "Campo Obligatorio";
  }
  if (!municipioId && !datos?.municipioId) {
    errors.municipioId = "Campo Obligatorio";
  }
  if (!direccion) {
    errors.direccion = "Campo Obligatorio";
  }
  if (!vinculoConU) {
    errors.vinculoConU = "Campo Obligatorio";
  } else {
    switch (vinculoConU) {
      case T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE:
        const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
        if (!codigoEstudiantil) {
          errors.codigoEstudiantil = "Campo Obligatorio";
        }
        if (!tipoEstudiante) {
          errors.tipoEstudiante = "Campo Obligatorio";
        } else {
          const { modTrabajoGrado } = datos;
          if (
            tipoEstudiante === T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO &&
            modTrabajoGrado == null
          ) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (programaAcademico == null) {
          errors.programaAcademico = "Campo Obligatorio";
        } else {
          const { cualOtroProgramaAcademico } = datos;
          if (
            programaAcademico == T_SINAPSIS_PROGRAMAS_OTRO &&
            cualOtroProgramaAcademico == null
          ) {
            errors.cualOtroProgramaAcademico = "Campo Obligatorio";
          }
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_EGRESADO:
        const { profesionEgresado, tipoEstudianteEgresado } = datos;
        if (!profesionEgresado) {
          errors.profesionEgresado = "Campo Obligatorio";
        }
        if (!tipoEstudianteEgresado) {
          errors.tipoEstudianteEgresado = "Campo Obligatorio";
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR:
        const { cargoColaborador, dependenciaColaborador } = datos;
        if (!cargoColaborador) {
          errors.cargoColaborador = "Campo Obligatorio";
        }
        if (!dependenciaColaborador) {
          errors.dependenciaColaborador = "Campo Obligatorio";
        }
        break;
      case T_SINAPSIS_TIPOS_CONTACTO_EXTERNO:
        break;

      default:
        break;
    }
  }

  if (error.fotoPerfil) {
    errors.fotoPerfil = error.fotoPerfil;
  }

  return errors;
};

export const validacionesPrimeraAtencionEmprendimiento = (datos, error) => {
  const errors = {};
  const {
    nombreEmprendimiento,
    descripcionProducto,
    necesidadesIdentificadas,
    descripcionClientes,
    estaConstituida,
  } = datos;

  if (!nombreEmprendimiento) {
    errors.nombreEmprendimiento = "Campo Obligatorio";
  }

  if (!descripcionProducto) {
    errors.descripcionProducto = "Campo Obligatorio";
  }

  if (!necesidadesIdentificadas) {
    errors.necesidadesIdentificadas = "Campo Obligatorio";
  }

  if (!descripcionClientes) {
    errors.descripcionClientes = "Campo Obligatorio";
  }

  if (!estaConstituida) {
    errors.estaConstituida = "Campo Obligatorio";
  } else {
    if (estaConstituida == "S") {
      const {
        fechaConstitucion,
        nitEmpresa,
        nombreEmpresa,
        razonSocialEmpresa,
      } = datos;

      if (!fechaConstitucion) {
        errors.fechaConstitucion = "Campo Obligatorio";
      }

      if (!nitEmpresa) {
        errors.nitEmpresa = "Campo Obligatorio";
      }

      if (!nombreEmpresa) {
        errors.nombreEmpresa = "Campo Obligatorio";
      }

      if (!razonSocialEmpresa) {
        errors.razonSocialEmpresa = "Campo Obligatorio";
      }
    }
  }

  if (error.logoEmpresa) {
    errors.logoEmpresa = error.logoEmpresa;
  }

  return errors;
};

export const validacionesPrimeraAtencionPA = (datos) => {
  const errors = {};
  const {
    nombreProducto,
    equipoTrabajo,
    dedicacion,
    horasSemanales,
    motivacion,
    descubrioSinapsis,
  } = datos;

  if (!nombreProducto) {
    errors.nombreProducto = "Campo Obligatorio";
  }

  if (!equipoTrabajo) {
    errors.equipoTrabajo = "Campo Obligatorio";
  } else {
    if (equipoTrabajo == "S") {
      const { cualEquipoTrabajo } = datos;

      if (!cualEquipoTrabajo) {
        errors.cualEquipoTrabajo = "Campo Obligatorio";
      }
    }
  }

  if (!dedicacion) {
    errors.dedicacion = "Campo Obligatorio";
  }

  if (!horasSemanales) {
    errors.horasSemanales = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_SOLO_NUMEROS;
    if (!RegExp.test(horasSemanales)) {
      errors.horasSemanales = "Solo se permiten números";
    }
  }

  if (!motivacion) {
    errors.motivacion = "Campo Obligatorio";
  }

  if (!descubrioSinapsis || descubrioSinapsis.length == 0) {
    errors.descubrioSinapsis = "Campo Obligatorio";
  } else {
    for (let i = 0; i < descubrioSinapsis.length; i++) {
      const metodoDescubrio = descubrioSinapsis[i];

      if (metodoDescubrio.value == "OTRO") {
        const { cualOtroDescubrioSinapsis } = datos;

        if (!cualOtroDescubrioSinapsis) {
          errors.cualOtroDescubrioSinapsis = "Campo Obligatorio";
        }
        break;
      }
    }
  }

  return errors;
};

export const validacionesDiagnostico = (datos, error) => {
  const errors = {};
  const { fileDiagnostico } = datos;

  if (error.fileDiagnostico) {
    errors.fileAnuncio = error.fileDiagnostico;
  } else if (!fileDiagnostico) {
    errors.fileDiagnostico = "Campo Obligatorio";
  }

  return errors;
};
