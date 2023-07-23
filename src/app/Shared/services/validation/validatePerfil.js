import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
  T_SINAPSIS_TIPOS_CONTACTO_EXTERNO,
} from "../../utils/constants";
import {
  REGEX_PATTERN_CARATERETES,
  REGEX_PATTERN_CORREO_ELECTRONICO,
  REGEX_PATTERN_NUMERO_TELEFONO,
} from "../../utils/regexPatterns";

export const validacionesEditarPerfil = (datos, error) => {
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

  if (error.fotoPerfil) {
    errors.fotoPerfil = error.fotoPerfil;
  }

  return errors;
};

export const validacionesEditarPerfilUsuario = (datos, error) => {
  const errors = {};
  const { correoPersonal, telefonoContacto, dependencia, facultad, cargo } =
    datos;

  if (correoPersonal) {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(correoPersonal)) {
      errors.correo = "El correo no es válido";
    }
  }

  if (telefonoContacto) {
    const RegExp = REGEX_PATTERN_NUMERO_TELEFONO;
    if (!RegExp.test(telefonoContacto)) {
      errors.telefonoContacto = "Solo se permiten números y máximo 10 dígitos";
    }
  }

  if (dependencia) {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CARATERETES;
    if (!RegExp.test(dependencia)) {
      errors.dependencia = "Máximo 200 caracteres";
    }
  }

  if (facultad) {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(facultad)) {
      errors.facultad = "Máximo 200 caracteres";
    }
  }

  if (!cargo) {
    errors.cargo = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_CARATERETES;
    if (!RegExp.test(cargo)) {
      errors.cargo = "Máximo 200 caracteres";
    }
  }

  if (error.fotoPerfil) {
    errors.fotoPerfil = error.fotoPerfil;
  }

  return errors;
};
