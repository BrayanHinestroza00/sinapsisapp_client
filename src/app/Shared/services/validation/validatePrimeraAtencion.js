import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
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

export const validacionesPrimeraAtencionUsuario = (datos) => {
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
            !modTrabajoGrado
          ) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (!programaAcademico) {
          errors.programaAcademico = "Campo Obligatorio";
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
  return errors;
};

export const validacionesPrimeraAtencionEmprendimiento = (datos) => {
  const errors = {};
  const {
    nombreEmprendimiento,
    descripcionProducto,
    necesidadesIdentificadas,
    descripcionClientes,
    // materiasPrimas,
    // enfoqueSocial,
    // sectorEmprendimiento,
    // sitioWeb,
    // redSocialFacebook,
    // redSocialInstagram,
    // redSocialTwitter,
    // redSocialTiktok,
    // redSocialYouTube,
    // redSocialWhatsApp,
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

export const validacionesDiagnostico = (datos) => {
  const errors = {};
  const { fileDiagnostico } = datos;

  if (!fileDiagnostico) {
    errors.fileDiagnostico = "Campo Obligatorio";
  }

  return errors;
};
